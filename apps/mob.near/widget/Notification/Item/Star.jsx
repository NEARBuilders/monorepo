const { accountId, value } = props;

const overlayStyle = {
  maxWidth: "30em",
  zIndex: 1070,
  maxHeight: "24em",
  overflow: "hidden",
};

const widgetSrc =
  typeof value.item.path === "string" &&
  value.item.path.startsWith(`${context.accountId}/widget/`) &&
  value.item.path.split("/").length === 3
    ? value.item.path
    : null;

const { content, popup } = widgetSrc
  ? {
      content: (
        <a className="fw-bold text-muted" href={`/${widgetSrc}`}>
          application
        </a>
      ),
      popup: (
        <Widget
          src="mob.near/widget/WidgetMetadata"
          props={{
            accountId: widgetSrc.split("/")[0],
            widgetName: widgetSrc.split("/")[2],
          }}
        />
      ),
    }
  : { content: "item???" };

return (
  <Widget
    loading={props.loading}
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: (
        <>
          starred your
          <Widget
            loading={content}
            src="mob.near/widget/N.Common.OverlayTrigger"
            props={{
              overlayStyle,
              popup,
              children: content,
            }}
          />
        </>
      ),
      R: widgetSrc ? (
        <a className="btn btn-outline-dark rounded-5" href={`widgetSrc`}>
          Open
        </a>
      ) : (
        ""
      ),
      ...props,
    }}
  />
);
