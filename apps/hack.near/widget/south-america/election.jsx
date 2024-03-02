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
        <h3>South America</h3>
        <Widget
          src="hack.near/widget/communities.regional"
          props={{
            daoId: "south-america.sputnik-dao.near",
            name: "Join NEAR South America",
            memberId,
            roleId,
          }}
        />
      </div>
    )}
    {!canJoinContinent && (
      <div>
        <h3>South America</h3>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 934,
              candidateId: "vianftbrasil.near",
              postUrl: "https://social.near.page/p/vianftbrasil.near/94928200",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 935,
              candidateId: "frado.near",
              postUrl: "https://social.near.page/p/frado.near/95426622",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 936,
              candidateId: "fritzwagner.near",
              postUrl: "https://social.near.page/p/fritzwagner.near/95118357",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 937,
              candidateId: "johanga108.near",
              postUrl: "https://social.near.page/p/johanga108.near/94544303",
            }}
          />
        </div>
      </div>
    )}
  </div>
);
