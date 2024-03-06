const accountId = props.accountId ?? "*";

const items = Social.index("graph", "poke");

if (!items) {
  return "Loading";
}

items.reverse();

const renderItem = (a) => (
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

return (
  <div>
    <Widget src="mob.near/widget/ItemFeed" props={{ items, renderItem }} />
  </div>
);
