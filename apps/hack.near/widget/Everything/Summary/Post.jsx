const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/main`, blockHeight) ?? "null");
const subscribe = !!props.subscribe;

const notifyAccountId = accountId;
const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

const link = `#/hack.near/widget/Everything.View.Post?accountId=${accountId}&blockHeight=${blockHeight}`;

return (
  <div className="border-bottom pt-3 pb-1">
    <Widget
      src="hack.near/widget/Everything.Summary.Post.Content"
      props={{ content }}
    />
  </div>
);
