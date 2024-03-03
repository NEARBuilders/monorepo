const daoId = props.daoId ?? "multi.sputnik-dao.near";
const groupId = props.groupId ?? "council";
const accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const policy = Near.view(daoId, "get_policy");

const groups = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

const check = groups.map((group) => {
  return !group
    ? false
    : group.filter((address) => address === accountId).length > 0;
})?.[0];

return (
  <>
    <Widget src="hack.near/widget/check" props={{ check }} />
  </>
);
