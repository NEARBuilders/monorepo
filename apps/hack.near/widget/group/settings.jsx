const accountId = context.accountId;
const creatorId = "james.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const mainGroup = "6fd36ddf4884flm20pbe91e7b208b88d16";

const group = Social.get(`${accountId}/settings/community/group`);

if (group === null) {
  return "Loading...";
}

State.init({
  groupId: group || mainGroup,
  exists: true,
});

function init() {
  if (state.groupId === mainGroup) {
    const groupData = Social.get(`${creatorId}/graph/${mainGroup}/**`);
    if (!groupData) {
      State.update({ exists: false });
    }
  } else {
    const groupData = Social.get(`${creatorId}/graph/${state.groupId}/**`);
    if (!groupData) {
      State.update({ exists: false });
    }
  }
}

init();

const resetGroup = () => {
  State.update({ groupId: mainGroup, exists: true });
};

return (
  <div>
    <div>
      <h1>
        <b>Edit Default Group</b>
      </h1>
    </div>
    <div className="mb-2 d-flex align-items-center">
      <h5 className="m-3">ID:</h5>
      <div className="me-1 flex-grow-1">
        <input type="text" value={state.groupId} placeholder={defaultGroup} />
      </div>
      <CommitButton
        className="btn btn-success m-2"
        data={{ settings: { community: { group: state.groupId } } }}
      >
        Save
      </CommitButton>
      {state.groupId !== mainGroup && (
        <button className="btn btn-outline-primary" onClick={resetGroup}>
          Reset
        </button>
      )}
    </div>

    {state.exists && (
      <div className="m-2">
        <hr />
        <h2>
          <b>Review</b>
        </h2>
        <Widget
          src="hack.near/widget/group"
          props={{ groupId: state.groupId }}
        />
      </div>
    )}
  </div>
);
