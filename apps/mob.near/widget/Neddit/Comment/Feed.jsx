const item = props.item;
const rootItem = props.rootItem;
const depth = props.depth ?? 1;
const renderLoading = () => "Loading";
const fetchLimit =
  props.fetchLimit !== undefined ? parseInt(props.fetchLimit) : 100;
const renderLimit =
  props.renderLimit !== undefined ? parseInt(props.renderLimit) : 3;
const initialRenderLimit =
  props.initialRenderLimit !== undefined
    ? parseInt(props.initialRenderLimit)
    : renderLimit;
const halflife = props.halflife
  ? parseFloat(props.halflife)
  : (24 * 60 * 60) / 1.3;

const [displayCount, setDisplayCount] = useState(initialRenderLimit);

let rawIndex = Social.index("comment", item, {
  order: "desc",
  limit: fetchLimit,
});

if (rawIndex === null) {
  return renderLoading();
}

const comments = rawIndex
  .map(({ accountId, blockHeight, value }) => {
    if (value.type !== "md") {
      return null;
    }
    return {
      accountId,
      blockHeight,
      item: {
        type: "social",
        path: value?.item?.path ?? `${accountId}/post/comment`,
        blockHeight: value?.item?.blockHeight ?? blockHeight,
      },
    };
  })
  .filter((a) => !!a);

const likes = fetch("https://api.near.social/api/experimental/likes", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    item: comments.map((p) => p.item),
  }),
}).body;

if (!likes) {
  return renderLoading();
}

const lastBlockHeight = comments[0].blockHeight ?? 0;

const score = (i) => {
  const comment = comments[i];
  const age = lastBlockHeight - comment.blockHeight;
  const numLikes = likes[i].length + 0.1;
  return numLikes / Math.exp(1 + age / halflife);
};

const order = [...Array(comments.length).keys()];
order.sort((a, b) => score(b) - score(a));

const render = (comment) => {
  const accountId = comment.item.path.split("/")[0];
  const blockHeight = comment.item.blockHeight;

  return (
    <div key={JSON.stringify(comment)} className="comment-section">
      <Widget
        loading={<div className="w-100" style={{ minHeight: "200px" }} />}
        src="mob.near/widget/Neddit.Comment"
        props={{
          accountId,
          blockHeight,
          rootItem,
          highlight:
            accountId === props.highlightComment?.accountId &&
            blockHeight === props.highlightComment?.blockHeight,
          subCommentsProps: {
            item: comment.item,
            rootItem,
            depth: depth + 1,
            initialRenderLimit: depth === 1 ? 3 : 0,
            renderLimit: 10,
          },
        }}
      />
    </div>
  );
};

const moreReplies = comments.length - displayCount;

const fetchMore = moreReplies > 0 && (
  <div key={"loader more"} className="comment-section">
    <div className="post comment">
      <div className="h-line" />
      <div className="left" />
      <div
        style={{
          marginLeft: "-40px",
          paddingTop: "8px",
          paddingBottom: "10px",
        }}
      >
        <a
          className="stretched-link"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault && e.preventDefault();
            setDisplayCount(displayCount + renderLimit);
          }}
        >
          {`${moreReplies} more ${moreReplies > 1 ? "replies" : "reply"}`}
        </a>
      </div>
    </div>
  </div>
);

return props.prefix || comments.length > 0 ? (
  <div className="comments-step">
    {props.prefix}
    {order.slice(0, displayCount).map((i) => render(comments[i]))}
    {fetchMore}
  </div>
) : (
  ""
);
