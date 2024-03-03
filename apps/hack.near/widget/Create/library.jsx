const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

const defaultLibrary = Social.get("hack.near/settings/dev/library");

if (defaultLibrary === null) {
  return "Loading...";
}

const library = [defaultLibrary];

const policy = Near.view(daoId, "get_policy");

const deposit = policy.proposal_bond;

let string = "sputnik-dao.near";
let domain = ".near";

State.init({
  accountId: accountId ?? "",
  daoId: daoId ?? "",
  libraryId: state.libraryId ?? "",
  data: state.data ?? "",
  isDao: false,
});

const checkDao = (daoId) => {
  if (daoId.indexOf(string) !== -1) {
    return State.update({ isDao: true });
  }
};

const validDao = checkDao(state.daoId);

const curation_args = JSON.stringify({
  data: {
    [state.daoId]: {
      widget: {
        [`${state.libraryId}.library`]: {
          "": `const accountId = props.accountId ?? context.accountId; const library = ${state.data}; return (<Widget src="hack.near/widget/dev.library" props={{ data: library }} />);`,
        },
      },
    },
  },
});

const proposal_args = Buffer.from(curation_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: state.daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "update library",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "50000000000000000000000",
                  gas: "23500000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: "235000000000000",
    },
  ]);
};

const handleCreate = () =>
  Social.set({
    widget: {
      [`${state.libraryId}.library`]: {
        "": `const accountId = props.accountId ?? context.accountId; const library = ${state.data}; return (<Widget src="hack.near/widget/dev.library" props={{ data: library }} />);`,
        metadata: {
          tags: {
            build: "",
          },
        },
      },
    },
  });

const onChangeDao = (daoId) => {
  State.update({
    daoId,
  });
};

const onChangeLibrary = (libraryId) => {
  State.update({
    libraryId,
  });
};

const onChangeData = (data) => {
  State.update({
    data,
  });
};

return (
  <div className="d-flex flex-column">
    <div className="p-1 m-1">
      <h2>
        <b>Make a Library</b>
      </h2>
    </div>
    <div className="p-1 m-1">
      <Widget
        src="near/widget/AccountProfileCard"
        props={{ accountId: state.daoId }}
      />
    </div>
    <div className="p-1 m-1">
      <h5>Name</h5>
      <input
        placeholder="dev"
        type="text"
        value={state.libraryId}
        onChange={(e) => onChangeLibrary(e.target.value)}
      ></input>
    </div>
    <div className="p-1 m-1">
      <h5>Components</h5>
      <div className="w-100 d-flex gap-2">
        <div>
          {validDao && (
            <div>
              <p>↳ propose an update</p>
            </div>
          )}
        </div>
      </div>
      <div className="w-100 d-flex gap-2">
        <input
          placeholder="JSON goes here"
          type="text"
          value={state.data}
          onChange={(e) => onChangeData(e.target.value)}
        ></input>
        <div>
          <button
            disabled={!validDao || !state.libraryId}
            onClick={handleProposal}
          >
            Submit
          </button>
        </div>
        <div>
          <button
            disabled={!state.libraryId || !state.data}
            onClick={handleCreate}
            className="btn btn-outline-success"
          >
            Create
          </button>
        </div>
      </div>
    </div>

    <div className="p-1 m-1">
      <h5>Example JSON</h5>
      <div className="p-1 m-1">
        <Widget
          src="near/widget/DIG.Button"
          props={{
            href: "#/manzanal.near/widget/CommonComponentsLibrary",
            label: "Template",
            variant: "outline-secondary",
            size: "small",
          }}
        />
      </div>
      <div className="p-1 m-1">
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ authors: ["manzanal.near"], dep: true }}
        />
      </div>
      {library}
    </div>
  </div>
);
