const accountId = props.accountId;

let keys = `${accountId ?? "*"}/widget/*`;

const data = Social.keys(keys, "final", {
  return_type: "BlockHeight",
});

if (data === null) {
  return "Loading";
}

const processData = (data) => {
  const accounts = Object.entries(data);

  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      return Object.entries(account[1].widget).map((kv) => ({
        accountId,
        widgetName: kv[0],
        blockHeight: kv[1],
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}

const widgets = state.allItems;
if (!widgets) {
  return "Loading";
}

const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 1140px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

return (
  <WidgetGrid>
    {widgets.map((widget) => (
      <div key={`${widget.accountId}-${widget.widgetName}`}>
        <Widget
          src="app.near/widget/Components.WidgetMetadata"
          loading=""
          props={{
            accountId: widget.accountId,
            widgetName: widget.widgetName,
            blockHeight: widget.blockHeight,
          }}
        />
      </div>
    ))}
  </WidgetGrid>
);
