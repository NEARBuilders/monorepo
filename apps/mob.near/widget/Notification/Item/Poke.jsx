const { accountId } = props;

return (
  <Widget
    loading={props.loading}
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: "poked you",
      R: (
        <Widget
          loading=""
          src="mob.near/widget/PokeButton"
          props={{ accountId, back: true }}
        />
      ),
      ...props,
    }}
  />
);
