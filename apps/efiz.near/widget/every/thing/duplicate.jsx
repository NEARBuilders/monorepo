const path = props.path;
const blockHeight = props.blockHeight;

const thing = JSON.parse(Social.get(path, blockHeight));

const Input = styled.input``;

function handleDuplicate(thing) {
  let thingId = state.duplicateName;
  if (thingId.trim() === "") {
    thingId = Math.random();
  }
  const data = {
    thing: {
      [thingId]: thing,
    },
    index: {
      thing: JSON.stringify({
        key: thingId,
        value: {
          type: JSON.parse(thing).type,
        },
      }),
    },
  };
  Social.set(data);
}

return (
  <>
    <Input
      placeholder={"thing name"}
      value={state.duplicateName}
      onChange={(e) => State.update({ duplicateName: e.target.value })}
    />
    <Widget
      src="efiz.near/widget/Every.Raw.Edit"
      props={{ value: thing, handleSubmit: handleDuplicate }}
    />
  </>
);
