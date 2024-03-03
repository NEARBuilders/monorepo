// adapted from the `LabelDetails` widget by zavodil.near

const creatorId = props.creatorId ?? "hack.near";
const namespace = props.namespace ?? "widget";

if (!props.tag) {
  return "props.tag is undefined";
}

let tag = props.tag;
const data = Social.get(`*/${namespace}/*/metadata/tags/${tag}`, "final");

if (!data) {
  return "Loading...";
}

const records = [];

let counter = 0;

Object.keys(data).forEach((accountId) => {
  Object.keys(data[accountId][namespace]).forEach((thingId) => {
    Object.values(data[accountId][namespace][thingId]).forEach((tags) => {
      if (Object.keys(tags).includes(tag)) {
        let text = (
          <>
            tagged{" "}
            <Widget src="hack.near/widget/thing.inline" props={{ creatorId }} />
          </>
        );
        records.push(
          <li className="list-group-item">
            <Widget src="hack.near/widget/thing.inline" props={{ creatorId }} />
            {text}
            <span className="public-tags collapse show">
              <button
                className="btn btn-sm btn-outline-secondary border-0"
                data-bs-toggle="collapse"
                data-bs-target={`.public-tags-${counter}`}
                aria-expanded="false"
                aria-controls={`public-tags-${counter}`}
                type="button"
              >
                <i className="bi bi-arrows-angle-expand me-1"></i>All Tags
              </button>
            </span>
            <div className={`collapse public-tags-${counter}`}>
              <Widget src="hack.near/widget/tags" props={{ creatorId }} />
            </div>
          </li>
        );

        counter++;
      }
    });
  });
});

return (
  <>
    <h4 className="ms-3">
      <span className="badge rounded-pill bg-primary">{tag}</span>
    </h4>
    <ul className="list-group list-group-flush">{records}</ul>
  </>
);
