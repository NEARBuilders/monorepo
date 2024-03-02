const widgetPath = props.src ?? "every.near/widget/app";
// const [accountId, unused, widgetName] = props.src.split("/");
const blockHeight = props.blockHeight;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);

const name = metadata.name ?? widgetName;
const description = metadata.description;
const tags = Object.keys(metadata.tags ?? {});

return (
  <div className="d-flex flex-row">
    <Widget
      src="mob.near/widget/WidgetImage"
      props={{
        metadata,
        accountId,
        widgetName,
        style: { height: "3em", width: "3em", minWidth: "3em" },
        className: "me-2",
        imageClassName: "w-100 h-100",
      }}
    />
    <div className="text-truncate">
      <div className="text-truncate">
        <span className="fw-bold">{name}</span>{" "}
      </div>
      <div className="text-truncate text-muted">
        <small>
          <span className="font-monospace">{widgetPath}</span>
        </small>
      </div>
    </div>
  </div>
);
