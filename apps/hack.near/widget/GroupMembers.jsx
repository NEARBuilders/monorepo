const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "global.sputnik-dao.near";

const groupId = props.groupId ?? "community";
const policy = Near.view(daoId, "get_policy");

const group = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

return (
  <>
    <div>
      <h3>{groupId}</h3>
      <div>
        {group.map((members, i) => (
          <div key={i}>
            {members.map((member, j) => (
              <a
                key={j}
                className="text-decoration-none"
                href={`#mob.near/widget/ProfilePage?accountId=${member}`}
              >
                <h4>{member}</h4>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  </>
);
