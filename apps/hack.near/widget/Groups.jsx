const groups = Social.index("every", "group", { limit: 10 });

return <div>{JSON.stringify(groups)}</div>;
r";
const policy = Near.view(daoId, "get_policy");

const groups = policy.roles
  .filter((role) => role.name !== "all")
  .map((role) => {
    const groups = role.name;

    return groups;
  });

return (
  <>
    <div>
      <h3>Groups:</h3>
      <div>
        {groups.map((group, i) => (
          <a
            key={i}
            className="text-decoration-none"
            href={`#/hack.near/widget/GroupMembers?groupId=${group}&daoId=${daoId}`}
          >
            <h4>{group}</h4>
          </a>
        ))}
      </div>
    </div>
  </>
);
