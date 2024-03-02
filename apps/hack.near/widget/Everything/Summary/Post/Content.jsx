const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/main`, blockHeight) ?? "null");

return (
  <>
    <p>{content.text}</p>
    <Widget
      src="mob.near/widget/SocialMarkdown"
      props={{
        text: content.text,
      }}
    />
  </>
);
