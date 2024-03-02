const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

const typeTag = props.typeTag ?? "";

const defaultMain = props.main ?? "mob.near/widget/Homepage";

const main = Social.get(`${daoId}/settings/dao/main`);

if (main === null) {
  return "Loading...";
}

State.init({
  main: main ?? defaultMain,
  prop: state.prop,
  value: state.value,
  typeTag,
});

const main_args = JSON.stringify({
  data: {
    [daoId]: {
      settings: {
        dao: {
          main: state.main,
        },
      },
    },
  },
});

const widget_args = JSON.stringify({
  data: {
    [daoId]: {
      widget: {
        [`${state.prop}.Main`]: {
          "": `const ${state.prop} = props.${state.prop} ?? "${state.value}"; return (<Widget src="${state.main}" props={{${state.prop}: ${state.prop}}} />);`,
          metadata: {
            tags: {
              dao: "",
              [typeTag]: "",
            },
          },
        },
      },
    },
  },
});

const proposal_args = Buffer.from(main_args, "utf-8").toString("base64");
const create_args = Buffer.from(widget_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "new DAO.Main",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "50000000000000000000000",
                  gas: "200000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: "100000000000000000000000",
      gas: "200000000000000",
    },
  ]);
};

const handleCreate = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "new DAO.Widget",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: create_args,
                  deposit: "50000000000000000000000",
                  gas: "200000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: "100000000000000000000000",
      gas: "200000000000000",
    },
  ]);
};

const addWidget = ({ widgetPath: main, onHide }) => {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        State.update({
          main,
        });
        onHide();
      }}
    >
      <i className="bi bi-plus-lg" /> Add
    </button>
  );
};

return (
  <>
    <h3>Domain Editor</h3>
    <div className="mt-2">
      <h5>Widget Source</h5>

      <input
        type="text"
        value={state.main}
        placeholder="account.near/widget/Example"
      />
    </div>
    <div className="mt-2">
      <h5>Property</h5>

      <input type="text" value={state.prop} placeholder="daoId" />
    </div>
    <div className="mt-2">
      <h5>Value</h5>

      <input
        type="text"
        value={state.value}
        placeholder="multi.sputnik-dao.near"
      />
    </div>
    <div className="mt-2">
      <h5>Tag</h5>

      <input type="text" value={state.typeTag} placeholder="example" />
    </div>
    <div className="mt-2">
      <CommitButton
        disabled={state.main === defaultMain}
        data={{ settings: { dao: { main: state.main } } }}
      >
        Save
      </CommitButton>
      <button
        disabled={state.main === defaultMain}
        className="btn btn-outline-primary"
        onClick={handleProposal}
      >
        Propose
      </button>
      <button
        disabled={state.main === defaultMain}
        className="btn btn-outline-primary"
        onClick={handleCreate}
      >
        Create
      </button>
    </div>
    <div className="mb-2 mt-3">
      <Widget
        src="hack.near/widget/dev.Widget.Search"
        props={{ extraButtons: addWidget }}
      />
    </div>
    <hr />
    <h5>Preview</h5>
    <div className="mb-2">
      <Widget src={state.main} />
    </div>
  </>
);
