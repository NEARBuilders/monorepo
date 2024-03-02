const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;
const roleId = props.roleId ?? "voter";
const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";

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

const af_proposals = Near.view(
  "africa-community.sputnik-dao.near",
  "get_proposals",
  { from_index: 0, limit: 888 }
);
const as_proposals = Near.view("asia.sputnik-dao.near", "get_proposals", {
  from_index: 0,
  limit: 888,
});
const au_proposals = Near.view("australia.sputnik-dao.near", "get_proposals", {
  from_index: 0,
  limit: 888,
});
const eu_proposals = Near.view("europe.sputnik-dao.near", "get_proposals", {
  from_index: 0,
  limit: 888,
});
const na_proposals = Near.view(
  "north-america.sputnik-dao.near",
  "get_proposals",
  { from_index: 0, limit: 888 }
);
const sa_proposals = Near.view(
  "south-america.sputnik-dao.near",
  "get_proposals",
  { from_index: 0, limit: 888 }
);

if (
  proposals === null ||
  af_proposals === null ||
  as_proposals === null ||
  au_proposals === null ||
  eu_proposals === null ||
  na_proposals === null ||
  sa_proposals === null
) {
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
let canJoinContinent =
  checkProposals(af_proposals) &&
  checkProposals(as_proposals) &&
  checkProposals(au_proposals) &&
  checkProposals(eu_proposals) &&
  checkProposals(na_proposals) &&
  checkProposals(sa_proposals);

return (
  <div className="m-2">
    <div className="mt-3">
      <div className="mb-3">
        <Widget
          src="near/widget/AccountProfile"
          props={{ accountId: "rc-dao.sputnik-dao.near" }}
        />
      </div>
      <div className="mt-2 mb-4">
        <Widget
          src="hack.near/widget/community.onboarding"
          props={{
            memberId,
            roleId,
          }}
        />
      </div>
      <h3>
        <b>Election Demo</b>
      </h3>
      <p>
        <span style={{ fontSize: "0.8em" }}>
          This on-chain page is a ballot with candidates for the RC DAO council,
          which reviews funding proposals from NEAR communities around the
          world. Let's get decentralized!
        </span>
      </p>
      <p>
        <span style={{ fontSize: "0.8em" }}>
          <i>
            NOTE ~ if you did not join the voter group before 23:59 UTC on July
            8, you are unable to vote this round. You are welcome to get
            verified and register for upcoming votes.
          </i>
        </span>
      </p>
      <h5>RULES</h5>
      <p>
        <span style={{ fontSize: "0.8em" }}>
          Each RC DAO member can vote <b>once per candidate</b>. Voters may
          indicate support for any of the candidates across the continental
          regions. Remember, the mission is to build a better future for
          everyone, using the blockchain operating system!
        </span>
      </p>
      <div>
        <div className="public-tags collapse show">
          <button
            className="btn btn-sm btn-outline-secondary border-0"
            data-bs-toggle="collapse"
            data-bs-target={`.public-tags`}
            aria-expanded="false"
            aria-controls={"public-tags"}
          >
            <i className="bi bi-arrows-angle-expand me-1"></i>click here for
            details
          </button>
        </div>
        <div className="collapse public-tags">
          <p>
            <span style={{ fontSize: "0.8em" }}>
              As you can see below, every candidate wrote an on-chain
              self-nomination post, and voters are welcome to discuss or ask
              them questions in the comments.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "0.8em" }}>
              There will be 7 council members initially. That includes 5
              continental seats, with one from each of the following regions:
              Africa, Asia, Europe, North America, and South America. The two
              remaining seats will be filled by candidates from any continent
              with the most votes.
            </span>
          </p>
        </div>
      </div>
      <br />
      <p>
        <span style={{ fontSize: "1.2em" }}> Thanks for participating 🗳️</span>
      </p>
    </div>
    <br />
    <div>
      <div className="mb-2">
        <Widget
          src="hack.near/widget/africa.election"
          props={{
            daoId: "africa-community.sputnik-dao.near",
            memberId,
            canJoin,
            canJoinContinent,
            validMember,
          }}
        />
      </div>
      <div className="mb-2">
        <Widget
          src="hack.near/widget/asia.election"
          props={{
            daoId: "asia.sputnik-dao.near",
            memberId,
            canJoin,
            canJoinContinent,
            validMember,
          }}
        />
      </div>
      <div className="mb-3">
        <Widget
          src="hack.near/widget/australia.election"
          props={{
            daoId: "australia.sputnik-dao.near",
            memberId,
            canJoin,
            canJoinContinent,
            validMember,
          }}
        />
      </div>
      <div className="mb-2">
        <Widget
          src="hack.near/widget/europe.election"
          props={{
            daoId: "europe.sputnik-dao.near",
            memberId,
            canJoin,
            canJoinContinent,
            validMember,
          }}
        />
      </div>
      <div className="mb-2">
        <Widget
          src="hack.near/widget/north-america.election"
          props={{
            daoId: "north-america.sputnik-dao.near",
            memberId,
            canJoin,
            canJoinContinent,
            validMember,
          }}
        />
      </div>
      <div className="mb-3">
        <Widget
          src="hack.near/widget/south-america.election"
          props={{
            daoId: "south-america.sputnik-dao.near",
            memberId,
            canJoin,
            canJoinContinent,
            validMember,
          }}
        />
      </div>
    </div>
  </div>
);
