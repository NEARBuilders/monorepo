const accountId = props.accountId || context.accountId;
const path = props.path || "hack.near/widget/Academy";
const [creatorId, namespace, thingId] = path.split("/");

const pattern = `*/graph/context/${path}/tags/**`;
const tagsObject = Social.get(pattern, "final");

if (!tagsObject) {
  return "Loading...";
}

State.init({
  showEditor: false,
  tags: tagsObject,
});

const tagClass = "bg-success";
const badgeBtnClass = "text-white btn p-0 lh-1 m-1";

const tagsCount = {};

const processTagsObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (kv[1] === null) {
      const tag = kv[0];
      tagsCount[tag] = (tagsCount[tag] || 0) - 1;
    } else if (typeof kv[1] === "object") {
      processTagsObject(kv[1]);
    } else {
      const tag = kv[0];
      tagsCount[tag] = (tagsCount[tag] || 0) + 1;
    }
  });
};

const getTags = () => {
  processTagsObject(tagsObject);
  const tags = Object.entries(tagsCount);
  tags.sort((a, b) => b[1] - a[1]);
  return tags.map((t) => {
    return {
      name: t[0],
      count: t[1],
      title: t[1] + (t[1] > 1 ? " times" : " time"),
    };
  });
};

const publicTags = getTags();

const pageUrl = props.url ?? "/hack.near/widget/every.context";

return (
  <>
    <div className="m-1">
      {publicTags &&
        publicTags.map((tag) => (
          <a
            href={`${pageUrl}?tag=${tag.name}`}
            className={badgeBtnClass}
            key={tag.name}
          >
            <span
              className={`badge ${tagClass} position-relative`}
              title={tag.title}
              style={
                tag.count > 1
                  ? {
                      marginRight: "0.9em",
                      paddingRight: "0.85em",
                    }
                  : { marginRight: "0.25em" }
              }
            >
              #{tag.name}
              {tag.count > 1 && (
                <span
                  className={`badge translate-middle rounded-pill bg-danger position-absolute top-50 start-100`}
                >
                  {tag.count}
                </span>
              )}
            </span>
          </a>
        ))}
    </div>
    <div className="m-2">
      {!state.showEditor ? (
        <button
          onClick={() => State.update({ showEditor: true })}
          className={badgeBtnClass}
        >
          <div className={`me-1 mt-3 badge bg-primary`}>+ Tags</div>
        </button>
      ) : (
        <div className="mb-2">
          <button
            onClick={() => State.update({ showEditor: false })}
            className="text-white btn p-0 lh-1 m-1"
          >
            <div className={`me-1 mt-3 badge bg-secondary`}>x Close</div>
          </button>
        </div>
      )}
      {state.showEditor && (
        <div className="row">
          <div className="m-1 col-8">
            <Widget
              src="mob.near/widget/TagsEditor"
              props={{
                initialTagsObject: tags,
                tagsPattern,
                placeholder: "dev, art, gov, edu, social, near",
                setTagsObject: (tags) => {
                  state.tags = tags;
                  State.update();
                },
              }}
            />
          </div>
          <div className="m-1 col-3">
            <CommitButton
              disabled={tags === null}
              data={{
                graph: {
                  context: {
                    [creatorId]: {
                      [namespace]: {
                        [thingId]: {
                          tags: state.tags,
                        },
                      },
                    },
                  },
                },
              }}
            >
              Save
            </CommitButton>
          </div>
        </div>
      )}
    </div>
  </>
);
