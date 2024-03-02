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
      <div className="mt-4 mb-4">
        <Widget
          src="hack.near/widget/community.onboarding"
          props={{
            memberId,
            roleId,
          }}
        />
      </div>
      <h3>
        <b>Election is live now!</b>
      </h3>
      <h5>Voting closes 11:59pm UTC on July 16</h5>
      <div>
        <Widget
          key={i}
          src="hack.near/widget/dao.election.header"
          props={{
            startTime: 1688986800000,
            endTime: 1689551999000,
            type: "Election",
          }}
        />
      </div>
      <br />
      <p>
        <span>
          This on-chain page is a ballot with candidates for the RC DAO council,
          which reviews funding proposals from NEAR communities around the
          world. Let's get decentralized!
        </span>
      </p>
      <p>
        <span>
          <i>
            NOTE ~ if you did not join the voter group before 23:59 UTC on July
            8, you are unable to vote in this round. You are welcome to get
            verified and register for upcoming votes.
          </i>
        </span>
      </p>
      <h5>RULES</h5>
      <p>
        <span>
          Each RC DAO member is able to vote{" "}
          <b>once for each and every candidate</b> That means they can vote for
          multiple candidates.
        </span>
      </p>
      <p>
        <span>
          Voters may select candidates from any of the continental regions.
        </span>
      </p>
      <p>
        <span>
          Remember, the mission is to build a better future for everyone, using
          the blockchain operating system!
        </span>
      </p>
      <div>
        <div className="detailed-rules collapse show">
          <button
            className="btn btn-sm btn-outline-secondary border-0"
            data-bs-toggle="collapse"
            data-bs-target={`.detailed-rules`}
            aria-expanded="false"
            aria-controls={"detailed-rules"}
          >
            <i className="bi bi-arrows-angle-expand me-1"></i>click here for
            details
          </button>
        </div>
        <div className="collapse detailed-rules">
          <p>
            <span>
              Every candidate wrote an on-chain self-nomination post, and voters
              are welcome to discuss or ask them questions in the comments.
            </span>
          </p>
          {!validMember && (
            <div className="mb-3">
              <Widget
                src="near/widget/DIG.Button"
                props={{
                  href: "https://near.social/#/hack.near/widget/dao.candidates",
                  label: "Discuss Candidates",
                  variant: "outline-dark",
                  size: "small",
                }}
              />
            </div>
          )}
          <p>
            <span>
              There will be seven council members initially. That includes five
              continental seats, with one from each of the following regions:
              Africa, Asia, Europe, North America, and South America. The two
              remaining seats will be filled by candidates from any continent
              with the most votes.
            </span>
          </p>
        </div>
      </div>
      <br />
      {accountId && validMember ? (
        <div>
          {!canJoinContinent ? (
            <p>
              <span style={{ fontSize: "1.2em" }}>
                <i class="bi bi-check2-circle"></i>
                Continental Group Selected
              </span>
            </p>
          ) : (
            <p>
              <span style={{ fontSize: "1.2em" }}>
                <i class="bi bi-arrow-down-square"></i> Select Continental Group
              </span>
            </p>
          )}
        </div>
      ) : (
        <p>
          <span style={{ fontSize: "1.2em" }}>
            <i class="bi bi-globe2"></i>
            Thanks for being NEAR!
          </span>
        </p>
      )}
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
