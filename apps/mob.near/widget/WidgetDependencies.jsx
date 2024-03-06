const src = props.src;
const code = props.code ?? Social.get(src);

const dependencyMatch =
  code && code.matchAll(/<Widget[\s\S]*?src=.*?"(.+)"[\s\S]*?\/>/g);
let dependencySources = [...(dependencyMatch || [])]
  .map((r) => r[1])
  .filter((r) => !!r);
dependencySources = dependencySources
  .filter((r, i) => dependencySources.indexOf(r) === i && r !== "(.+)")
  .map((src) => {
    const parts = src.split("/");
    return { src, accountId: parts[0], widgetName: parts[2] };
  });

return (
  <>
    {dependencySources.map((c, i) => (
      <div key={c.src}>
        <Widget
          src="mob.near/widget/ComponentSearch.Item"
          props={{
            link: `/${c.src}`,
            accountId: c.accountId,
            widgetName: c.widgetName,
            extraButtons: ({ widgetPath }) => (
              <a
                target="_blank"
                className="btn btn-outline-secondary"
                href={`#/mob.near/widget/WidgetSource?src=${widgetPath}`}
              >
                Source
              </a>
            ),
          }}
        />
      </div>
    ))}
  </>
);
