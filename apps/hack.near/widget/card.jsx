const Container = styled.div`
  .profile-image {
    width: 120px;
    height: 120px;
  }

  @media (max-width: 569px) {
    .profile-image {
      width: 160px;
      height: 160px;
    }
  }

  .profile-name {
    @media (max-width: 569px) {
      display: none;
    }
  }
`;

const voteCount = props.voteCount;

// const daoId = props.daoId ?? "build.sputnik-dao.near";
// const policy = Near.view(daoId, "get_policy");
// const deposit = policy.proposal_bond;

const src = props.src ?? "devhub.efiz.near/widget/app";
const [accountId, type, thingName] = src.split("/");

const data = props.data ?? Social.get(`${src}`);

const blockHeight = props.blockHeight;
const metadata = props.metadata ?? Social.getr(`${src}/metadata`);
const renderTag = props.renderTag;

const name = metadata.name ?? thingName;
const image = metadata.image;

const item = {
  type: "dev",
  path: src,
  blockHeight,
};

// const widget_args = JSON.stringify({
//   data: {
//     [daoId]: {
//       widget: {
//         [`${widgetName}`]: {
//           "": `${code}`,
//         },
//       },
//     },
//   },
// });

// const proposal_args = Buffer.from(widget_args, "utf-8").toString("base64");

// const handleProposal = () => {
//   Near.call([
//     {
//       contractName: daoId,
//       methodName: "add_proposal",
//       args: {
//         proposal: {
//           description: "update widget",
//           kind: {
//             FunctionCall: {
//               receiver_id: "social.near",
//               actions: [
//                 {
//                   method_name: "set",
//                   args: proposal_args,
//                   deposit: "50000000000000000000000",
//                   gas: "21900000000000",
//                 },
//               ],
//             },
//           },
//         },
//       },
//       deposit: deposit,
//       gas: "219000000000000",
//     },
//   ]);
// };

const handleCreate = () =>
  Social.set({
    [type]: {
      [`${name}`]: {
        "": `${data}`,
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

const BuildersLink = styled.a`
  &:hover {
    text-decoration: none;
  }
`;

return (
  <Card>
    <div className="row justify-content-between">
      <div className="col-auto">
        <div className="m-2 mb-3 text-truncate">
          <Widget
            src="hack.near/widget/widget.profile"
            props={{ accountId, widgetName: name, link: props.profileLink }}
          />
        </div>
        <a
          href={`#/mob.near/widget/WidgetSource?src=${src}`}
          className="btn btn-sm btn-outline-secondary border-0"
          target="_blank"
        >
          <i className="bi bi-code me-1"></i>src
        </a>
        <a
          href={`#/bozon.near/widget/WidgetHistory?widgetPath=${src}`}
          className="btn btn-sm btn-outline-secondary border-0"
          target="_blank"
        >
          <i className="bi bi-clock me-1"></i>history
        </a>
        <a
          href={`#/edit/${src}`}
          className="btn btn-sm btn-outline-secondary border-0"
          target="_blank"
        >
          <i className="bi bi-code-slash me-1"></i>
          dev
        </a>
      </div>
      <div className="col-auto">
        <div className="row mt-3">
          <div className="col-auto m-1">
            {context.accountId !== accountId ? (
              <button
                disabled={!context.accountId}
                className="btn btn-outline-success"
                onClick={handleCreate}
              >
                <i className="bi bi-infinity me-1"></i>
                create
              </button>
            ) : (
              <button
                disabled={!context.accountId}
                className="btn btn-outline-success"
                onClick={handleProposal}
              >
                <i className="bi bi-git me-1"></i>
                push
              </button>
            )}
          </div>
          <div className="col-auto m-1">
            <Widget src="hack.near/widget/VoteButton" props={{ src }} />
            {voteCount && (
              <VotersLink
                href={`#/hack.near/widget/star.list?accountId=${accountId}&widgetName=${widgetName}`}
              >
                <h5 className="text-decoration-none link-dark align-items-center text-muted mt-3">
                  {voteCount} voter{voteCount !== 1 && "s"}
                </h5>
              </VotersLink>
            )}
          </div>
        </div>
      </div>
    </div>
  </Card>
);
