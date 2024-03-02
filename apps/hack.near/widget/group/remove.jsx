const accountId = props.accountId ?? context.accountId;

const groupId = props.groupId ?? "6fd36ddf4884flm20pbe91e7b208b88d16";

const directory = Social.get(`${accountId}/thing/directory`);

if (!directory) {
  return "";
}

const groups = JSON.parse(directory);

State.init({
  groups,
  removed: false,
});

const checkDirectory = (groups) => {
  if (groups.indexOf(groupId) === -1) {
    return State.update({ removed: true });
  }
};

const done = checkDirectory(groups);

function removeGroup(groupKey) {
  const updatedGroups = state.groups.filter((group) => group !== groupKey);

  State.update({
    groups: updatedGroups,
  });
}

const handleSave = () => {
  removeGroup(groupId);

  const data = {
    thing: {
      directory: state.groups,
    },
  };

  Social.set(data);
};

return (
  <>
    <span>
      {done ? (
        <button
          disabled={done}
          className="btn btn-success"
          onClick={handleSave}
        >
          Done
        </button>
      ) : (
        <button
          disabled={done}
          className="btn btn-success"
          onClick={handleSave}
        >
          Remove
        </button>
      )}
    </span>
  </>
);
