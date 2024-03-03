const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  receiver_id: "",
  method_name: "",
  args: "",
  deposit: "",
  gas: "",
  fc_deposit: "",
  fc_gas: "",
});

const proposal_args = Buffer.from(state.args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "custom function call",
          kind: {
            FunctionCall: {
              receiver_id: state.receiver_id,
              actions: [
                {
                  method_name: state.method_name,
                  args: proposal_args,
                  deposit: state.fc_deposit ?? "1",
                  gas: state.fc_gas ?? "200000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: state.deposit ?? "100000000000000000000000",
      gas: state.gas ?? "200000000000000",
    },
  ]);
};

const onChangeContract = (receiver_id) => {
  State.update({
    receiver_id,
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

const onChangeDeposit = (deposit) => {
  State.update({
    deposit,
  });
};

const onChangeGas = (gas) => {
  State.update({
    gas,
  });
};

const onChangeFCDeposit = (fc_deposit) => {
  State.update({
    fc_deposit,
  });
};

const onChangeFCGas = (fc_gas) => {
  State.update({
    fc_gas,
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
    <div className="m-2 p-2 d-flex s">
      <p className="m-2">Deposit:</p>
      <input type="text" onChange={(e) => onChangeDeposit(e.target.value)} />
      <p className="m-2">Gas:</p>
      <input type="text" onChange={(e) => onChangeGas(e.target.value)} />
    </div>
    <div className="m-2 p-2 d-flex s">
      <p className="m-2">FC Deposit:</p>
      <input type="text" onChange={(e) => onChangeFCDeposit(e.target.value)} />
      <p className="m-2">FC Gas:</p>
      <input type="text" onChange={(e) => onChangeFCGas(e.target.value)} />
    </div>
    <div className="mb-3 flex flex-row">
      Arguments (JSON):
      <div>
        <textarea type="text" onChange={(e) => onChangeArgs(e.target.value)} />
      </div>
    </div>
    <button className="btn btn-outline-danger mt-3" onClick={handleProposal}>
      Submit
    </button>
  </div>
);
