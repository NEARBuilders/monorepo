const path = props.path ?? "mob.near/widget/WidgetSource";
const [accountId, type, thingName] = path.split("/");
const blockHeight = props.blockHeight;
const metadata = props.metadata ?? Social.getr(`${path}/metadata`);
const tags = Object.keys(metadata.tags ?? {});

const name = metadata.name;
const image = metadata.image;
const description = metadata.description;
const handleProposal = () => {};
const handleCreate = () => {};

State.init({
  tag: "",
});

function setTag() {
  const data = {};
  const tag = state.tag.toLowerCase();
  if (context.accountId === accountId) {
    data = {
      [type]: {
        [thingName]: {
          // name
          metadata: {
            tags: {
              [tag]: "",
            },
          },
        },
      },
    };
  } else {
    data = {
      every: {
        [type]: {
          [accountId]: {
            [thingName]: {
              metadata: {
                tags: {
                  [tag]: "",
                },
              },
            },
          },
        },
      },
    };
  }
  Social.set(data);
}

const tagsPattern = `*/every/${type}/${accountId}/${thingName}/tags/*`;
const tagsObject = Social.keys(tagsPattern, "final");

if (tagsObject === null) {
  return "Loading";
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

const communityTags = getTags();

const Wrapper = styled.div`
  border-radius: 12px;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  
  transform: translateY(0);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  a {
    color: #4498e0;
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      color: #4498e0cc;
  }
`;

const shorten = (str, len) => {
  if (str.includes(" ") || str.length <= len) {
    return str;
  }
  return str.slice(0, len) + "...";
};

function getViewPath(path) {
  switch (type) {
    case "thing": {
      return `/every.near/widget/every.thing.view?path=${path}`;
    }
    case "type": {
      return `/every.near/widget/every.type.create?typeSrc=${path}`;
    }
    case "widget": {
      return `/${path}`;
    }
  }
}

function getSourcePath(path) {
  switch (type) {
    case "thing": {
      return `/mob.near/widget/WidgetSource?src=${path}`;
    }
    case "type": {
      return `/every.near/widget/every.type.create?typeSrc=${path}`;
    }
    case "widget": {
      return `/mob.near/widget/WidgetSource?src=${path}`;
    }
  }
}

function getEditPath(path) {
  switch (type) {
    case "thing": {
      return `/efiz.near/widget/every.thing.edit?path=${path}`;
    }
    case "type": {
      return `/every.near/widget/every.type.create?typeSrc=${path}`;
    }
    case "widget": {
      return `https://nearpad.dev/editor/${path}`;
    }
  }
}

return (
  <Wrapper className="shadow p-4 d-flex flex-column gap-2 h-100">
    <div className="row">
      <div className="col">
        <div
          className="d-inline-block m-auto"
          style={{ width: "8em", height: "8em" }}
        >
          <Widget
            src="mob.near/widget/Image"
            props={{
              image,
              className: "w-100 h-100",
              style: { objectFit: "cover", borderRadius: "2em" },
              thumbnail: false,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
              alt: thingName,
            }}
          />
        </div>
      </div>
      <div className="col">
        <small className="text-muted d-flex justify-content-end">
          <i className="bi bi-clock me-1"></i>
          <Widget
            src="mob.near/widget/TimeAgo"
            props={{ keyPath: path, blockHeight }}
          />
        </small>
      </div>
    </div>
    <div className="d-flex justify-content-between m-1">
      <div>
        <h3>{shorten(name || thingName, 16)}</h3>
        <p className="text-muted overflow-hidden small my-3 mx-1">
          {shorten(description || "", 100)}
          {(!description || description?.length < 1) && "No description"}
        </p>
      </div>
    </div>
    <div className="justify-content-between mt-auto">
      <div className="row">
        <div className="mb-2">
          <div className="d-flex justify-content-between align-items-center gap-2">
            {state.showInput && context.accountId === accountId ? (
              <div className="d-flex gap-2">
                <input
                  value={state.tagValue}
                  onChange={(e) => State.update({ tag: e.target.value })}
                />
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setTag()}
                >
                  add
                </button>
              </div>
            ) : (
              <div className="text-muted">Creator Tags</div>
            )}
            {context.accountId === accountId && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => State.update({ showInput: !state.showInput })}
              >
                +
              </button>
            )}
          </div>
          {tags.length > 0 &&
            tags.map((tag, i) => {
              const tagBadge = (
                <span key={i} className="me-1 mb-1 badge bg-secondary">
                  #{tag}
                </span>
              );
              return tagBadge;
            })}
        </div>
        <div className="d-flex justify-content-between align-items-center gap-2">
          {state.showInput && context.accountId !== accountId ? (
            <div className="d-flex gap-2">
              <input
                value={state.tagValue}
                onChange={(e) => State.update({ tag: e.target.value })}
              />
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setTag()}
                disabled={!state.tag}
              >
                add
              </button>
            </div>
          ) : (
            <div className="text-muted">Community Tags</div>
          )}
          {context.accountId !== accountId && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => State.update({ showInput: !state.showInput })}
            >
              +
            </button>
          )}
        </div>
        {communityTags.length > 0 && (
          <div>
            {communityTags.map((tag, i) => {
              const tagBadge = (
                <div>
                  <span
                    className={"badge bg-success position-relative"}
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
                </div>
              );
              return tagBadge;
            })}
          </div>
        )}
      </div>
    </div>
    <div className="d-flex gap-2 justify-content-around gap-3 my-3">
      <a href={getViewPath(path)} target="_blank">
        <i className="bi me-1 bi-eye" />
        View
      </a>
      <a href={getSourcePath(path)} target="_blank">
        <i className="bi me-1 bi-file-earmark-code" />
        Source
      </a>
      <a
        href={`/bozon.near/widget/WidgetHistory?widgetPath=${path}`}
        target="_blank"
      >
        <i className="bi me-1 bi-clock-history" />
        History
      </a>
      <a href={getEditPath(path)} target="_blank">
        <i className="bi me-1 bi-pencil-square" />
        Edit
      </a>
    </div>

    <div className="d-flex gap-2 justify-content-between">
      <div className="flex-grow-1 text-truncate">
        <Widget src="mob.near/widget/Profile" props={{ accountId }} />
      </div>
      {type === "widget" && (
        <Widget
          src="hack.near/widget/star.button"
          props={{ widgetPath, accountId }}
        />
      )}
    </div>
  </Wrapper>
);
