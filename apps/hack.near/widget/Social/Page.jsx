const accountId = context.accountId;

const page = accountId
  ? Social.get(`${accountId}/settings/near.social/page`)
  : undefined;

if (page === null) {
  return "Loading...";
}

return <Widget src={page ?? "hack.near/widget/Common.Page"} props={props} />;
