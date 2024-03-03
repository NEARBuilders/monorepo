const handleChange = (e) => {
  console.log(JSON.stringify(e));
  State.update({ e });
};

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "Loading...";
}

const deposit = policy.proposal_bond;
const daoId = "build.sputnik-dao.near";
const thingId = "testevent";

const post_args = JSON.stringify({
  data: {
    [daoId]: {
      thing: {
        [thingId]: JSON.stringify(state.e),
      },
      index: {
        every: JSON.stringify({
          key: "efiz.near/type/event",
          value: {
            thingId: thingId,
            type: "efiz.near/type/event",
          },
        }),
      },
    },
  },
});

const proposal_args = Buffer.from(post_args, "utf-8").toString("base64");

const handleProposal = () => {
  console.log(JSON.stringify(post_args));
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "create DAO event on NEAR Social",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "100000000000000000000000",
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

return (
  <>
    <button onClick={handleProposal}> propose</button>
    <Widget
      src="efiz.near/widget/create"
      props={{ item: { type: "efiz.near/type/event" }, onChange: handleChange }}
    />
  </>
);
