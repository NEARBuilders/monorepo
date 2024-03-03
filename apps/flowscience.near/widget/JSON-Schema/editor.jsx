// TO DO:
// schema typechecking with PropTypes
//
const { generateUID } = VM.require("flowscience.near/widget/generateUID");
const path = props.path;
const typeSrc = props.typeSrc || "every.near";
const schemaSrc = context.accountId ?? props.schemaSrc ?? "attestations.near";
const blockHeight = props.blockHeight || "final";
const selectedSchema = props.selectedSchema;

let type = {
  name: "",
  properties: [],
  widgets: {},
};

const [jsonSchema, setJsonSchema] = useState({
  schema: path,
  id: generateUID(),
  title: "",
  description: "",
  schemaType: "object", // Default to 'object'
  properties: [],
  required: [],
});

State.init({
  newType: typeSrc,
  typeName: type.name || "",
  properties: type.properties || [],
  newPropertyName: "",
  newPropertyType: "string",
  newTypeSrc: "",
  typeSrc: typeSrc,
  schemaSrc: schemaSrc,
  expanded: false,
  selectedSchema: selectedSchema,
  schemaPath: path,
});

let importedTypes = [];
if (state.typeSrc !== "") {
  const defaultTypes = Social.get(`every.near/type/**`, "final");
  const hyperfilesTypes = Social.get(`hyperfiles.near/type/**`, "final");
  const types = Social.get(`${state.typeSrc}/type/**`, "final");
  if (!types) {
    return <></>;
  }
  importedTypes =
    Object.keys(types)?.map((it) => `${state.typeSrc}/type/${it}`) || [];
}

const availableTypes = JSON.parse(props.availableTypes) || [
  "string",
  "boolean",
  "number",
  "date",
  "time",
  "tags",
  ...importedTypes,
];

const create = () => {
  const output = {
    jsonSchema: {
      [jsonSchema.title]: {
        ...jsonSchema,
        properties: state.properties,
        required:
          state.properties &&
          state.properties
            .filter((it) => it.isRequired)
            .map((it) => (it = it.name)),
      },
    },
  };
  Social.set(output, { force });
};

const Container = styled.div`
  margin: 20px 0;
`;

const FormContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  max-width: 200px;
  margin-bottom: 10px;
  height: 30px;
`;

const Select = styled.select`
  height: 30px;
`;

const Button = styled.button`
  height: 30px;
`;

const Text = styled.p`
  display: inline-block;
  margin-right: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const loadType = () => {
  const parts = state.newType.split("/");
  type = JSON.parse(Social.get(state.newType, blockHeight) || null);
  if (type) {
    type.name = parts[2];
    State.update({
      typeName: type.name,
      properties: type.properties,
      widgets: type.widgets,
    });
  }
};

if (prop.typeSrc !== "" && state.typeName === "") {
  loadType();
}

// fix loadSchema
const loadSchema = () => {
  State.update({ selectedSchema: newSchema });
  const parts = state.newSchema.split("/");
  schema = JSON.parse(Social.get(state.newSchema, blockHeight) || null);
  if (schema) {
    schema.name = parts[2];
    State.update({
      schemaName: schema.name,
      properties: schema.properties,
      widgets: type.widgets,
    });
  }
};

if (prop.schemaSrc !== "" && state.schemaName === "") {
  loadSchema();
}

// fix handleJsonSchemaChange
const handleJsonSchemaChange = (e) => {
  const { name, value } = e.target; // Destructure name and value from the event target
  setJsonSchema((prevJsonSchema) => ({
    ...prevJsonSchema,
    [name]: value, // Dynamically update the property based on input name
  }));
};

const handleSchemaTitleChange = (e) => {
  const value = e.target.value;
  setJsonSchema((prev) => ({ ...prev, title: value }));
};

const handleSchemaDescriptionChange = (e) => {
  const value = e.target.value;
  setJsonSchema((prev) => ({ ...prev, description: value }));
};

const handleSchemaTypeChange = (e) => {
  const value = e.target.value;
  setJsonSchema((prev) => ({ ...prev, schemaType: value }));
};

const handleAddProperty = () => {
  if (state.newPropertyName.trim() === "") return;

  const newProperty = {
    name: state.newPropertyName,
    type: state.newPropertyType,
    isRequired: state.newPropertyIsRequired,
    isMulti: state.newPropertyIsMulti,
  };

  State.update({
    properties: [...state.properties, newProperty],
    newPropertyName: "",
    newPropertyType: "string",
    newPropertyisRequired: false,
    newPropertyIsMulti: false,
  });
};

const handleRemoveProperty = (index) => {
  const updatedProperties = [...state.properties];
  updatedProperties.splice(index, 1);
  State.update({ properties: updatedProperties });
};

const handlePropertyNameChange = (e, index) => {
  const updatedProperties = [...state.properties];
  updatedProperties[index].name = e.target.value;
  State.update({ properties: updatedProperties });
};

const handleTypeChange = (e, index) => {
  const updatedProperties = [...state.properties];
  updatedProperties[index].type = e.target.value;
  State.update({ properties: updatedProperties });
};

