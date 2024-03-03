const value = props.value;
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
  align-items: center;
`;

State.init({
  value,
});

return (
  <Container>
    <Input
      onChange={(e) => State.update({ value: e.target.value })}
      value={state.value}
      placeholder="thing path"
    />
    <Button onClick={() => onChange(state.value)}>submit</Button>
  </Container>
);
