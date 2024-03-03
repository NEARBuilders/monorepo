const accountId = props.accountId;
const widgetName = props.widgetName;
const widgetPath = `${accountId}/widget/${widgetName}`;
const blockHeight = props.blockHeight;
const metadata = Social.getr(`${widgetPath}/metadata`);

const name = metadata.name ?? widgetName;
const image = metadata.image;
const onHide = props.onHide;

return (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="me-2 text-truncate">
        <Widget
          src="hack.near/widget/widget.profile"
          props={{ accountId, widgetName }}
        />
      </div>
      <div className="text-nowrap">
        {props.extraButtons &&
          props.extraButtons({
            accountId,
            widgetName,
            widgetPath,
            metadata,
            onHide,
          })}
      </div>
    </div>
  </div>
);
