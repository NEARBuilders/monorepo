const value = props.data;
const handleSubmit = props.handleSubmit;
const onChange = props.onChange;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 8px;
  font-family: monospace;
`;

const Button = styled.button`
  text-transform: lowercase !important;
`;

State.init({ value });

const handleInputChange = (event) => {
  const inputValue = event.target.value;
  State.update({ value: inputValue });
  onChange(state.value);
};

return (
  <>
    <TextArea value={state.value} onChange={handleInputChange} />
  </>
);
