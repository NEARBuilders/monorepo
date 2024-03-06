const accountId = props.accountId;
if (!accountId) {
  return "Requires accountID prop";
}

return <div>Hello @{accountId}</div>;
