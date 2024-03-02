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
        <h3>Australia</h3>
        <Widget
          src="hack.near/widget/communities.regional"
          props={{
            daoId: "australia.sputnik-dao.near",
            name: "Join NEAR Australia",
            memberId,
            roleId,
          }}
        />
      </div>
    )}
    {!canJoinContinent && (
      <div>
        <h3>Australia</h3>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 926,
              candidateId: "alejandro.near",
              postUrl: "https://social.near.page/p/alejandro.near/95415438",
            }}
          />
        </div>
      </div>
    )}
  </div>
);
