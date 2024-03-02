const path = props.path;
const blockHeight = props.blockHeight;

const thing = JSON.parse(Social.get(path, blockHeight) || "null");

if (!thing) {
  return <></>;
}

const Container = styled.div`
  display: flex;
    flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  padding: 8px;
`;

const Button = styled.button`
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

function composeData() {
  const newThing = JSON.parse(Social.get(state.newPath, blockHeight) || "null");
  // if (!newThing) {
  //   State.update({
  //     errorMessage: `thing at path: "${state.newPath}" does not exist`,
  //   });
  //   return null;
  // }

  const edges = [];
  edges.push({
    key: path,
    value: {
      type: newThing.type,
      path: state.newPath,
    },
  });
  edges.push({
    key: state.newPath,
    value: {
      type: thing.type,
      path: path,
    },
  });
  return {
    index: {
      edge: JSON.stringify(edges),
    },
  };
}

return (
  <Container>
    <Row>
      <p style={{ color: "red" }}>{state.errorMessage}</p>
    </Row>
    <Row>
      <Input
        onChange={(e) => State.update({ newPath: e.target.value })}
        value={state.value}
        placeholder="thing path"
      />
      <CommitButton
        className="styless"
        style={{ textTransform: "lowercase !important", padding: "8px" }}
        data={composeData}
      >
        create
      </CommitButton>
    </Row>
  </Container>
);
