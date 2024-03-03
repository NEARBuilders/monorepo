const { accountId, value } = props;

return (
  <div className="m-2">
    {value.type === "star" && (
      <Widget
        src="hack.near/widget/star.notification.item.LR"
        props={{
          L: value.type === "star" && "starred your widget",
          R: (
            <div className="m-2">
              <Widget
                src="mob.near/widget/FollowButton"
                props={{ accountId }}
              />
            </div>
          ),
          ...props,
        }}
      />
    )}
  </div>
);
