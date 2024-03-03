const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;
const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";
const role = props.role ?? "voter";

// IAH Verification
let human = false;
const userSBTs = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
  account: memberId,
});

for (let i = 0; i < userSBTs.length; i++) {
  if ("fractal.i-am-human.near" == userSBTs[i][0]) {
    human = true;
  }
}

return (
  <div className="m-2">
    {!accountId && (
      <Widget
        src="near/widget/DIG.Button"
        props={{
          href: "https://near.org/signup",
          label: "Create Account",
          variant: "outline-dark",
          size: "small",
        }}
      />
    )}

    {human ? (
      <Widget
        src="hack.near/widget/community.join"
        props={{
          memberId,
          roleId,
        }}
      />
    ) : (
      <Widget
        src="near/widget/DIG.Button"
        props={{
          href: "https://i-am-human.app/?community=banyan&vertical=regionalcommunities",
          label: "Get Verified",
          variant: "outline-primary",
          size: "small",
        }}
      />
    )}
  </div>
);
