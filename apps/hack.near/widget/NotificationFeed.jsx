const accountId = context.accountId;

if (!accountId) {
  return "Sign in with NEAR Wallet";
}

const index = {
  action: "notify",
  key: accountId,
  options: {
    limit: 10,
    order: "desc",
    subscribe: true,
  },
  cacheOptions: {
    ignoreCache: true,
  },
};

const renderItem = (item, i) => {
  if (i === 0) {
    Storage.set("lastBlockHeight", item.blockHeight);
  }
  return (
    <Widget
      loading={
        <div className="mb-3">
          <div className="placeholder" style={{ height: "48px" }} />
        </div>
      }
      src="hack.near/widget/Notification.Item"
      key={i}
      props={item}
    />
  );
};

return (
  <div className="placeholder-glow">
    <Widget
      src="mob.near/widget/FilteredIndexFeed"
      props={{ index, renderItem }}
    />
  </div>
);
