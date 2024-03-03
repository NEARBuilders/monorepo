// adapted from the `PublicTags` widget by zavodil.near

const accountId = props.accountId ?? context.accountId;

const creatorId = props.creatorId ?? "mob.near";
const namespace = props.namespace ?? "widget";
const thingId = props.thingId ?? "Explorer";

const initialPath = `${creatorId}/${namespace}/${thingId}`;
const initialTagsObject = Social.get(
  `*/graph/context/${initialPath}/tags/**`,
  "final"
);

const [state, setState] = useState({
  showEditor: false,
  path: props.path ?? initialPath,
  tagsObject: initialTagsObject,
  attestation: null,
});

const normalizeTag = (tag) =>
  tag
    .replaceAll(/[- \.]/g, "_")
    .replaceAll(/[^\w]+/g, "")
    .replaceAll(/_+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase()
    .trim("-");

const fetchTagsObject = (path) => {
  Social.get(
    `*/graph/context/${path}/tags/**`,
    "final",
    (error, fetchedTagsObject) => {
      if (error) {
        console.error("Error fetching tagsObject:", error);
      } else {
        setState((prevState) => ({
          ...prevState,
          tagsObject: fetchedTagsObject,
        }));
      }
    }
  );
};

useEffect(() => {
  fetchTagsObject(state.path);
}, [state.path]);

const pattern = `*/graph/context/*/*/*/tags/*`;

const tagClass = "bg-success";
const badgeBtnClass = "text-white btn p-0 lh-1 m-1";

// const addContextHtml = (
//   <a
//     href={`#/hack.near/widget/catalog?accountId=${accountId}`}
//     className={badgeBtnClass}
//   >
//     <div className={`me-1 mt-3 badge bg-primary`}>+ Tag</div>
//   </a>
// );

if (state.tagsObject === null) {
  return "Loading...";
}

const tagsCount = {};
const tagsAuthors = {};

const processTagsObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null) {
      const tag = key;
      tagsCount[tag] = (tagsCount[tag] || 0) - 1;
    } else if (typeof obj[key] === "object") {
      processTagsObject(obj[key]);
    } else {
      const tag = key;
      tagsCount[tag] = (tagsCount[tag] || 0) + 1;
    }
  });
};

const getTags = () => {
  processTagsObject(initialTagsObject);
  const tags = Object.entries(tagsCount);
  tags.sort((a, b) => b[1] - a[1]);
  return tags.map((t) => {
    return {
      name: t[0],
      count: t[1],
    };
  });
};

const getNewTags = () => {
  processTagsObject(state.tagsObject);

  const newTagsCount = Object.keys(tagsCount).reduce((acc, key) => {
    acc[key] = initialTagsObject[key]
      ? tagsCount[key] - initialTagsObject[key]
      : tagsCount[key];
    return acc;
  }, {});

  const tags = Object.entries(newTagsCount);
  tags.sort((a, b) => b[1] - a[1]);

  return tags.map((t) => {
    return {
      name: t[0],
      count: t[1],
    };
  });
};

const setTags = (tags) => {
  const newTagsObject = {};

  tags.forEach((tag) => {
    newTagsObject[normalizeTag(tag.name)] = "";
  });

  setState((prevState) => ({
    ...prevState,
    tagsObject: {
      ...prevState.tagsObject[creatorId][namespace][thingId].tags,
      ...newTagsObject,
    },
  }));
};

const initialTags = getTags();
const tags = getNewTags();

return (
  <>
    {initialTags &&
      initialTags.map((tag) => (
        <a
          href={`/#/hack.near/widget/every.context?tag=${tag.name}`}
          className={badgeBtnClass}
          key={tag}
        >
          <span
            className={`badge ${tagClass} position-relative`}
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
                className={`ms-1 badge translate-middle rounded-pill bg-dark position-absolute top-50 start-100`}
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
          onClick={() =>
            setState((prevState) => ({
              ...prevState,
              showEditor: true,
            }))
          }
          className={badgeBtnClass}
        >
          <div className={`me-1 mt-3 badge bg-primary`}>+ attestation</div>
        </button>
      ) : (
        <div className="mb-2">
          <button
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                showEditor: false,
              }))
            }
            className="text-white btn p-0 lh-1 m-1"
          >
            <div className={`me-1 mt-3 badge bg-secondary`}>x close</div>
          </button>
        </div>
      )}
      {state.showEditor && (
        <div>
          <div className="row">
            <div className="m-1 col-8">
              <Typeahead
                id={`tag-selector-${Date.now()}`}
                multiple
                labelKey="name"
                onChange={setTags}
                options={tags}
                placeholder="dev, art, gov, edu, social, near"
                positionFixed
                allowNew
              />
            </div>
            <div className="m-1 col-3">
              <CommitButton
                disabled={state.tagsObject === null}
                data={{
                  graph: {
                    context: {
                      [creatorId]: {
                        [namespace]: {
                          [thingId]: state.tagsObject,
                        },
                      },
                    },
                  },
                }}
              >
                + context
              </CommitButton>
            </div>
          </div>
          <div className="row">
            <div className="m-1 col-8">
              <input
                placeholder="source path of another thing"
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    attestation: e.target.value,
                  }))
                }
              />
            </div>
            <div className="m-1 col-3">
              <Widget
                src="hack.near/widget/AttestButton"
                props={{ item: initialPath, data: state.attestation }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  </>
);
