const index = {
  action: "graph",
  key: "follow",
  options: {
    limit: 10,
    order: "desc",
  },
};

const Item = styled.div`
  text-overflow: ellipsis;
  overflow-x: hidden;
`;

const renderItem = (a) => (
  <Item key={JSON.stringify(a)} className="mb-2">
    <Widget
      src="mob.near/widget/ProfileLine"
      props={{ accountId: a.accountId, hideAccountId: true, tooltip: true }}
    />
    <span className="text-muted">
      {a.value.type === "follow" ? "followed" : "unfollowed"}
    </span>
    <Widget
      src="mob.near/widget/ProfileLine"
      props={{
        accountId: a.value.accountId,
        hideAccountId: true,
        tooltip: true,
      }}
    />
    <span className="text-muted">
      <Widget
        src="mob.near/widget/TimeAgo"
        props={{ blockHeight: a.blockHeight }}
      />
    </span>
  </Item>
);

return (
  <>
    <h5>Follow activity</h5>
    <Widget
      src="mob.near/widget/ManualIndexFeed"
      props={{ index, renderItem, nextLimit: 25, loadMoreText: "Show more" }}
    />
  </>
);
