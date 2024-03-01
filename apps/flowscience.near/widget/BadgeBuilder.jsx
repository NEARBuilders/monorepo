const data = props.data || {};
const type = props.type || "";
const typeSrc = props.typeSrc || "every.near";
const buildEdges = props.buildEdges;
const template = props.template || "";
const thingId = props.thingId;
const defaultView = props.defaultView || "CREATE_BADGE";
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
  State.update({
    config: state.data,
  });
}, [state.data]);

const [targets, setTargets] = useState({
  accounts: props.recipientId || "",
  expireDate: props.expireDate || "",
  expireTime: props.expireTime || "",
});

const handleInputChange = (name, value) => {
  // Update local form state
  setTargets((prev) => ({ ...prev, [name]: value }));

  // Propagate changes if an external onChange handler is provided
  if (onChange) {
    onChange({ ...targets, [name]: value });
  }
};

const handleSave = () => {
  // create the badge
  const thingId = state.thingId;
  const selectedType = state.selectedType;
  State.update({ isModalOpen: false });
  let edges = [];
  if (buildEdges) {
    const newPath = `${context.accountId}/badge/${thingId}`;
    edges = buildEdges(newPath, state.selectedType);
  }

  const data = {
    badge: {
      [thingId]: {
        ...targets,
        type: selectedType,
        data: state.data,
      },
    },
    index: {
      badge: JSON.stringify({
        key: thingId,
        value: {
          type: selectedType,
        },
      }),
    },
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
        <h2>Build a</h2>{" "}
        <Select
          value={state.view}
          onChange={(e) => State.update({ view: e.target.value })}
        >
          <option value="CREATE_BADGE">Badge</option>
          <option value="CREATE_TYPE">Schema</option>
        </Select>
      </Row>
      {state.view === "CREATE_BADGE" ? (
        <>
          <FormContainer>
            <h4>Badge Type</h4>
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
                <option value="">Select a schema</option>
                {availableTypes?.map((it) => (
                  <option value={it} key={it}>
                    {it}
                  </option>
                ))}
              </Select>
            </Row>
          </FormContainer>
          <FormContainer>
            <h4>Badge Data</h4>
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
                <b>Source:</b> {context.accountId}
              </Label>
            </Row>
            <Row>
              <Label>
                <b>Target(s): </b>
              </Label>
              <Input
                type="text"
                value={targets.recipientId}
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
              value={targets.expireDate}
              onChange={(e) => handleInputChange("expireDate", e.target.value)}
              placeholder=""
            />
            <Row>
              <Label>
                <b>Expiration Time: </b>
              </Label>
              <Input
                type="time"
                value={targets.expireTime}
                onChange={(e) =>
                  handleInputChange("expireTime", e.target.value)
                }
                placeholder=""
              />
            </Row>
          </FormContainer>
          <Footer>
            <Button onClick={handleSave}>Save</Button>
          </Footer>
        </>
      ) : (
        <Widget
          src="flowscience.near/widget/schema.editor"
          props={{ typeSrc: state.selectedType }}
        />
      )}
    </SidePanel>
  </Container>
);
