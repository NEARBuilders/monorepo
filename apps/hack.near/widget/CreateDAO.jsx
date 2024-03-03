const defaultConfig = {
  name: "hacky",
  purpose: "build",
  metadata: "",
};

const defaultPolicy = ["infinity.near", "council.near"];

State.init({
  args: {
    config: defaultConfig,
    policy: defaultPolicy,
  },
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
        name: "hacky",
        args: dao_args,
      },
      deposit: "7000000000000000000000000",
      gas: "200000000000000",
    },
  ]);
};

return (
  <div className="mb-3">
    <button className="btn btn-outline-danger mt-3" onClick={handleCreate}>
      Create DAO
    </button>
  </div>
);
