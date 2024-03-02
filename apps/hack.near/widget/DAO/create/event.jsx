const daoId = "liberty.sputnik-dao.near";

State.init({
  id: "",
  title: "",
  start: "",
});

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "Loading...";
}

const deposit = policy.proposal_bond;

const event_args = JSON.stringify({
  data: {
    [daoId]: {
      thing: {
        [state.id]: JSON.stringify({
          id: state.id,
          title: state.title,
          start: state.start,
        }),
      },
      index: {
        every: JSON.stringify({
          key: "efiz.near/type/event",
          value: {
            thingId: state.id,
            type: "efiz.near/type/event",
          },
        }),
      },
    },
  },
});

const proposal_args = Buffer.from(event_args, "utf-8").toString("base64");

const handleProposal = () => {
  console.log(JSON.stringify(event_args));
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
                  gas: "235000000000000",
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

const onChangeId = (id) => {
  State.update({
    id,
  });
};

const onChangeTitle = (title) => {
  State.update({
    title,
  });
};

const onChangeStart = (start) => {
  State.update({
    start,
  });
};

return (
  <>
    <h5>Event ID</h5>
    <input
      type="text"
      placeholder="id"
      value={state.id}
      onChange={(e) => onChangeId(e.target.value)}
    ></input>
    <br />
    <h5>Event Title</h5>
    <input
      type="text"
      placeholder="title"
      value={state.title}
      onChange={(e) => onChangeTitle(e.target.value)}
    ></input>
    <br />
    <h5>Event Start</h5>

    <input
      type="date"
      placeholder="start"
      value={state.start}
      onChange={(e) => onChangeStart(e.target.value)}
    ></input>
    <br />
    <button disabled={!state.start} onClick={handleProposal}>
      propose
    </button>
  </>
);
