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
        <h3>Membership</h3>
      </div>
      <div className="mb-2">
        <h5 className="mb-1">input account id:</h5>
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
          <div className="mb-2 d-flex gap-2 flex-wrap">
            {groups.map((group, i) => (
              <Widget
                key={i}
                src="hack.near/widget/DAO.AddMember"
                props={{
                  daoId,
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
        <br />
        <Widget src="hack.near/widget/DAO.Members" props={{ daoId }} />
      </div>
    </div>
  </div>
);
