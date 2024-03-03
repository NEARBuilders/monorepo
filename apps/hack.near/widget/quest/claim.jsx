const isAvailable = true;
const isClaimed = false;

const accountId = props.accountId ?? context.accountId;
const questId = props.questId ?? "3";

if (!accountId) {
  return "";
}

const data = {
  [accountId]: {
    index: {
      quest: JSON.stringify({
        key: questId,
        value: {
          type,
          accountId,
        },
      }),
    },
  },
};

const type = isClaimed ? "disclaim" : "claim";

const claimQuest = () => {
  const claimArgs = {
    quest_id: JSON.parse(questId),
    signed_claim_receipt: "yes",
  };
  const transactions = [
    {
      contractName: "social.near",
      methodName: "set",
      deposit: "100000000000000000000000",
      args: { data },
    },
    {
      contractName: "test1.questverse.near",
      methodName: "claim_reward",
      args: claimArgs,
    },
  ];
  Near.call(transactions);
};

return (
  <div className="m-3">
    <button
      className={`btn ${
        isClaimed ? "btn-outline-secondary" : "btn-outline-dark"
      }`}
      onClick={claimQuest}
    >
      {isClaimed ? "claimed" : "claim"}
    </button>
  </div>
);
