const accountId = props.accountId ?? context.accountId;

const dao = accountId ? Social.get(`${accountId}/profile/dao`) : undefined;

if (dao === null) {
  return "Loading...";
}

return <Widget src={dao ?? "hack.near/widget/DAO.Profile"} props={props} />;
