const value = props.value || null;
const text = `\`\`\`json\n${JSON.stringify(value, undefined, 2)}\n\`\`\``;
return (
  <div style={{ maxWidth: "500px" }}>
    <Markdown text={text} />
  </div>
);
