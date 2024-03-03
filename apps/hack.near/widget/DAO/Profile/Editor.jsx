const accountId = context.accountId;

let profile = Social.getr(`${daoId}/profile`);

if (profile === null) {
  return "Loading...";
}

const groups = [`${accountId}`];

State.init({
  args: {
    config: {
      name: state.name,
      purpose: state.purpose,
      metadata: "",
    },
    policy: {
      groups,
    },
  },
  profile,
  name,
  isDao: false,
  isAvailable: false,
});

const daoId = state.name + ".sputnik-dao.near";
const name = state.name;

const daos = Near.view("sputnik-dao.near", "get_dao_list");

if (daos === null) {
  return "Loading...";
}

const groupId = props.groupId ?? "community";
const policy = Near.view(daoId, "get_policy");

const deposit = policy.proposal_bond;

const profile_args = JSON.stringify({
  data: {
    [daoId]: {
      profile: state.profile,
    },
  },
});

const proposal_args = Buffer.from(profile_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "update DAO profile on NEAR Social",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "80000000000000000000000",
                  gas: "219000000000000",
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

const dao_args = Buffer.from(JSON.stringify(state.args), "utf-8").toString(
  "base64"
);

const handleCreate = () => {
  Near.call([
    {
      contractName: "sputnik-dao.near",
      methodName: "create",
      args: {
        name: state.name,
        args: dao_args,
      },
      deposit: "7000000000000000000000000",
      gas: "280000000000000",
    },
  ]);
};

const onChangeName = (name) => {
  State.update({
    name,
  });
};

const checkAvailability = (daos) => {
  if (daos.indexOf(daoId) !== -1) {
    return State.update({ isAvailable: false });
  }
};

const availableName = checkAvailability(daos);

const checkValidity = (name) => {
  if (name.length > 2) {
    return State.update({ isValid: true });
  }
};

const validName = checkValidity(state.name);

return (
  <div className="mb-3">
    <div className="row">
      <div className="col-lg-6">
        <div>
          <h4>Edit DAO Profile</h4>
        </div>
        <div className="mb-3">
          {state.name && <h5>{daoId}</h5>}
          {validName ? (
            <div>
              {availableName ? (
                <p className="text-success">ready for updates</p>
              ) : (
                <p className="text-danger">does not exist yet</p>
              )}
            </div>
          ) : (
            <div>
              {state.name ? (
                <p className="text-secondary">must be 3+ characters</p>
              ) : (
                ""
              )}
            </div>
          )}
          <input
            type="text"
            placeholder="<example>.sputnik-dao.near"
            value={state.name}
            onChange={(e) => onChangeName(e.target.value)}
          ></input>
        </div>
        {availableName ? (
          <div className="mb-2">
            <Widget
              src="mob.near/widget/MetadataEditor"
              props={{
                initialMetadata: profile,
                onChange: (profile) => State.update({ profile }),
                options: {
                  name: { label: "Name" },
                  image: { label: "Logo" },
                  backgroundImage: { label: "Background" },
                  description: { label: "About" },
                  tags: {
                    label: "Tags",
                    tagsPattern: "*/profile/tags/*",
                    placeholder: "dev, gaming, nft, privacy, eth",
                  },
                  linktree: {
                    links: [
                      {
                        label: "Twitter",
                        prefix: "https://twitter.com/",
                        name: "twitter",
                      },
                      {
                        label: "Github",
                        prefix: "https://github.com/",
                        name: "github",
                      },
                      {
                        label: "Telegram",
                        prefix: "https://t.me/",
                        name: "telegram",
                      },
                      {
                        label: "Website",
                        prefix: "https://",
                        name: "website",
                      },
                    ],
                  },
                },
              }}
            />
          </div>
        ) : (
          <p>⬆️ input existing DAO account!</p>
        )}
        {availableName ? (
          <div className="mb-2">
            <button
              className="btn btn-outline-success m-1"
              onClick={handleProposal}
              disabled={!validName}
            >
              Propose Changes
            </button>
            <button
              className="btn btn-outline-primary m-1"
              href={`#/hack.near/widget/DAO.Profile?daoId=${daoId}`}
              disabled={!validName}
            >
              Request Permission
            </button>
          </div>
        ) : (
          <div className="mb-2">
            <button
              disabled={!validName}
              className="btn btn-outline-success mt-2"
              onClick={handleCreate}
            >
              Create DAO
            </button>
          </div>
        )}
      </div>
      <div className="col-lg-6">
        {daoId ? (
          <Widget
            src="mob.near/widget/ProfileLarge"
            props={{
              accountId: daoId,
              profile: state.profile,
            }}
          />
        ) : (
          <Widget
            src="mob.near/widget/ProfileLarge"
            props={{
              accountId: daoId,
              profile: state.profile,
            }}
          />
        )}
      </div>
    </div>
  </div>
);
