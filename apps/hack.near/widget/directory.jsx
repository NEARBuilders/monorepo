const creatorId = props.creatorId ?? context.accountId;

if (!creatorId) {
  return "";
}

State.init({
  groups: [],
  newGroup: "",
});

function addGroup(newGroup) {
  state.groups.push(newGroup);

  State.update({
    groups: state.groups,
  });
}

function removeGroup(groupKey) {
  const updatedGroups = state.groups.filter((group) => group !== groupKey);

  State.update({
    groups: updatedGroups,
  });
}

const handleSave = () => {
  const data = {
    thing: {
      directory: state.groups,
    },
  };

  Social.set(data, {
    onCommit: () => {},
    onCancel: () => {},
  });
};

return (
  <>
    <div>
      <h5>Group ID</h5>
      <input onChange={(e) => State.update({ newGroup: e.target.value })} />
      <div className="d-flex align-items-center mt-2">
        <button
          className="btn btn-primary m-2"
          onClick={() => addGroup(state.newGroup)}
        >
          add
        </button>
        {Object.keys(state.groups).length > 0 && (
          <div className="ml-3">
            {JSON.stringify(groups) !== JSON.stringify(state.groups) && (
              <button className="btn btn-success m-2" onClick={handleSave}>
                save
              </button>
            )}
          </div>
        )}
      </div>
    </div>
    <hr />
    <div>
      <h5>Directory</h5>
      {state.groups.map((group, i) => {
        const groupData = Social.get(`${creatorId}/thing/${group}/**`);
        return (
          <div className="d-flex m-2 p-2 justify-content-between align-items-center">
            <Widget
              key={i}
              src="hack.near/widget/NDC.WG.Card"
              props={{
                data: groupData,
              }}
            />
            <button
              className="btn btn-danger m-1"
              onClick={() => removeGroup(group)}
            >
              remove
            </button>
          </div>
        );
      })}
    </div>
  </>
);
