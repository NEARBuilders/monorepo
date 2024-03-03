const daoId = props.daoId ?? "hack.near";

const groups = Social.get(`${daoId}/directory/**`);

const directory = Social.get(`${daoId}/thing/directory`);

function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

const groupId = props.groupId ?? generateUID();

State.init({
  directory,
  groupTitle: "",
  groupCreator: "",
  groupMembers: [],
  groupAccount: "",
});

const newGroup = {
  groupId,
  title: state.groupTitle,
  creatorId: state.groupCreator,
  members: [state.groupMembers],
  daoId: state.groupAccount,
};

function addGroup(newGroupId) {
  State.update({
    groups: { ...state.directory, newGroupId },
  });
}

const handleCreate = () => {
  const groupData = {
    thing: {
      [groupId]: newGroup,
    },
  };

  Social.set(groupData);
};

const handleSave = () => {
  const groupData = {
    thing: {
      directory: { ...directory, newGroupId },
    },
  };

  Social.set(groupData);
};

return (
  <div className="m-2">
    <input
      placeholder="Group Title"
      onChange={(e) => State.update({ groupTitle: e.target.value })}
    />
    <br />
    <input
      placeholder="Group Creator"
      onChange={(e) => State.update({ groupCreator: e.target.value })}
    />
    <br />
    <input
      placeholder="Group Members"
      onChange={(e) => State.update({ groupMembers: e.target.value })}
    />
    <br />
    <input
      placeholder="DAO"
      onChange={(e) => State.update({ groupAccount: e.target.value })}
    />
    <br />
    <p>Group ID: {newGroup.groupId}</p>
    <p>Group Creator: {state.groupCreator}</p>
    <p>Group Members: {state.groupMembers}</p>
    <p>DAO: {state.groupAccount}</p>
    <button onClick={handleCreate}>Create</button>
    <hr />
    <input
      placeholder={newGroup.groupId}
      onChange={(e) => State.update({ newGroupId: e.target.value })}
    />
    <br />
    <p style={{ wordWrap: "break-word", maxWidth: "100%" }}>
      {state.directory}
    </p>{" "}
    <button onClick={handleSave}>Save</button>
    <button onClick={addGroup}>Add</button>
  </div>
);
