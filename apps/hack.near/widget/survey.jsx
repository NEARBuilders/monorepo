const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;
const roleId = props.roleId ?? "frens";
const daoId = props.daoId ?? "lonk.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}

const deposit = policy.proposal_bond;
const group = policy.roles
  .filter((role) => role.name === roleId)
  .map((role) => role.kind.Group);

State.init({
  isMember: false,
});

const groupMembers = group.join(", ");

const checkMembership = (groupMembers) => {
  if (groupMembers.indexOf(memberId) !== -1) {
    return State.update({ isMember: true });
  }
};

const validMember = checkMembership(groupMembers);

const proposals = Near.view(daoId, "get_proposals", {
  from_index: 0,
  limit: 888,
});

if (proposals === null) {
  return "";
}

const checkProposals = (proposals) => {
  for (let i = 0; i < proposals.length; i++) {
    if (proposals[i].proposer === memberId) {
      return false;
    }
  }
  return true;
};

let canJoin = checkProposals(proposals);

return (
  <>
    <div className="m-2">
      <div className="mt-3">
        <div className="row">
          <div className="col">
            <h3 className="mb-3">
              <b>🐉 Near Year Resolutions</b>
            </h3>
          </div>
          <div className="col mt-2">
            <Widget
              src="near/widget/AccountProfile"
              props={{ accountId: "lonk.sputnik-dao.near" }}
            />
          </div>
        </div>
        <h5 className="mb-2">Countdown:</h5>
        <Widget
          key={i}
          src="hack.near/widget/countdown"
          props={{
            startTime: 1703462400000,
            endTime: 1704067200000, // next year -- 1735689600000
            type: "survey",
          }}
        />
      </div>
      <br />
      <h5 className="mb-2">Guide:</h5>
      <p>
        <span>
          Review survey options below, and propose any other ideas. Our
          community of NEAR frens may use their LONK tokens to vote for winners
          in 2024.
        </span>
      </p>
      <div className="detailed-rules collapse show">
        <button
          className="btn btn-sm btn-outline-secondary border-0 m-1"
          data-bs-toggle="collapse"
          data-bs-target={`.detailed-rules`}
          aria-expanded="false"
          aria-controls={"detailed-rules"}
        >
          <i className="bi bi-arrows-expand me-1"></i> MORE INFO
        </button>
      </div>
      <div className="detailed-rules collapse">
        <button
          className="btn btn-sm btn-outline-secondary border-0 m-1"
          data-bs-toggle="collapse"
          data-bs-target={`.detailed-rules`}
          aria-expanded="true"
          aria-controls={"detailed-rules"}
        >
          <i className="bi bi-x-square-fill me-1"></i> CLOSE
        </button>
        <h5 className="mt-3">About LONK:</h5>
        <p>
          <span>BORN FROM COLLECTIVE FRENSHIP</span>
        </p>
        <p>
          <span>FIRMLY GROUNDED IN THE REALMS OF MEMETICS AND HUMOR</span>
        </p>
        {!validMember && (
          <div className="mb-3">
            <Widget
              src="near/widget/DIG.Button"
              props={{
                href: "https://near.social?hashtag=lonk",
                label: "Discussion",
                variant: "outline-dark",
                size: "small",
              }}
            />
          </div>
        )}
      </div>
    </div>
    <hr />
    <div className="m-2">
      <h5 className="mb-3">Options:</h5>
      <Widget
        src="hack.near/widget/survey.part"
        props={{
          daoId: "lonk.sputnik-dao.near",
          memberId,
          canJoin,
          validMember,
        }}
      />
    </div>
  </>
);
