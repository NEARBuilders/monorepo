// adapted from the `PublicTags` widget by zavodil.near

const creatorId = props.creatorId ?? "hack.near";
const namespace = props.namespace ?? "widget";
const thingId = props.thingId ?? "every";

const accountId = props.accountId ?? context.accountId;

State.init({
  showEditor: false,
});

const tagsPattern = `*/graph/context/${creatorId}/${namespace}/${thingId}/tags/*`;
const tagsObject = Social.get(tagsPattern, "final");

if (!tagsObject) {
  return "";
}

const tagClass = "bg-success";
const badgeBtnClass = "text-white btn p-0 lh-1 m-1";
const addPublicTagHtml = (
  <a
    href={`#/hack.near/widget/catalog?accountId=${accountId}`}
    className={badgeBtnClass}
  >
    <div className={`me-1 mt-3 badge bg-primary`}>+ Tag</div>
  </a>
);

if (tagsObject === null) {
  return "Loading...";
}

const tagsCount = {};
const tagsAuthors = {};

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
      title: t[1] + (t[1] > 1 ? " votes" : " vote"),
    };
  });
};

const publicTags = getTags();

return (
  <>
    {publicTags &&
      publicTags.map((tag) => (
        <a
          href={`/#/hack.near/widget/catalog?tag=${tag.name}`}
          className={badgeBtnClass}
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
              src={"hack.near/widget/MetadataEditor"}
              props={{
                initialMetadata: tags,
                onChange: (tags) => {
                  State.update({ tags });
                },
                options: {
                  tags: {
                    pattern,
                    placeholder: "dev, art, gov, edu, social, near",
                  },
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
