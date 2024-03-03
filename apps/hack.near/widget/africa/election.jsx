const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;
const roleId = props.roleId ?? "voter";
const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";

const validMember = props.validMember;
const canJoin = props.canJoin;
const canJoinContinent = props.canJoinContinent;

return (
  <div className="m-2">
    {validMember && canJoinContinent && (
      <div className="mb-2">
        <h3>Africa</h3>
        <Widget
          src="hack.near/widget/communities.regional"
          props={{
            daoId: "africa-community.sputnik-dao.near",
            name: "Join NEAR Africa",
            memberId,
            roleId,
          }}
        />
      </div>
    )}
    {!canJoinContinent && (
      <div>
        <h3>Africa</h3>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 911,
              candidateId: "jeromemrys.near",
              postUrl: "https://social.near.page/p/jeromemrys.near/94344897",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 912,
              candidateId: "fatokunmayowa.near",
              postUrl: "https://social.near.page/p/fatokunmayowa.near/95012620",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 913,
              candidateId: "mrmoh.near",
              postUrl: "https://social.near.page/p/mrmoh.near/95405581",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 914,
              candidateId: "psalm.near",
              postUrl: "https://social.near.page/p/psalm.near/95178985",
            }}
          />
        </div>
      </div>
    )}
  </div>
);
