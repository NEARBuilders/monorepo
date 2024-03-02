const groupId = props.groupId || "6fd36ddf4884flm20pbe91e7b208b88d16";

State.init({
  groupId,
});

const onChangeGroup = (groupId) => {
  State.update({
    groupId,
  });
};

return (
  <>
    <h3>Edit Group</h3>
    <input
      placeholder="groupId"
      value={state.groupId}
      onChange={(e) => onChangeGroup(e.target.value)}
    />
    <br />
    <Widget
      src="hack.near/widget/group.editor"
      props={{ groupId: state.groupId, creatorId: "james.near" }}
    />
  </>
);
