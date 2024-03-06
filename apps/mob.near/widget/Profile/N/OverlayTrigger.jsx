return (
  <Widget
    loading={props.children}
    src="mob.near/widget/N.Common.OverlayTrigger"
    props={{
      popup: (
        <Widget
          src="mob.near/widget/Profile.Popover"
          props={{ accountId: props.accountId }}
        />
      ),
      ...props,
    }}
  />
);
