const accountId = props.accountId ?? context.accountId;
const receiver_id = props.receiver_id ?? "global.sputnik-dao.near";
const contractId = props.contractId ?? "";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  receiver_id: state.receiver_id,
  amount: state.amount,
});

const handleProposal = () => {
  if (!(state.receiver_id && state.amount)) {
    return;
  }
  const gas = 200000000000000;
  const deposit = 1;
  Near.call([
    {
      contractName: contractId,
      methodName: "transfer",
      args: {
        receiver_id: state.receiver_id,
        amount: state.amount,
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

const onChangeRecipient = (receiver_id) => {
  State.update({
    receiver_id,
  });
};

const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};

return (
  <div className="mb-3">
    <div className="mb-2">
      Recipient:
      <input type="text" onChange={(e) => onChangeRecipient(e.target.value)} />
    </div>
    <div className="mb-3">
      Amount:
      <input type="number" onChange={(e) => onChangeAmount(e.target.value)} />
    </div>
    <button className="btn btn-success" onClick={handleProposal}>
      Transfer
    </button>
  </div>
);
