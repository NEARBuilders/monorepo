const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}

const groups = policy.roles
  .filter((role) => role.kind.Group)
  .map((role) => ({
    name: role.name,
    members: role.kind.Group,
  }));

const deposit = policy.proposal_bond;

State.init({
  memberId: state.memberId ?? "",
  isAccount: false,
  isMember: false,
});

const onChangeMember = (memberId) => {
  State.update({
    memberId,
  });
};

const membership = group.members;

let string = ".near";

const checkAccount = (memberId) => {
  if (memberId.indexOf(string) !== -1) {
    return State.update({ isAccount: true });
  }
};

const validAccount = checkAccount(state.memberId);

return (
  <div className="mb-3">
    <div className="row">
      <div>
        <h1>membership</h1>
      </div>
      <div className="mb-2">
        <h3>who?</h3>
        <h5 className="mb-1">account id:</h5>
        <div className="mt-2">
          <input
            type="text"
            placeholder="<example>.near"
            value={state.memberId}
            onChange={(e) => onChangeMember(e.target.value)}
          />
        </div>
      </div>
      {!isMember && (
        <div className="mt-2">
          <h5>nominate for a role:</h5>
          <div className="mb-2 d-flex gap-2 flex-wrap">
            {groups.map((group, i) => (
              <Widget
                key={i}
                src="hack.near/widget/DAO.AddMember"
                props={{
                  daoId: daoId,
                  accountId: accountId,
                  memberId: state.memberId,
                  roleId: group.name,
                }}
              />
            ))}
          </div>
        </div>
      )}
      <div className="mt-2">
        <h2 className="mb-2">groups</h2>
        <Widget src="hack.near/widget/DAO.Members" props={{ daoId: daoId }} />
      </div>
    </div>
  </div>
);
"mt-2">
        <h2 className="mb-2">Groups</h2>
        <Widget src="hack.near/widget/DAO.Members" props={{ daoId }} />
      </div>
    </div>
  </div>
);
