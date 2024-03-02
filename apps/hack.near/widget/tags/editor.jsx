// adapted from the `PublicTags` widget by zavodil.near

const accountId = props.accountId ?? context.accountId;

if (context.loading) {
  return "Loading...";
}

const initialPath = props.path ?? "mob.near/widget/Explorer";
const initialTagsObject = Social.get(
  `*/graph/context/${initialPath}/tags/**`,
  "final"
);

const [state, setState] = useState({
  showEditor: false,
  path: initialPath,
  tagsObject: initialTagsObject,
  attestation: null,
});

const [creatorId, namespace, thingId] = state.path.split("/");

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

const tagClass = "bg-primary";
const badgeBtnClass = "text-white btn p-0 lh-1 m-1";

// const addContextHtml = (
//   <a
//     href={`#/hack.near/widget/catalog?accountId=${accountId}`}
//     className={badgeBtnClass}
//   >
//     <div className={`me-1 mt-3 badge bg-primary`}>+ Tag</div>
//   </a>
// );

const currentTagsObject = Social.get(
  `*/graph/context/${state.path}/tags/**`,
  "final"
);

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
  processTagsObject(currentTagsObject);
  const tags = Object.entries(tagsCount);
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

const tags = getTags();

const thingExists = Social.get(`${state.path}`, "final");

return (
  <>
    <div className="m-2">
      <h3 className="m-1 mb-3">Contextualizer</h3>
      <div className="m-2">
        <p className="mb-1">SocialDB Path of Anything:</p>
        <input
          placeholder="<creatorId>/<namespace>/<thingId>"
          value={state.path}
          onChange={(e) => {
            setState((prevState) => ({
              ...prevState,
              path: e.target.value,
            }));
          }}
        />
      </div>

      <button
        class="btn btn-outline-secondary m-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Guide
      </button>

      <div className="collapse" id="collapseExample">
        <div class="card card-body">
          <h5>Best Practices:</h5>
          <ul>
            <li>Keep tags concise and simple</li>
            <li>Put "-" (minus) instead of a space</li>
            <li>English words recommended</li>
            <li>Do not create unnecessary tags</li>
            <li>Be nice to everyone #community</li>
          </ul>
        </div>
      </div>
    </div>
    {thingExists ? (
      <div className="p-2 m-3">
        <div className="mb-2 card">
          <div className="card-body">
            <div className="text-truncate mb-3">
              <Widget
                src="hack.near/widget/thing.block"
                props={{ path: state.path }}
              />
            </div>
            {tags &&
              tags.map((tag) => (
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
                  <div className={`me-1 mt-3 badge bg-success`}>
                    + attestation
                  </div>
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
                    <div className={`me-1 mt-3 badge bg-secondary`}>
                      x close
                    </div>
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
                        props={{ item: state.path, data: state.attestation }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="p-2 m-3">
        <i>nothing found</i>
      </div>
    )}
  </>
);
