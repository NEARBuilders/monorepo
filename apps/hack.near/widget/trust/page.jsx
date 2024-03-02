const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "missing accountId";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="hack.near/widget/dev.profile"
        props={{ accountId, profile, link: true }}
      />

      <div className="mt-3">
        <Widget
          src="hack.near/widget/trust.tabs"
          props={{ accountId, tab: props.tab }}
        />
      </div>
    </div>
  </div>
);
