const src = props.src ?? "mob.near/widget/WidgetHistory";

const code = Social.get(src);
let history = Social.keys(src, "final", {
  return_type: "History",
});
if (history === null || code === null) {
  return "Loading";
}
src.split("/").forEach((key) => {
  history = history[key];
});

const text = (src, code) => `
### ${src}

\`\`\`jsx
${code}
\`\`\`
`;

return (
  <>
    <Markdown text={text(src, code)} />
    {history &&
      history.reverse().map((blockHeight, i) => {
        const newSrc = `${src}@${blockHeight}`;
        const oldSrc = `${src}@${history[i + 1]}`;
        return (
          <div className="mt-5">
            <h4>{newSrc}</h4>
            <Widget
              src="mob.near/widget/ValueDiff"
              props={{
                newSrc,
                oldSrc,
              }}
            />
          </div>
        );
      })}
  </>
);
