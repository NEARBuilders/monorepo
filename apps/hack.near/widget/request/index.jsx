const requests = Social.index("graph", "request", {
  limit: 10,
  order: "desc",
  subscribe: true,
});

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

State.init({
  showDetails: false,
});

const renderItem = (item, i) => {
  return (
    <ItemWrapper>
      {item.value.type === "merge" && (
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
                  {item.value.type === "merge" && "requested update"}
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
                src="hack.near/widget/review.modal"
                props={{ src: item.value.src, update: item.value.update }}
              />
              <Widget
                src="hack.near/widget/merge"
                props={{ src: item.value.src, update: item.value.update }}
              />
            </div>
          </div>
          <div>
            {state.showDetails && (
              <CodeWrapper>
                <Widget
                  src={`hack.near/widget/compare`}
                  props={{
                    src: item.value.src,
                    update: item.value.update,
                  }}
                />
              </CodeWrapper>
            )}
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
      props={{ index, renderItem }}
    />
  </div>
);
