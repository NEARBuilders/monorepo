const accountId = props.accountId ?? context.accountId;

const myPage = accountId
  ? Social.get(`${accountId}/settings/near.social/MyPage`)
  : undefined;

if (myPage === null) {
  return "Loading";
}

return <Widget src={myPage ?? "mob.near/widget/ProfilePage"} props={props} />;
