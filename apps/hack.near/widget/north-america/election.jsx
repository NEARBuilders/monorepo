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
        <h3>North America</h3>
        <Widget
          src="hack.near/widget/communities.regional"
          props={{
            daoId: "north-america.sputnik-dao.near",
            name: "Join NEAR North America",
            memberId,
            roleId,
          }}
        />
      </div>
    )}
    {!canJoinContinent && (
      <div>
        <h3>North America</h3>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 931,
              candidateId: "izcc.near",
              postUrl: "https://social.near.page/p/izcc.near/95327942",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 932,
              candidateId: "nneoma.near",
              postUrl: "https://social.near.page/c/nneoma.near/95351465",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 933,
              candidateId: "sirs.near",
              postUrl: "https://social.near.page/p/sirs.near/95409155",
            }}
          />
        </div>
      </div>
    )}
  </div>
);
