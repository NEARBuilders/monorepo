const createPostProposal = ({ daoId, content }) => {
  const policy = Near.view(daoId, "get_policy");

  if (policy === null) {
    return "Loading...";
  }

  const deposit = policy.proposal_bond;

  const post_args = JSON.stringify({
    data: {
      [daoId]: {
        post: {
          main: JSON.stringify(content),
        },
        index: {
          post: JSON.stringify({
            key: "main",
            value: {
              type: "md",
            },
          }),
        },
      },
    },
  });

  const proposal_args = Buffer.from(post_args, "utf-8").toString("base64");

  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "create DAO post on NEAR Social",
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

return { createPostProposal };
