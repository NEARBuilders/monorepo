const eventId = props.eventId;
const accountId = context.accountId;
if (!accountId) {
  return "Please connect your NEAR account :)";
}

const event = props.event ?? Social.getr(`${accountId}/community/*/${eventId}`);

if (event === null) {
  return "Loading...";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="hack.near/widget/event.card"
        props={{
          accountId,
          eventId,
          link: true,
          showEditButton: !props.eventId,
        }}
      />

      <div className="mt-3">
        <Widget
          src="hack.near/widget/event.tabs"
          props={{ accountId, eventId }}
        />
      </div>
    </div>
  </div>
);
