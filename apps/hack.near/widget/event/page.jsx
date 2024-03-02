const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "Please connect your NEAR account :)";
}

const events = Social.get(`${accountId}/events/*`);

if (events === null) {
  return "Loading...";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="mob.near/widget/ProfileLarge"
        props={{
          accountId,
          link: true,
          showEditButton: !props.profile,
        }}
      />

      <div className="mt-3">
        <Widget src="hack.near/widget/events.profile" props={{ accountId }} />
      </div>
    </div>
  </div>
);
