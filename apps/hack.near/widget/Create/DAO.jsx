const name = props.name;

const daos = Near.view("sputnik-dao.near", "get_dao_list");

if (daos === null) {
  return "Loading...";
}

const groups = ["infinity.near", "council.near"];

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
  isValid: false,
  isAvailable: true,
});

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
      deposit: "6000000000000000000000000",
      gas: "300000000000000",
    },
  ]);
};

const onChangeName = (name) => {
  State.update({
    name,
  });
};

const onChangePurpose = (purpose) => {
  State.update({
    purpose,
  });
};

const dao_id = state.name + ".sputnik-dao.near";
const dao_name = state.name;

const checkAvailability = (daos) => {
  if (daos.indexOf(dao_id) !== -1) {
    return State.update({ isAvailable: false });
  }
};

const availableName = checkAvailability(daos);

const checkValidity = (dao_name) => {
  if (dao_name.length > 2) {
    return State.update({ isValid: true });
  }
};

const validName = checkValidity(dao_name);

return (
  <>
    <div className="mb-3">
      <h5>Name</h5>
      {state.name && <p>{dao_id}</p>}
      {validName ? (
        <div>
          {availableName ? (
            <p className="text-danger">unavailable</p>
          ) : (
            <p className="text-success">available</p>
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
        value={state.name}
        onChange={(e) => onChangeName(e.target.value)}
      ></input>
    </div>
    <div className="mb-3">
      <h5>Purpose</h5>
      <input
        type="text"
        value={state.purpose}
        onChange={(e) => onChangePurpose(e.target.value)}
      ></input>
    </div>
    <button
      disabled={!validName}
      className="btn btn-outline-success mt-2"
      onClick={handleCreate}
    >
      Create DAO
    </button>
  </>
);
