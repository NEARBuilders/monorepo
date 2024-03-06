return (
  <div>
    <div>
      near.social:{" "}
      {Storage.get("lastBlockHeight", "mob.near/widget/NotificationFeed")}
    </div>
    <div>
      near.org:{" "}
      {Storage.get("lastBlockHeight", "near/widget/NotificationsPage")}
    </div>
  </div>
);
