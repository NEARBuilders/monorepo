const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";
const code = props.code;

const policy = Near.view(daoId, "get_policy");

const deposit = policy.proposal_bond;

const widgetName = props.widgetName ?? "Academy";
const widgetPath = `${accountId}/widget/${widgetName}`;
const blockHeight = props.blockHeight;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);
const renderTag = props.renderTag;

const name = metadata.name ?? widgetName;
const description = metadata.description;
const image = metadata.image;
const tags = Object.keys(metadata.tags ?? {});
const expanded = !!props.expanded;

const linktree = Object.entries(metadata.linktree ?? {});
const linktreeElements = {
  website: {
    prefix: "https://",
    icon: "bi-globe2",
  },
};

const linktreeObjects = linktree.map((o, i) => {
  const key = o[0];
  let value = o[1];
  if (!value) {
    return null;
  }
  const e = linktreeElements[key];
  if (e.prefix) {
    value = value && value.replace(e.prefix, "");
  }
  const icon = e.icon ? (
    <i className={`bi ${e.icon ?? ""} text-secondary me-1`}></i>
  ) : (
    ""
  );
  return e.prefix ? (
    <div key={i} className="text-truncate">
      <a href={`${e.prefix}${value}`}>
        {icon}
        {value}
      </a>
    </div>
  ) : (
    <div key={i} className="text-truncate">
      {key}: {icon}
      {value}
    </div>
  );
});

const descriptionKey = `${widgetPath}-description`.replaceAll(/[._\/-]/g, "--");

const item = {
  type: "dev",
  path: widgetPath,
  blockHeight,
};

const widget_args = JSON.stringify({
  data: {
    [daoId]: {
      widget: {
        [`${widgetName}`]: {
          "": `${code}`,
        },
      },
    },
  },
});

const proposal_args = Buffer.from(widget_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "update widget",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "50000000000000000000000",
                  gas: "30000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: "219000000000000",
    },
  ]);
};

const handleCreate = () =>
  Social.set({
    widget: {
      [`${widgetName}`]: {
        "": `${code}`,
        metadata: {
          tags: {
            build: "",
          },
        },
      },
    },
  });

return (
  <div className="card" style={{ borderRadius: "12px" }}>
    <div className="row py-3 g-1">
      <div className="m-auto text-center" style={{ maxWidth: "12em" }}>
        <div
          className="d-inline-block"
          style={{ width: "10em", height: "10em" }}
        >
          <Widget
            src="mob.near/widget/Image"
            props={{
              image,
              className: "w-100 h-100 shadow",
              style: { objectFit: "cover", borderRadius: "2em" },
              thumbnail: false,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
              alt: widgetName,
            }}
          />
        </div>
      </div>
      <div className="col-6 px-2">
        <div className="position-relative">
          <h5 className="card-title">
            <a href={`#/${widgetPath}`}>
              <i className="bi bi-box-arrow-up-right text-secondary me-1" />
              {name}
            </a>
          </h5>
        </div>
        <div className="card-text">
          {tags.length > 0 && (
            <div>
              {tags.map((tag, i) => {
                const tagBadge = (
                  <span key={i} className="me-1 mb-1 badge bg-secondary">
                    #{tag}
                  </span>
                );
                return renderTag ? renderTag(tag, tagBadge) : tagBadge;
              })}
            </div>
          )}
          {!expanded && (description || linktreeObjects.length > 0) && (
            <button
              className="btn btn-sm btn-outline-secondary border-0"
              data-bs-toggle="collapse"
              data-bs-target={`#${descriptionKey}`}
              aria-expanded="false"
              aria-controls={descriptionKey}
            >
              <i className="bi bi-arrows-angle-expand me-1"></i>about
            </button>
          )}
          <a
            href={`#/mob.near/widget/WidgetSource?src=${widgetPath}`}
            className="btn btn-sm btn-outline-secondary border-0"
            target="_blank"
          >
            <i className="bi bi-code me-1"></i>source
          </a>
          <a
            href={`#/bozon.near/widget/WidgetHistory?widgetPath=${widgetPath}`}
            className="btn btn-sm btn-outline-secondary border-0"
            target="_blank"
          >
            <i className="bi bi-clock-history me-1"></i>history
          </a>
        </div>
        <div className="m-2">
          {accountId !== context.accountId && (
            <button className="btn btn-primary border-0" onClick={handleCreate}>
              <i className="bi bi-bezier2 me-1"></i>
              {accountId === context.accountId ? "edit" : "clone"}
            </button>
          )}
          <a
            className="btn btn-success border-0 m-1"
            href={`#/edit/${widgetPath}`}
          >
            <i className="bi bi-diagram-2 me-1"></i>
            {accountId === context.accountId ? "edit" : "fork"}
          </a>
          {accountId === daoId && (
            <button
              className="btn btn-secondary mt-1 border-0"
              onClick={handleProposal}
            >
              <i className="bi bi-git me-1"></i>
              {accountId === context.accountId ? "update" : "propose changes"}
            </button>
          )}
        </div>
      </div>
      <div className="col-2 mt-2">
        <Widget
          src="hack.near/widget/star.button"
          props={{ widgetPath, accountId }}
        />
      </div>
    </div>
    <div
      className={`card-text p-2 pt-0 ${expanded ? "" : "collapse"}`}
      id={descriptionKey}
    >
      <Markdown text={description} />
      {linktreeObjects}
    </div>
    <div
      className="card-footer"
      style={{ borderBottomLeftRadius: "2em", borderBottomRightRadius: "2em" }}
    >
      <div className="d-flex justify-content-start">
        <div className="flex-grow-1 m-2 text-truncate">
          <Widget
            src="mob.near/widget/ProfileLine"
            props={{ accountId, link: props.profileLink }}
          />
        </div>
        <div>
          <small className="ps-1 text-nowrap text-muted ms-auto m-2">
            <i className="bi bi-clock me-1"></i>
            <Widget
              src="mob.near/widget/TimeAgo"
              props={{ keyPath: widgetPath, now: props.metadata, blockHeight }}
            />
          </small>
        </div>
      </div>
    </div>
  </div>
);
