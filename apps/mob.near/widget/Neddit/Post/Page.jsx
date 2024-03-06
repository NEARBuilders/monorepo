const blockHeight = parseInt(props.blockHeight);
const accountId = props.accountId;
const notifyAccountId = accountId;
const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

return (
  <div style={{ marginTop: "calc(-1 * var(--body-top-padding, 0))" }}>
    <Widget
      src="mob.near/widget/Neddit.Post"
      props={{
        ...props,
        noBorder: true,
        truncateContent: false,
      }}
    />
  </div>
);
