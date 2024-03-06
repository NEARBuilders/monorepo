const accountId = context.accountId;

if (!accountId) {
  return "Sign in with NEAR Wallet";
}

const index = {
  action: "notify",
  key: accountId,
  options: {
    limit: 3,
    order: "desc",
  },
  cacheOptions: {
    ignoreCache: true,
  },
};

const renderItem = (item, i) => {
  return (
    <Widget
      loading={
        <div className="mb-3">
          <div className="placeholder" style={{ height: "48px" }} />
        </div>
      }
      src="mob.near/widget/Notification.Item"
      key={i}
      props={item}
    />
  );
};

return (
  <>
    <h5>Notifications</h5>
    <div className="placeholder-glow">
      <Widget
        src="mob.near/widget/FilteredIndexFeed"
        props={{
          index,
          manual: true,
          hideFetchMore: true,
          renderItem,
        }}
      />
    </div>
    <div>
      <a href="/mob.near/widget/NotificationFeed">View other notifications</a>
    </div>
  </>
);
