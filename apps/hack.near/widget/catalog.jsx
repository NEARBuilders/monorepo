// adapted from the `AllLabels` widget by zavodil.near

const creatorId = props.creatorId ?? "hack.near";
const namespace = props.namespace ?? "widget";

let tag = props.tag ?? "*";
const data = Social.keys(
  `${creatorId}/${namespace}/*/metadata/tags/${tag}`,
  "final"
);

if (!data) {
  return "Loading...";
}

const things = {};

Object.values(data).forEach((thing) => {
  const metadata = thing[namespace]?.metadata;
  const tags = metadata?.tags;

  if (tags) {
    Object.keys(tags).forEach((tag) => {
      things[tag] = true;
    });
  }
});

const allWidgets = Object.keys(things).map((thingId) => {
  return (
    <div key={thingId} className="mb-2 mt-3 card">
      <div className="card-body">
        <div className="text-truncate">
          <Widget src="hack.near/widget/thing.inline" props={{ creatorId }} />
        </div>
        <Widget src="hack.near/widget/tags" props={{ creatorId, namespace }} />
      </div>
    </div>
  );
});

return (
  <>
    <Widget
      src="hack.near/widget/tag.editor"
      key={`public-tag-editor-${props.accountId}`}
      props={{ creatorId }}
    />

    {tag !== "*" && (
      <h4 className="ms-3">
        every {namespace} tagged with:{" "}
        <span className="badge rounded-pill bg-primary">{tag}</span>
      </h4>
    )}

    {allWidgets}
    <hr />
    {tag !== "*" && (
      <>
        <Widget src="hack.near/widget/tag.info" props={{ tag: tag }} />

        <div className="mt-3 mb-5">
          <a
            className="btn btn-outline-primary"
            href="/#/hack.near/widget/catalog"
          >
            All Tags
          </a>
        </div>
      </>
    )}
  </>
);
