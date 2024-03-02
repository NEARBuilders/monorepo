const section = props.section;
const key = props.key;
const index = props.index;
const value = props.value;
const modified = props.modified;
const handleInputChange = props.handleInputChange;
const moveInputDown = props.moveInputDown;
const moveInputUp = props.moveInputUp;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: ${(props) => (props.modified ? "2px solid #f00" : "1px solid #ccc")};
`;

const Button = styled.button`
  margin-left: 5px;
`;

return (
  <InputContainer>
    <Input
      type="text"
      value={value}
      modified={modified}
      onChange={(e) => handleInputChange(section, key, index, e.target.value)}
    />
    <Button
      onClick={() => moveInputUp(section, key, index)}
      disabled={index === 0}
    >
      &uarr;
    </Button>
    <Button
      onClick={() => moveInputDown(section, key, index)}
      disabled={index === value.length - 1}
    >
      &darr;
    </Button>
  </InputContainer>
);
