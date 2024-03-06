const accountId = props.accountId;
const widgetName = props.widgetName;
const widgetPath = `${accountId}/widget/${widgetName}`;
const blockHeight = props.blockHeight;
const widget = Social.getr(widgetPath);

const code = widget[""];
const metadata = widget.metadata;

const name = metadata.name ?? widgetName;
const image = metadata.image;
const onHide = props.onHide;

const embedCode = `<Widget src="${widgetPath}" props={{ }} />`;

// const embedMd = `
// \`\`\`jsx
// ${embedCode}
// \`\`\`
// `;

// const sourceMd = `
// \`\`\`jsx
// ${code}
// \`\`\`
// `;

return (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="me-2 text-truncate">
        <Widget
          src="mob.near/widget/Component.InlineBlock"
          props={{ accountId, widgetName }}
        />
      </div>
      <div className="text-nowrap">
        {props.extraButtons &&
          props.extraButtons({
            accountId,
            widgetName,
            widgetPath,
            widget,
            onHide,
          })}
        <OverlayTrigger
          placement="auto"
          overlay={<Tooltip>Copy embedding code to clipboard</Tooltip>}
        >
          <button
            className="btn btn-outline-primary border-0"
            onClick={() => {
              clipboard.writeText(embedCode).then(() => {
                State.update({ embedCopied: true });
                if (props.onEmbed) {
                  props.onEmbed(embedCode);
                }
              });
            }}
          >
            {state.embedCopied ? (
              <i className="bi bi-check-lg me-1" />
            ) : (
              <i className="bi bi-clipboard me-1" />
            )}
            Embed
          </button>
        </OverlayTrigger>
        <a
          href={`#/mob.near/widget/WidgetSource?src=${widgetPath}`}
          target="_blank"
          className="btn btn-outline-secondary border-0"
        >
          <i className="bi bi-file-earmark-code me-1"></i>Source
        </a>
      </div>
    </div>
  </div>
);
