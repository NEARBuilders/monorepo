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

const options = ["md", "social", "every.near/type/image"];

return (
  <Container>
    <Typeahead
      options={options}
      multiple
      onChange={(value) => {
        onChange({ typeWhitelist: value });
      }}
      placeholder="available types..."
    />
    <Input placeholder="key" onChange={() => {}} />
  </Container>
);
