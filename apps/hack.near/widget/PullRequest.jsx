const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  widget_name: "MultiDAO",
});

const function_call_args = JSON.stringify({
  data: {
    "multi.sputnik-dao.near": {
      widget: {
        MultiDAO: {
          "": 'return "hi bOS";\n',
        },
      },
    },
  },
});

const proposal_args = Buffer.from(function_call_args, "utf-8").toString(
  "base64"
);

const handleProposal = () => {
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "custom function call",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "1",
                  gas: "150000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: gas,
    },
  ]);
};

const onChangeWidget = (widget_name) => {
  State.update({
    widget_name,
  });
};

return (
  <div className="mb-3">
    <div className="mb-3">
      Widget:
      <input type="text" onChange={(e) => onChangeMethod(e.target.value)} />
    </div>
    <div className="mb-3">
      <button className="btn btn-outline-info mt-3" onClick={handleProposal}>
        Submit Pull Request
      </button>
    </div>
  </div>
);
