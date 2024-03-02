const { accountId } = props;

return (
  <Widget
    loading={props.loading}
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: "requested update",
      R: (
        <Widget
          loading=""
          src="hack.near/widget/merge"
          props={{
            accountId,
            back: true,
            src: props.src,
            update: props.update,
          }}
        />
      ),
      ...props,
    }}
  />
);
