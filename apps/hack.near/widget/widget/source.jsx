const src = props.src ?? "mob.near/widget/WidgetSource";
const [accountId, widget, widgetName] = src.split("/");

const code = props.code ?? Social.get(src);

const text = `
\`\`\`jsx
${code}
\`\`\`
`;

return (
  <>
    <Widget
      src="hack.near/widget/widget.card"
      props={{ accountId, widgetName, expanded: true, code }}
    />
    <Markdown text={text} />
    <h3>Dependencies</h3>
    <Widget src="mob.near/widget/WidgetDependencies" props={{ src, code }} />
  </>
);
