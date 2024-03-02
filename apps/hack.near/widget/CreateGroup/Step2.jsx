const { formState, errors, renderFooter } = props;
const { accountId } = context;

State.init({
  members: { [context.accountId]: "" },
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

const finalState = {
  members: {
    ...state.members,
  },
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

const memberId = props.memberId ?? state.newMember;

const isValid = isNearAddress(memberId);

return (
  <>
    <h2 className="h5 fw-bold">
      <span
        className="rounded-circle d-inline-flex align-items-center justify-content-center fw-bolder h5 me-2"
        style={{
          width: "48px",
          height: "48px",
          border: "1px solid #82E299",
        }}
      >
        2
      </span>
      Membership
    </h2>
    <div>
      <div>
        <h5>Account ID</h5>
        <input
          placeholder="<example>.near"
          onChange={(e) => State.update({ newMember: e.target.value })}
        />
        <div className="d-flex align-items-center mt-2">
          <button
            className="btn btn-primary m-2"
            disabled={!isValid}
            onClick={() => addMember(state.newMember)}
          >
            add
          </button>
        </div>
      </div>
      <br />
      <div>
        <h5>Profiles</h5>
        {Object.keys(state.members).map((a) => {
          return (
            <div className="d-flex m-2 p-2 justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Widget
                  src="mob.near/widget/Profile"
                  props={{ accountId: a }}
                />
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
    </div>
    {renderFooter(finalState)}
  </>
);
