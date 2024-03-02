const daoId = props.daoId ?? "build.sputnik-dao.near";
const code = props.code;

const policy = Near.view(daoId, "get_policy");

const deposit = policy.proposal_bond;

const widgetPath = props.widgetPath ?? "mob.near/widget/WidgetSource";
const [accountId, widget, widgetName] = widgetPath.split("/");

const blockHeight = props.blockHeight;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);
const renderTag = props.renderTag;

const name = metadata.name ?? widgetName;
const image = metadata.image;

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

const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  justify-content: center;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 23px;
`;

const StarButton = styled.div`
  position: absolute;
  top: 23px;
  right: 17px;
`;

const ForkButton = styled.div`
  position: absolute;
  bottom: 23px;
  right: 19px;
`;

return (
  <Card>
    <div className="row">
      <div className="col-8">
        <div className="m-1 mb-3 text-truncate">
          <Widget
            src="mob.near/widget/ProfileLine"
            props={{ accountId, link: props.profileLink }}
          />
        </div>
        <div className="m-1 position-relative">
          <h5 className="card-title mb-2">{name}</h5>
          <div className="text-truncate mb-1">
            <a className="stretched-link" href={`#/${widgetPath}`}>
              <i className="bi bi-box-arrow-up-right text-secondary me-1" />
              {widgetPath}
            </a>
          </div>
        </div>
        <div className="card-text">
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
            <i className="bi bi-clock me-1"></i>history
          </a>
          <small className="text-nowrap text-muted m-1">
            <i className="bi bi-hourglass me-1"></i>
            <Widget
              src="mob.near/widget/TimeAgo"
              props={{ keyPath: widgetPath, now: props.metadata, blockHeight }}
            />
          </small>
        </div>
      </div>
    </div>
    <div className="col-3">
      <StarButton>
        <a className="btn btn-success" href={`#/${widgetPath}`}>
          <i className="bi bi-eye-fill me-1"></i>
          view
        </a>
      </StarButton>
      <ForkButton>
        <a className="btn btn-outline-success" href={`#/edit/${widgetPath}`}>
          <i className="bi bi-git me-1"></i>
          {accountId === context.accountId ? "edit" : "fork"}
        </a>
      </ForkButton>
    </div>
  </Card>
);
