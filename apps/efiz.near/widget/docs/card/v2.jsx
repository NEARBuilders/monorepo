const path = props.path ?? "mob.near/widget/WidgetSource";
const [accountId, type, widgetName] = path.split("/");
const blockHeight = props.blockHeight;
const metadata = props.metadata ?? Social.getr(`${path}/metadata`);

const name = metadata.name ?? widgetName;
const image = metadata.image;

const handleProposal = () => {};

const handleCreate = () => {};

const Card = styled.div`
  position: relative;
  border-radius: 12px;
  justify-content: center;
  background: red;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  textOverflow: "ellipsis";
  whiteSpace: "nowrap";
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
            props={{ accountId, link: "" }}
          />
        </div>
        <div className="m-1 position-relative">
          <h5 className="card-title mb-2">{name}</h5>
          <div className="text-truncate mb-1">
            <a className="stretched-link" href={`#/${path}`}>
              <i className="bi bi-box-arrow-up-right text-secondary me-1" />
              {path}
            </a>
          </div>
        </div>
        <div className="card-text">
          <a
            href={`#/mob.near/widget/WidgetSource?src=${path}`}
            className="btn btn-sm btn-outline-secondary border-0"
            target="_blank"
          >
            <i className="bi bi-code me-1"></i>source
          </a>
          <a
            href={`#/bozon.near/widget/WidgetHistory?widgetPath=${path}`}
            className="btn btn-sm btn-outline-secondary border-0"
            target="_blank"
          >
            <i className="bi bi-clock me-1"></i>history
          </a>
          <small className="text-nowrap text-muted m-1">
            <i className="bi bi-hourglass me-1"></i>
            <Widget
              src="mob.near/widget/TimeAgo"
              props={{ keyPath: path, now: props.metadata, blockHeight }}
            />
          </small>
        </div>
      </div>
    </div>
    <div className="col-3">
      <StarButton>
        <a className="btn btn-success" href={`#/${path}`}>
          <i className="bi bi-eye-fill me-1"></i>
          view
        </a>
      </StarButton>
      <ForkButton>
        <a className="btn btn-outline-success" href={`#/edit/${path}`}>
          <i className="bi bi-git me-1"></i>
          {accountId === context.accountId ? "edit" : "fork"}
        </a>
      </ForkButton>
    </div>
  </Card>
);
