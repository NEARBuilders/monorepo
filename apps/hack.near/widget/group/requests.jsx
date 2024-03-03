const accountId = props.accountId ?? context.accountId;

const index = {
  action: "graph",
  key: "request",
  options: {
    limit: 10,
    order: "desc",
  },
};

const ItemWrapper = styled.div`
  margin-bottom: 12px;
`;

let CodeWrapper = styled.div`
margin-top: 23px;
  & > pre > div {
    margin: 0px !important;
  }

  & > pre {
    margin: 0px !important;
    border-radius: 0px 0px 5px 5px;
  }
`;

const renderItem = (item, i) => {
  return (
    <ItemWrapper>
      {item.value.type === "add" && (
        <>
          <div className="d-flex justify-content-between row text-truncate text-muted">
            <div className="text-truncate col-auto">
              <div className="row">
                <div className="col-auto m-1">
                  <Widget
                    src="mob.near/widget/Profile"
                    props={{ accountId: item.accountId, tooltip: true }}
                  />{" "}
                </div>
                <div className="col-auto m-1">
                  {item.value.type === "add" && "proposed a work group"}
                  <Widget
                    src="mob.near/widget/TimeAgo"
                    props={{ blockHeight: item.blockHeight }}
                  />
                  ago
                </div>
              </div>
            </div>
            <div className="text-truncate col-auto float-right">
              <Widget
                src="hack.near/widget/group.review"
                props={{
                  groupId: Object.keys(item.value.thing)[0],
                }}
              />
              <Widget
                src="hack.near/widget/group.add"
                props={{
                  groupId: Object.keys(item.value.thing)[0],
                  accountId,
                }}
              />
            </div>
          </div>
        </>
      )}
    </ItemWrapper>
  );
};

return (
  <div className="m-2">
    <Widget
      src="mob.near/widget/FilteredIndexFeed"
      props={{ loading, index, renderItem }}
    />
  </div>
);
