const orgId = props.orgId ?? "rc-dao.near";

const accountId = props.accountId;

if (!accountId) {
  return "";
}

const connectionData = Social.keys(
  `${orgId}/graph/connect/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const connected = Object.keys(connectionData || {}).length > 0;

return (
  <div>
    {connected ? (
      <Widget src="hack.near/widget/dao.badge" />
    ) : (
      <h5>none found</h5>
    )}
  </div>
);
