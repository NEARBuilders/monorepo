const onChange = props.onChange;

const Input = styled.input`
  width: 300px;
`;

const Button = styled.button`
  text-transform: lowercase !important;
  padding: 8px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

return (
  <Container>
    <Input
      onChange={(e) => {
        State.update({ title: e.target.value });
        if (onChange) {
          onChange({ title: e.target.value });
        }
      }}
      value={state.title}
      placeholder="title"
    />
    <Input
      onChange={(e) => {
        State.update({ description: e.target.value });
        if (onChange) {
          onChange({ description: e.target.value });
        }
      }}
      value={state.description}
      placeholder="description"
    />
  </Container>
);
