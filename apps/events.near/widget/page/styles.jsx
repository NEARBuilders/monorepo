const Wrapper = styled.div`
  margin: 0 auto;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const store = Storage.get("events-app-creator");

const initState = store.styles || {
  primaryColor: "",
  secondaryColor: "",
  backgroundColor: "",
};
State.init(initState);

const set = (k, v) => {
  State.update({ [k]: v });
  Storage.set("events-app-creator", { ...store, styles: state });
};

return (
  <Wrapper>
    <h3>Select your colors</h3>
    <Form>
      <FormGroup>
        <Label>Primary Color</Label>
        <Input
          type="color"
          value={state.primaryColor}
          onChange={(e) => set("primaryColor", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Secondary Color</Label>
        <Input
          type="color"
          value={state.secondaryColor}
          onChange={(e) => set("secondaryColor", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Background Color</Label>
        <Input
          type="color"
          value={state.backgroundColor}
          onChange={(e) => set("backgroundColor", e.target.value)}
        />
      </FormGroup>
    </Form>
  </Wrapper>
);
