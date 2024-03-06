const { accountId, value, loading } = props;

return (
  <Widget
    loading={loading}
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: value.type === "follow" ? "followed you" : "unfollowed you",
      R: <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />,
      ...props,
    }}
  />
);
