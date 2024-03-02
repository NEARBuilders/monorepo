const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "Please connect your NEAR account :)";
}

const events = props.events ?? Social.get(`${accountId}/community/*`);

if (!events) {
  return "Loading...";
}

const AllWidgets = styled.div`
display: flex;
flex-wrap: wrap;
align-items: flex-start;

& > * {
 margin: 6px;
}
`;

let allEvents = events.map((eventId) => {
  console.log(eventId);
  return <Widget src={`hack.near/widget/event.view`} props={{ eventId }} />;
});

if (events.length == 0) {
  allEvents = (
    <div>
      <div>You have not attended any events.</div>
      <a href={`#/hack.near/widget/event.create`}>Create</a>
    </div>
  );
}
return (
  <>
    <AllWidgets>{allEvents}</AllWidgets>
  </>
);
