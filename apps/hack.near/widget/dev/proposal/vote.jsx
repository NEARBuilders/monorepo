const accountId = context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";
const vote_counts = props.proposal.vote_counts ?? {
  // yes, no, spam
  community: [3, 0, 2],
  council: [1, 6, 0],
};

const userVote = props.proposal.votes[accountId];
const isAllowedToVote = props.isAllowedToVote ?? [true, true, true];
const canVote =
  isAllowedToVote[0] &&
  isAllowedToVote[1] &&
  isAllowedToVote[2] &&
  !userVote &&
  props.proposal.status === "In Progress" &&
  accountId;
const yesWin = props.proposal.status === "Approved";
const noWin = props.proposal.status === "Rejected";

let totalYesVotes = 0;
let totalNoVotes = 0;
let totalSpamVotes = 0;
Object.keys(vote_counts).forEach((key) => {
  totalYesVotes += vote_counts[key][0];
  totalNoVotes += vote_counts[key][1];
  totalSpamVotes += vote_counts[key][2];
});
const totalVotes = totalYesVotes + totalNoVotes + totalSpamVotes;

// Functions

const handleApprove = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "act_proposal",
      args: {
        id: JSON.parse(props.proposal.id),
        action: "VoteApprove",
      },
      gas: 200000000000000,
    },
  ]);
};

const handleReject = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "act_proposal",
      args: {
        id: JSON.parse(props.proposal.id),
        action: "VoteReject",
      },
      gas: 200000000000000,
    },
  ]);
};

const handleSpam = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "act_proposal",
      args: {
        id: JSON.parse(props.proposal.id),
        action: "VoteRemove",
      },
      gas: 200000000000000,
    },
  ]);
};

return (
  <div className="row">
    <div className="col-6">
      <a
        className="btn btn-success m-1 w-100"
        onClick={handleApprove}
        disabled={!canVote}
      >
        <span>
          <b>vote yes</b>
        </span>
      </a>
    </div>
    <div className="col-6">
      <a
        className="btn btn-danger m-1 w-100"
        onClick={handleReject}
        disabled={!canVote}
      >
        <span className="button no">
          <b>vote no</b>
        </span>
      </a>
    </div>
  </div>
);
