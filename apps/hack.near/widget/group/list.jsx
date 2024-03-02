const creatorId = props.creatorId ?? "james.near";
const groupId = props.groupId ?? "6fd36ddf4884flm20pbe91e7b208b88d16";

const groupData = Social.get(`${creatorId}/thing/${groupId}/**`);
const initMembers = Social.get(`${creatorId}/graph/${groupId}/**`);

State.init({
  members: initMembers || { [context.accountId]: "" },
  newMember: "",
});

function addMember(newMember) {
  State.update({
    members: { ...state.members, [newMember]: "" },
  });
}

function removeMember(memberKey) {
  const updatedMembers = { ...state.members };
  delete updatedMembers[memberKey];

  State.update({
    members: updatedMembers,
  });
}

function isNearAddress(address) {
  if (typeof address !== "string") {
    return false;
  }
  if (!address.endsWith(".near")) {
    return false;
  }
  const parts = address.split(".");
  if (parts.length !== 2) {
    return false;
  }
  if (parts[0].length < 2 || parts[0].length > 32) {
    return false;
  }
  if (!/^[a-z0-9_-]+$/i.test(parts[0])) {
    return false;
  }
  return true;
}

const memberId = props.memberId ?? state.newMember;

const isValid = isNearAddress(memberId);

return (
  <>
    <div>
      <h5>Account ID</h5>
      <input
        placeholder="<example>.near"
        onChange={(e) => State.update({ newMember: e.target.value })}
      />
      <div className="d-flex align-items-center mt-2">
        <button
          className="btn btn-primary m-2"
          onClick={() => addMember(state.newMember)}
        >
          add
        </button>
      </div>
    </div>
    <hr />
    <div>
      <h5>Members</h5>
      {Object.keys(state.members).map((a) => {
        return (
          <div className="d-flex m-2 p-2 justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Widget src="mob.near/widget/Profile" props={{ accountId: a }} />
            </div>
            <button
              className="btn btn-danger m-1"
              disabled={!isNearAddress(a)}
              onClick={() => removeMember(a)}
            >
              remove
            </button>
          </div>
        );
      })}
    </div>
  </>
);
