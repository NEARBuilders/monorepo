const accountId = props.accountId ?? context.accountId;

const events = Social.get(`${accountId}/community/*/events`);

// return data;
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

const allWidgets = events.map((eventId) => {
  return <Widget src={`hack.near/widget/event.view`} props={{ eventId }} />;
});
return (
  <>
    <AllWidgets>{allWidgets}</AllWidgets>
  </>
);
