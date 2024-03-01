const data = props.data || {};
const type = props.type || "";
const typeSrc = props.typeSrc || "every.near";
const buildEdges = props.buildEdges;
const template = props.template || "";
const thingId = props.thingId;
const defaultView = props.defaultView || "CREATE_ATTESTATION";
const { generateUID } = VM.require("flowscience.near/widget/generateUID");

if (type !== "") {
  const parts = type.split("/");
  typeSrc = parts[0];
}

const Container = styled.div`
    display: flex;
  `;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #f2f2f2;
  width: auto;
  z-index: 50;
  min-width: 400px;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `;

const FormContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    gap: 8px;
    background-color: #f2f2f2;
    padding: 30px;
  `;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-self: flex-start;
  width: 100%;
`;

const Button = styled.button`
  `;

const LeftPanelItem = styled.div`
    padding: 8px;
    background-color: #ccc;
    color: white;
    border-radius: 4px;
  `;

const Select = styled.select`
  `;

const Label = styled.label`
`;

const Input = styled.input`
  `;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

State.init({
  data,
  config: data,
  typeSrc,
  selectedType: type,
  view: defaultView,
  preview: "TEMPLATE",
  thingId: generateUID(),
});

const handleOnChange = (value) => {
  State.update({ data: { ...state.data, ...value } });
};

useEffect(() => {
  // Logic that was previously in handleApply
  State.update({
    config: state.data,
  });
  // Additional logic if needed
}, [state.data]); // Dependencies

const [formValues, setFormValues] = useState({
  recipientId: props.recipientId || "",
  expireDate: props.expireDate || "",
  expireTime: props.expireTime || "",
  revokeDate: props.revokeDate || "",
  refUID: props.refUID || "",
  payload: props.payload || "",
});

const attestation = {
  [state.selectedType]: {
    [state.thingId]: {
      ...formValues,
      schema: state.data,
    },
  },
};

const handleInputChange = (name, value) => {
  // Update local form state
  setFormValues((prev) => ({ ...prev, [name]: value }));

  // Propagate changes if an external onChange handler is provided
  if (onChange) {
    onChange({ ...formValues, [name]: value });
  }
};

const handleSave = () => {
  // create the attestation
  State.update({ isModalOpen: false });
  let edges = [];
  if (buildEdges) {
    const newPath = `${context.accountId}/attestation/${thingId}`;
    edges = buildEdges(newPath, state.selectedType);
  }

  const data = {
    attestation,
  };
  if (edges.length) {
    data.index.edge = JSON.stringify(edges);
  }
  Social.set(data, {
    onCommit: () => {
      State.update({
        data: {},
        isModalOpen: false,
        config: undefined,
      });
    },
    onCancel: () => {
      State.update({
        isModalOpen: false,
      });
    },
  });
};

let availableTypes = [];
const types = Social.get(`${state.typeSrc}/type/**`, "final");
if (types !== null) {
  availableTypes =
    Object.keys(types)?.map((it) => `${state.typeSrc}/type/${it}`) || [];
}

const handleTypeChange = (e) => {
  State.update({ selectedType: e.target.value, data: {} });
};

return (
  <Container>
    <SidePanel>
      <Row style={{ gap: "8px", marginBottom: "16px" }}>
        <h2>create</h2>{" "}
        <Select
          value={state.view}
          onChange={(e) => State.update({ view: e.target.value })}
        >
          <option value="CREATE_ATTESTATION">attestation</option>
          <option value="CREATE_TYPE">schema</option>
        </Select>
      </Row>
      {state.view === "CREATE_ATTESTATION" ? (
        <>
          <FormContainer>
            <Label>Schema Owner:</Label>
            <Row>
              <Input
                type="text"
                value={state.newTypeSrc}
                onChange={(e) => State.update({ newTypeSrc: e.target.value })}
                placeholder={"accountId"}
              />
              <Button
                onClick={() => State.update({ typeSrc: state.newTypeSrc })}
              >
                apply
              </Button>
            </Row>
            <Label>Schema</Label>
            <Row>
              <Select value={state.selectedType} onChange={handleTypeChange}>
                <option value="">Select a type</option>
                {availableTypes?.map((it) => (
                  <option value={it} key={it}>
                    {it}
                  </option>
                ))}
              </Select>
            </Row>
          </FormContainer>
          <FormContainer>
            <Widget
              src="efiz.near/widget/create"
              props={{
                item: {
                  type: state.selectedType,
                  value: state.data,
                },
                onChange: handleOnChange,
              }}
            />
            <Row>
              <Label>
                <b>UID:</b> {state.thingId}
              </Label>
            </Row>
            <Row>
              <Label>
                <b>Attestor:</b> {context.accountId}
              </Label>
            </Row>
            <Row>
              <Label>
                <b>Recipient: </b>
              </Label>
              <Input
                type="text"
                value={formValues.recipientId}
                onChange={(e) =>
                  handleInputChange("recipientId", e.target.value)
                }
                placeholder="recipient.near"
              />
            </Row>
            <Label>
              <b>Expiration Date: </b>
            </Label>
            <Input
              type="date"
              value={formValues.expireDate}
              onChange={(e) => handleInputChange("expireDate", e.target.value)}
              placeholder=""
            />
            <Row>
              <Label>
                <b>Expiration Time: </b>
              </Label>
              <Input
                type="time"
                value={formValues.expireTime}
                onChange={(e) =>
                  handleInputChange("expireTime", e.target.value)
                }
                placeholder=""
              />
            </Row>
            <Row>
              <Label>
                <b>refUID: </b>
              </Label>
              <Input
                type="text"
                value={formValues.refUID}
                onChange={(e) => handleInputChange("refUID", e.target.value)}
                placeholder="attestations.near/thing/0123456789123456"
              />
            </Row>
            <Row>
              <Label>
                <b>Data Payload: </b>
              </Label>
              <Input
                type="text"
                value={formValues.payload}
                onChange={(e) => handleInputChange("payload", e.target.value)}
                placeholder="# This is markdown text."
              />
            </Row>
          </FormContainer>
          <Footer>
            <Button onClick={handleSave}>Save</Button>
          </Footer>
        </>
      ) : (
        <Widget
          src="every.near/widget/every.type.create"
          props={{ typeSrc: state.selectedType }}
        />
      )}
    </SidePanel>
  </Container>
);
