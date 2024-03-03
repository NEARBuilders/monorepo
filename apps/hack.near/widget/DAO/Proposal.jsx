const { daoId, policy, proposal } = props;

const bgClassname =
  proposal.status === "InProgress"
    ? ""
    : proposal.status === "Approved"
    ? "bg-success bg-opacity-10"
    : "bg-danger bg-opacity-10";

function mapVote(vote) {
  return vote === "Approve" ? (
    <span className="text-success">Approve</span>
  ) : vote === "Reject" ? (
    <span className="text-danger">Reject</span>
  ) : vote === "Remove" ? (
    <span className="text-warning">Spam</span>
  ) : (
    "???"
  );
}

function vote(action) {
  return Near.call(daoId, "act_proposal", {
    id: proposal.id,
    action,
  });
}

function decodeArgs() {
  try {
    const args64 = proposal.kind["FunctionCall"].actions[0].args;
    const jsonArgs = JSON.parse(
      Buffer.from(args64, "base64").toString("utf-8")
    );
    return JSON.stringify(jsonArgs, undefined, 2);
  } catch {
    return "failed to deserialize";
  }
}

return (
  <div className={`border p-2 ${bgClassname}`}>
    <div className="mb-2">
      <h4 className="d-inline">
        #{proposal.id}{" "}
        <span className="text-muted small">({proposal.status})</span>
      </h4>
      <div className="float-end">
        {new Date(parseFloat(proposal.submission_time) / 1e6).toLocaleString()}
      </div>
    </div>
    <div className="mb-2">
      <label className="text-muted">Proposer</label>
      <div>
        <Widget
          src="hack.near/widget/profile.human"
          props={{ accountId: proposal.proposer }}
        />
      </div>
    </div>
    <div className="mb-2">
      <label className="text-muted">Description</label>
      <div>{proposal.description}</div>
    </div>
  </div>
);
