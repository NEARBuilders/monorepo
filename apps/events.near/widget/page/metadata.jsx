const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const TabContent = styled.div`
  margin-top: 1rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
`;

const Select = styled.select`
  padding: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const [name, setName] = useState("");
const [description, setDescription] = useState("");

State.init({
  image,
});

return (
  <Form>
    <FormGroup>
      <Label>name</Label>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </FormGroup>
    <FormGroup>
      <Label>description</Label>
      <textarea
        className="form-control mb-3"
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </FormGroup>
    <h5 className="mb-2">Logo</h5>
    <div className="p-1 mb-3">
      <Widget
        src="mob.near/widget/ImageEditorTabs"
        props={{
          image: state.image,
          onChange: (image) => State.update({ image }),
        }}
      />
    </div>
  </Form>
);
