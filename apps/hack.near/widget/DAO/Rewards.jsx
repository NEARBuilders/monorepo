const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

return (
  <>
    <Widget
      src="hack.near/widget/DAO.Reward.Proposal"
      props={{ daoId: daoId, accountId: accountId }}
    />
    <hr />
    <Widget
      src="hack.near/widget/DAO.Reward.Claim"
      props={{ daoId: daoId, accountId: accountId }}
    />
  </>
);
