const index = [
  {
    action: "graph",
    key: "follow",
    options: {
      subscribe: true,
      limit: 10,
      order: "desc",
    },
  },
  {
    action: "graph",
    key: "poke",
    options: {
      subscribe: true,
      limit: 10,
      order: "desc",
    },
  },
];

const Item = styled.div`
  text-overflow: ellipsis;
  overflow-x: hidden;
`;

const renderPoke = (a) => (
  <div key={JSON.stringify(a)} className="mb-2">
    <span className="fs-4">
      <Widget
        src="mob.near/widget/ProfileLine"
        props={{
          accountId: a.value.accountId,
          hideName: true,
          hideAccountId: true,
          tooltip: true,
        }}
      />
      <span role="img" aria-label="poked" title="poked">
        👈
      </span>
      <Widget
        src="mob.near/widget/ProfileLine"
        props={{
          accountId: a.accountId,
          hideName: true,
          hideAccountId: true,
          tooltip: true,
        }}
      />
    </span>
    <span className="text-muted">
      <Widget
        src="mob.near/widget/TimeAgo"
        props={{ blockHeight: a.blockHeight }}
      />
    </span>
  </div>
);

const renderFollow = (a) => (
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

const renderItem = (item) =>
  item.key === "follow" ? renderFollow(item) : renderPoke(item);

return (
  <div>
    <Widget
      src="mob.near/widget/MergedIndexFeed"
      props={{ index, renderItem }}
    />
  </div>
);
