const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/comment`, blockHeight) ?? "null");
const parentItem = content.item;
const rootItem = content.rootItem;
const highlight = !!props.highlight;
const [showReply, setShowReply] = useState(false);

const extractNotifyAccountId = (item) => {
  if (!item || item.type !== "social" || !item.path) {
    return undefined;
  }
  const accountId = item.path.split("/")[0];
  return `${accountId}/post/main` === item.path ||
    `${accountId}/post/comment` === item.path
    ? accountId
    : undefined;
};

const link = `/mob.near/widget/Neddit.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const item = {
  type: "social",
  path: `${accountId}/post/comment`,
  blockHeight,
};

const subCommentsProps = props.subCommentsProps;

return (
  <>
    <div
      className={`comment post ${highlight ? "bg-warning bg-opacity-10" : ""}`}
    >
      <div className="h-line" />
      <div className="left">
        <Widget
          loading=""
          src="mob.near/widget/MainPage.N.Post.Left"
          props={{ accountId }}
        />
      </div>
      <div className="right">
        <Widget
          src="mob.near/widget/Neddit.Common.Header"
          props={{
            accountId,
            blockHeight,
            link,
            postType: "comment",
            flagItem: item,
          }}
        />
        <Widget
          loading={
            <div
              className="overflow-hidden w-100 placeholder-glow"
              style={{ minHeight: "100px" }}
            />
          }
          src="mob.near/widget/MainPage.N.Post.Content"
          props={{ content }}
        />
        {blockHeight !== "now" ? (
          <div className="buttons d-flex justify-content-between">
            <div className="flex-grow-1 d-flex flex-row gap-3">
              <Widget
                loading=""
                src="mob.near/widget/N.LikeButton"
                props={{
                  notifyAccountId,
                  item,
                }}
              />
              {parentItem && (
                <div key="comment">
                  <Widget
                    loading=""
                    src="mob.near/widget/N.CommentButton"
                    props={{
                      onClick: () => setShowReply(!showReply),
                      text: (
                        <span
                          style={{
                            marginLeft: "-4px",
                            fontSize: 14,
                          }}
                        >
                          Reply
                        </span>
                      ),
                    }}
                  />
                </div>
              )}
            </div>
            <Widget
              loading=""
              src="mob.near/widget/MainPage.N.Post.ShareButton"
              props={{ accountId, blockHeight, postType: "comment", link }}
            />
          </div>
        ) : (
          <div className="buttons-placeholder" />
        )}
      </div>
    </div>
    {props.subCommentsProps && (
      <Widget
        key="sub-comments"
        loading={false}
        src="mob.near/widget/Neddit.Comment.Feed"
        props={{
          prefix: showReply && (
            <Widget
              src="mob.near/widget/Neddit.Comment.Compose"
              props={{
                initialText: "",
                notifyAccountId: extractNotifyAccountId(item),
                item,
                rootItem,
                onComment: () => setShowReply(false),
              }}
            />
          ),
          ...props.subCommentsProps,
        }}
      />
    )}
  </>
);
