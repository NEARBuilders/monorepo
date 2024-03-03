const creatorId = props.creatorId ?? context.accountId;
const groupId = props.groupId ?? "83dc9a797ac0ellif3mt0a1aee215d3088";

let members = Social.getr(`${creatorId}/graph/${groupId}`, "final", {});

if (members === null) {
  return "";
}

State.init({
  members,
  inputVal: "",
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

function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

const type = group ? "remove" : "add";

const handleCreateGroup = () => {
  const groupId = groupId ?? generateUID();
  const data = {
    graph: {
      [groupId]: state.members,
    },
    index: {
      graph: JSON.stringify({
        key: groupId,
        value: {
          type,
        },
      }),
    },
  };

  Social.set(data, {
    onCommit: () => {},
    onCancel: () => {},
  });
};

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

const memberId = props.memberId ?? state.inputVal;

const isValid = isNearAddress(memberId);

return (
  <>
    <div>
      <h3>Membership</h3>
      <input onChange={(e) => State.update({ inputVal: e.target.value })} />
      <br />
      <button disabled={!isValid} onClick={() => addMember(state.inputVal)}>
        add
      </button>
    </div>
    <br />
    <div>
      {Object.keys(state.members).length > 0 && (
        <div>
          <button
            className="btn btn-success"
            onClick={handleCreateGroup}
            success
          >
            create
          </button>
          <hr />
        </div>
      )}
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
