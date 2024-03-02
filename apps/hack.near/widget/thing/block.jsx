const creatorId = props.creatorId ?? context.accountId;
const namespace = props.namespace ?? "widget";
const thingId = props.thingId ?? "every";

const path = props.path ?? `${creatorId}/${namespace}/${thingId}`;

const thing = props.thing ?? Social.getr(`${path}`);

if (!thing) {
  return "Loading...";
}

const fast = props.fast ?? !props.data;

const name = thing.metadata.name;
const tags = Object.keys(thing.metadata.tags ?? {});

const imgWrapperStyle = { height: "3em", width: "3em" };

return (
  <div className="d-flex flex-row">
    <div className="me-2">
      <Widget
        src="hack.near/widget/any.image"
        loading={<div style={imgWrapperStyle} />}
        props={{
          fast,
          creatorId,
          namespace,
          thingId,
          style: imgWrapperStyle,
          imageClassName: "w-100 h-100",
        }}
      />
    </div>
    <div className="text-truncate">
      <div className="text-truncate">
        <span className="fw-bold">{name}</span>{" "}
        <Widget
          loading=""
          src="hack.near/widget/valid"
          props={{ creatorId, namespace, thingId }}
        />
        <small>
          <span className="font-monospace">@{creatorId}</span>
        </small>
      </div>
      <div className="text-truncate text-muted">
        {tags.length > 0 && (
          <>
            {tags.map((tag, i) => (
              <span
                key={i}
                className="me-1 fw-light badge border border-secondary text-bg-light"
              >
                #{tag}
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  </div>
);
