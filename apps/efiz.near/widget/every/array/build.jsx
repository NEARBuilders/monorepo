const item = props.item;
const onChange = props.onChange;

const Input = styled.input`
`;

const Button = styled.button`
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

State.init({
  inputValues: item.value || [],
  newInputValue: item.type === "string" ? "" : {},
});

const handleInputChange = (index, value) => {
  const newInputValues = [...state.inputValues];
  newInputValues[index] = value;
  State.update({ inputValues: newInputValues });
};

const handleAddClick = () => {
  const newInputValue = JSON.parse(JSON.stringify(state.newInputValue));
  const newInputValues = [...state.inputValues, newInputValue];

  if (onChange) {
    onChange(newInputValues);
  }
  State.update({
    inputValues: newInputValues,
    newInputValue: item.type === "string" ? "" : {},
  });
};

const handleDeleteClick = (index) => {
  const newInputValues = [...state.inputValues];
  newInputValues.splice(index, 1);
  State.update({ inputValues: newInputValues });
  if (onChange) {
    onChange(newInputValues);
  }
};

const handleNewInputChange = (newValues) => {
  if (item.type === "string") {
    State.update({
      newInputValue: newValues.target.value,
    });
  } else {
    const newInputValue = JSON.parse(JSON.stringify(state.newInputValue));
    State.update({
      newInputValue: { ...newInputValue, ...newValues },
    });
  }
};

return (
  <Container>
    {state.inputValues?.map((inputValue, index) => (
      <Row key={index}>
        <Widget
          src="efiz.near/widget/create"
          props={{
            item: {
              type: item.type,
              value: inputValue,
            },
            onChange: (e) => handleInputChange(index, e.target.value),
          }}
        />
        <Button onClick={() => handleDeleteClick(index)}>Delete</Button>
      </Row>
    ))}
    {state.isLoading ? (
      <p>loading...</p>
    ) : (
      <Row>
        <Widget
          src="efiz.near/widget/create"
          props={{
            item: {
              type: item.type,
              value: state.newInputValue,
            },
            onChange: handleNewInputChange,
          }}
        />
        <Button onClick={handleAddClick}>Add</Button>
      </Row>
    )}
  </Container>
);
// <p>{JSON.stringify(state)}</p>

//  disabled={state.newInputValue} // Check that full state is good
