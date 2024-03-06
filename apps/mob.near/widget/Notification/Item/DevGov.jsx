const { value } = props;

return (
  <Widget
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: (
        <Widget
          src="devgovgigs.near/widget/DevGov.Notification.Item.Left"
          props={{ type: value.type, post: value.post }}
        />
      ),
      R: (
        <Widget
          src="devgovgigs.near/widget/DevGov.Notification.Item.Right"
          props={{ post: value.post }}
        />
      ),
      ...props,
    }}
  />
);
