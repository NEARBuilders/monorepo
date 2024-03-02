const accountId = props.accountId ?? context.accountId;
const contractId = props.contractId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  contractId: "",
  method_name: "",
  args: "",
  deposit: "",
  gas: "",
});

const fc_args = Buffer.from(state.args, "utf-8").toString("base64");

const handleFunctionCall = () => {
  Near.call([
    {
      contractName: state.contractId,
      methodName: state.method_name,
      args: {
        Arguments: fc_args,
      },
      deposit: state.deposit ?? "1",
      gas: state.gas ?? "200000000000000",
    },
  ]);
};

const onChangeContract = (contractId) => {
  State.update({
    contractId,
  });
};

const onChangeMethod = (method_name) => {
  State.update({
    method_name,
  });
};

const onChangeArgs = (args) => {
  State.update({
    args,
  });
};

const onChangeGas = (gas) => {
  State.update({
    gas,
  });
};

return (
  <div className="mb-3">
    <div className="mb-3">
      Contract:
      <input type="text" onChange={(e) => onChangeContract(e.target.value)} />
    </div>
    <div className="mb-3">
      Method:
      <input type="text" onChange={(e) => onChangeMethod(e.target.value)} />
    </div>
    <div className="mb-3">
      Gas:
      <input type="text" onChange={(e) => onChangeGas(e.target.value)} />
    </div>
    <div className="mb-3">
      Arguments (JSON):
      <div>
        <textarea type="text" onChange={(e) => onChangeArgs(e.target.value)} />
      </div>
    </div>
    <button
      className="btn btn-outline-danger mt-3"
      onClick={handleFunctionCall}
    >
      Submit
    </button>
  </div>
);
