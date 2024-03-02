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

const store = Storage.get("events-app-creator");

const initState = store.metadata || {
  image, // TODO: background image
  name: "",
  description: "",
  twitter: "", // TODO: linkTree
  github: "",
  telegram: "",
};

State.init(initState);

const set = (k, v) => {
  State.update({ [k]: v });
  Storage.set("events-app-creator", { ...store, metadata: state });
};

return (
  <>
    <h3>describe your app</h3>
    <Form>
      <FormGroup>
        <Label>name</Label>
        <Input
          type="text"
          value={state.name}
          onChange={(e) => set("name", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>description</Label>
        <textarea
          className="form-control mb-3"
          rows={5}
          value={state.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </FormGroup>
      <h5 className="mb-2">Logo</h5>
      <div className="p-1 mb-3">
        <Widget
          src="mob.near/widget/ImageEditorTabs"
          props={{
            image: state.image,
            onChange: (image) => set("image", image),
          }}
        />
      </div>
      <div className="m-2 mt-3">
        <h5 className="m-1">Links</h5>

        <div className="gap-3 p-1">
          <input
            type="text"
            placeholder="https://twitter.com/nearbuilders"
            value={state.twitter}
            onChange={(e) => set("twitter", e.target.value)}
          />
        </div>
        <div className="gap-3 p-1">
          <input
            type="text"
            placeholder="https://github.com/nearbuilders"
            value={state.github}
            onChange={(e) => set("github", e.target.value)}
          />
        </div>
        <div className="gap-3 p-1">
          <input
            type="text"
            placeholder="https://t.me/+0yT1bqsQHxkzMDkx"
            value={state.telegram}
            onChange={(e) => set("telegram", e.target.value)}
          />
        </div>
      </div>
      {/* TODO: Preview */}
    </Form>
  </>
);
