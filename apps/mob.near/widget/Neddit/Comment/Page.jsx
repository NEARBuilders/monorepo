const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);

const content = JSON.parse(
  Social.get(`${accountId}/post/comment`, blockHeight) ?? "null"
);
if (content === null) {
  return "Loading";
}
const item = content.item;
const rootItem = content.item;

const extractParentPost = (item) => {
  if (!item || item.type !== "social" || !item.path || !item.blockHeight) {
    return undefined;
  }
  const accountId = item.path.split("/")[0];
  return `${accountId}/post/main` === item.path
    ? { accountId, blockHeight: item.blockHeight }
    : undefined;
};

const parentPost = extractParentPost(rootItem);
return (
  <div style={{ marginTop: "calc(-1 * var(--body-top-padding, 0))" }}>
    {parentPost ? (
      <Widget
        src="mob.near/widget/Neddit.Post"
        props={{
          ...parentPost,
          highlightComment: { accountId, blockHeight },
          noBorder: true,
          truncateContent: false,
        }}
      />
    ) : (
      <Widget src="mob.near/widget/MainPage.N.Comment" props={props} />
    )}
  </div>
);
