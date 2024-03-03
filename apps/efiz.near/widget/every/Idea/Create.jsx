const onChange = props.onChange;

const Input = styled.input`
  width: 300px;
  padding: 8px;
`;

const Button = styled.button`
  text-transform: lowercase !important;
  padding: 8px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 8px;
  font-family: monospace;
`;

const handleTitleChange = (event) => {
  const inputValue = event.target.value;
  State.update({ title: inputValue });
  onChange(state);
};

const handleDescriptionChange = (event) => {
  const inputValue = event.target.value;
  State.update({ description: inputValue });
  onChange(state);
};

return (
  <Container>
    <Input
      onChange={handleTitleChange}
      value={state.title}
      placeholder="title"
    />
    <TextArea
      value={state.description}
      onChange={handleDescriptionChange}
      placeholder="description"
    />
  </Container>
);
