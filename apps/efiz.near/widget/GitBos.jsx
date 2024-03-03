const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

const latestProposalId = Near.view(daoId, "get_last_proposal_id") - 1;

const deposit = policy.proposal_bond;

const initWidgetPath = props.widgetPath ?? `${daoId}/widget/community`;
const updatedWidgetPath =
  props.updatedWidget ?? `${accountId}/widget/community`;

State.init({
  accountId: accountId ?? "",
  widgetPath: initWidgetPath ?? "",
  updatedWidget: updatedWidgetPath ?? "",
});

const [ownerId, oldWidget, widgetName] = state.widgetPath.split("/");

const newCode = Social.get(`${state.updatedWidget}`);

const oldCode = Social.get(`${state.widgetPath}`);

const widget_args = JSON.stringify({
  data: {
    [daoId]: {
      widget: {
        [`${widgetName}`]: {
          "": `${newCode}`,
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
        "": `${oldCode}`,
      },
    },
  });

let CodeWrapper = styled.div`
  & > pre > div {
    margin: 0px !important;
  }

  & > pre {
    margin: 0px !important;
    border-radius: 0px 0px 5px 5px;
  }
`;

const setButton = ({ widgetPath, onHide }) => {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        State.update({ widgetPath });
        onHide();
      }}
    >
      <i className="bi bi-plus-lg" /> add
    </button>
  );
};

const updateButton = ({ widgetPath, onHide }) => {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        State.update({ updatedPath: widgetPath });
        onHide();
      }}
    >
      <i className="bi bi-plus-lg" /> add
    </button>
  );
};

return (
  <div className="d-flex flex-column">
    <div className="p-1 m-1">
      <h2>
        <b>Request Updates</b>
      </h2>
      <div>
        <Widget
          src="hack.near/widget/dev.proposal"
          props={{ accountId, daoId, proposalId: latestProposalId }}
        />
      </div>
    </div>
    <div className="p-1 m-1">
      <div className="row">
        <div className="col m-2">
          <h5>Template</h5>
          <Widget
            src="hack.near/widget/widget.search"
            props={{ extraButtons: setButton }}
          />
          <Widget
            src={`hack.near/widget/widget.inline`}
            props={{
              widgetPath: state.widgetPath,
            }}
          />
          <div className="m-2">
            <a
              className="btn btn-secondary border-0 m-1"
              href={`#/edit/${state.widgetPath}`}
            >
              <i className="bi bi-terminal-plus me-1"></i>
              {accountId === daoId ? "Edit" : "Build"}
            </a>
          </div>
        </div>

        <div className="col m-2">
          <h5>Updated Version</h5>
          <Widget
            src="hack.near/widget/widget.search"
            props={{ extraButtons: updateButton }}
          />
          <Widget
            src={`hack.near/widget/widget.inline`}
            props={{
              widgetPath: state.updatedPath,
            }}
          />
          <div className="m-2">
            <button
              disabled={!state.widgetPath}
              className="btn btn-secondary border-0 m-1"
              onClick={handleProposal}
            >
              <i className="bi bi-git me-1"></i>
              {accountId === daoId ? "Update" : "Propose Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>

    <CodeWrapper>
      <Widget
        src={`hack.near/widget/widget.compare`}
        props={{
          widgetPath: state.widgetPath,
          updatedWidget: state.updatedWidget,
          findUniqueResult: (
            lineCountDeleted,
            lineCountInserted,
            lineCountCurrentCode,
            lineCountPrevCode,
            allLineCount
          ) => {
            if (
              state.lineCountDeleted === undefined ||
              state.lineCountInserted === undefined
            )
              State.update({ lineCountDeleted, lineCountInserted });
          },
        }}
      />
    </CodeWrapper>
  </div>
);
