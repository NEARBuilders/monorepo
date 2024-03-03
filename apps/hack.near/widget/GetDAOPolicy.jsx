const policy = Near.view("multi.sputnik-dao.near", "get_policy");
console.log(policy.roles);

const accountId = context.accountId;

const groups = policy.roles
  .filter((role) => role.name === "council")
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

const bla = groups.map((group) => {
  return !group
    ? false
    : group.filter((address) => address === accountId).length > 0;
});

return <> {JSON.stringify(bla)}</>;
