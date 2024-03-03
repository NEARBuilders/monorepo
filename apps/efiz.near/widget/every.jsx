State.init({
  view: "type",
});

const Button = styled.button``;

return (
  <div>
    <h1>{`every ${state.view}`}</h1>
    <Button onClick={() => State.update({ view: "thing" })}>thing</Button>
    <Button onClick={() => State.update({ view: "type" })}>type</Button>
    <Button onClick={() => State.update({ view: "widget" })}>widget</Button>
    <div>
      <Widget
        src="efiz.near/widget/every.thing"
        props={{ typeName: state.view }}
      />
    </div>
  </div>
);