const handleMultiChange = (e, index) => {
  const updatedProperties = [...state.properties];
  updatedProperties[index].isMulti = e.target.value;
  State.update({ properties: updatedProperties });
};

const handleRequiredChange = (e, index) => {
  const updatedProperties = [...state.properties];
  updatedProperties[index].isRequired = e.target.value;
  State.update({ properties: updatedProperties });
  setJsonSchema((prev) => ({
    ...prev,
    required: updatedProperties,
  }));
};

function TypeSelect({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange}>
      {availableTypes.map((it) => (
        <option value={it} key={it}>
          {it}
        </option>
      ))}
    </Select>
  );
}

// convert Multi and Required selects to checkboxes
function MultiSelect({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange}>
      <option value={false}>single</option>
      <option value={true}>multi</option>
    </Select>
  );
}

function RequiredSelect({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange}>
      <option value={false}>no</option>
      <option value={true}>yes</option>
    </Select>
  );
}

return (
  <Container>
    <Row>
      <Text>
        <b>Import Schema:</b>
      </Text>
      <Input
        type="text"
        value={state.newSchema}
        onChange={(e) => State.update({ newSchema: e.target.value })}
        placeholder={"account/schema/title"}
      />
      <Button onClick={loadSchema}>load</Button>
    </Row>
    <Row>
      <Text>
        <b>Import Types:</b>
      </Text>
      <Input
        type="text"
        value={state.newTypeSrc}
        onChange={(e) => State.update({ newTypeSrc: e.target.value })}
        placeholder={"hyperfiles.near"}
      />
      <Button onClick={() => State.update({ typeSrc: state.newTypeSrc })}>
        apply
      </Button>
    </Row>
    <FormContainer>
      <Row>
        <Text>
          <b>Title:</b>
        </Text>
        <Input
          type="text"
          name="title"
          value={jsonSchema.title}
          onChange={handleSchemaTitleChange}
          placeholder="Schema_Title"
        />
        <i>*overwrites existing path when saved</i>
      </Row>
      <Row>
        <Text>
          <b>Description:</b>
        </Text>
        <Input
          type="text"
          placeholder="Concisely explain."
          value={jsonSchema.description}
          onChange={handleSchemaDescriptionChange}
        />
      </Row>
      <Row>
        <Text>
          <b>Schema Type:</b>
        </Text>
        <Select value={value} onChange={handleSchemaTypeChange}>
          <option value={"object"}>object</option>
          <option value={"boolean"}>boolean</option>
        </Select>
      </Row>
      <hr></hr>
      <Text>
        <h4>Schema Properties</h4>
        <i>*Add properties below that are relevant to your use case.</i>
        <br />
        <br />
        <b>1.</b> [Name]: describe the property
        <br />
        <b>2.</b> [Type]: how is the property structured?
        <a href="https://everything.dev/every.near/widget/every.type.create">
          <i>[Define new types]</i>
        </a>
        <br />
        <b>3.</b> [Single/Multi]: can the property be an array?
        <br />
        <b>4.</b> [Required]: is the property required?
      </Text>
      {state.properties?.map((property, index) => (
        <Row key={index}>
          <div>
            <Label>Name:</Label>
            <Input
              type="text"
              value={property.name}
              onChange={(e) => handlePropertyNameChange(e, index)}
            />
          </div>
          <div>
            <Label>Property Type:</Label>
            <TypeSelect
              value={property.type}
              onChange={(e) => handleTypeChange(e, index)}
            />
          </div>
          <div>
            <Label>isMulti:</Label>
            <MultiSelect
              value={property.isMulti}
              onChange={(e) => handleMultiChange(e, index)}
            />
          </div>
          <div>
            <Label>Required:</Label>
            <RequiredSelect
              value={property.isRequired}
              onChange={(e) => handleRequiredChange(e, index)}
            />
          </div>
          <div>
            <Label>Remove:</Label>

            <Button onClick={() => handleRemoveProperty(index)}>Remove</Button>
          </div>
        </Row>
      ))}
      <Row>
        <div>
          <Label>New Property Name:</Label>
          <Input
            type="text"
            placeholder="Property Name"
            value={state.newPropertyName}
            onChange={(e) => State.update({ newPropertyName: e.target.value })}
          />
        </div>
        <div>
          <Label>New Type:</Label>
          <TypeSelect
            value={state.newPropertyType}
            onChange={(e) => State.update({ newPropertyType: e.target.value })}
          />
        </div>
        <div>
          <Label>isMulti:</Label>
          <MultiSelect
            value={state.newPropertyIsMulti}
            onChange={(e) =>
              State.update({ newPropertyIsMulti: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Required:</Label>
          <RequiredSelect
            value={state.newPropertyIsRequired}
            onChange={(e) =>
              State.update({ newPropertyIsRequired: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Add:</Label>
          <Button
            onClick={handleAddProperty}
            disabled={state.newPropertyName.trim() === ""}
          >
            +
          </Button>
        </div>
      </Row>

      <hr></hr>
      <Row>
        <Button
          onClick={create}
          disabled={state.properties.length === 0}
          className="styless"
        >
          Publish/Update Schema
        </Button>
      </Row>
    </FormContainer>
  </Container>
);
``;
