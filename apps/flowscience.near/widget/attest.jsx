const item = props.item;
const onChange = props.onChange;

const [formValues, setFormValues] = useState({
  recipientId: props.recipientId || "",
  expireDate: props.expireDate || "",
  expireTime: props.expireTime || "",
  revokeDate: props.revokeDate || "",
  refUID: props.refUID || "",
  payload: props.payload || "",
});

const Input = styled.input`
  height: 30px;
`;

const Select = styled.select`
  height: 30px;
`;

const Button = styled.button`
  text-transform: lowercase !important;
  padding: 8px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.label`
`;

const { generateUID } = VM.require("flowscience.near/widget/generateUID");

State.init({
  ...item.value,
  objectUID: generateUID(),
});

const attestData = {
  attestation: {
    [props.item.selectedSchema]: {
      [state.objectUID]: {
        ...formValues,
      },
    },
  },
};

const DynamicInput = ({ type, onChange, value, placeholder }) => {
  if (type === "boolean") {
    return (
      <Select onChange={onChange} value={value}>
        <option value="true">true</option>
        <option value="false">false</option>
      </Select>
    );
  } else {
    return (
      <Input
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    );
  }
};

// Primitive checks
if (["string", "number", "date", "time", "boolean"].includes(item.type)) {
  return (
    <DynamicInput
      type={item.type === "string" ? "text" : item.type}
      onChange={onChange}
      value={item.value}
    />
  );
}

// On-chain Type
const type = JSON.parse(Social.get(item.type, "final") || "null");
const properties = type.properties || [];
const createWidgetSrc = type.widgets?.create;

function Property({ property, value }) {
  // If property is multiple values
  if (property.isMulti === "true") {
    // Build an array (recursively calls this Widget)
    return (
      <Widget
        src="efiz.near/widget/every.array.build"
        props={{
          item: { ...property, value },
          onChange: (val) => handleInputChange(property.name, val),
        }}
      />
    );
  }
  // Else check for primitives
  if (["string", "number", "date", "time", "boolean"].includes(property.type)) {
    return (
      <DynamicInput
        type={property.type === "string" ? "text" : property.type}
        onChange={(e) => handleInputChange(property.name, e.target.value)}
        value={state[property.name] || ""}
        placeholder={property.name}
      />
    );
  } else {
    // This requires a specific type of creator
    // (like image upload)
    // TODO: I don't think this does what I want it to yet...
    const propertyType = JSON.parse(
      Social.get(property.type, "final") || "null"
    );
    const widgetSrc = propertyType?.widgets?.create;
    // it would be great to modify the onChange function
    return (
      <Widget
        src={widgetSrc}
        props={{ onChange: (e) => handleInputChange(property.name, e) }}
      />
    );
  }
}

const handleSave = () => {
  Social.set(attestData)
    .then(() => {
      console.log("Attestation saved successfully");
      if (onChange) {
        onChange(attestData);
      }
    })
    .catch((error) => {
      console.error("Error saving attestation:", error);
    });
};

const handleInputChange = (name, value) => {
  // Update local form state
  setFormValues((prev) => ({ ...prev, [name]: value }));

  // Propagate changes if an external onChange handler is provided
  if (onChange) {
    onChange({ ...formValues, [name]: value });
  }
};

return (
  <Container>
    {createWidgetSrc ? (
      <>
        <Widget src={createWidgetSrc} props={{ onChange }} />
      </>
    ) : (
      <>
        {properties?.map((property) => (
          <div key={property.name}>
            <Label>{property.name}</Label>
            <Row>
              <Property property={property} value={item.value[property.name]} />
            </Row>
          </div>
        ))}
      </>
    )}
    <Label>
      <b>UID:</b> {state.objectUID}
    </Label>
    <Label>
      <b>Attestor:</b> {context.accountId}
    </Label>
    <Label>
      <b>Recipient: </b>
    </Label>
    <Input
      type="text"
      value={formValues.recipientId}
      onChange={(e) => handleInputChange("recipientId", e.target.value)}
      placeholder="recipient.near"
    />
    <Label>
      <b>Expiration Date: </b>
    </Label>
    <Input
      type="date"
      value={formValues.expireDate}
      onChange={(e) => handleInputChange("expireDate", e.target.value)}
      placeholder=""
    />
    <Label>
      <b>Expiration Time: </b>
    </Label>
    <Input
      type="time"
      value={formValues.expireTime}
      onChange={(e) => handleInputChange("expireTime", e.target.value)}
      placeholder=""
    />
    <Label>
      <b>refUID: </b>
    </Label>
    <Input
      type="text"
      value={formValues.refUID}
      onChange={(e) => handleInputChange("refUID", e.target.value)}
      placeholder="attestations.near/thing/0123456789123456"
    />
    <Label>
      <b>Data Payload: </b>
    </Label>
    <Input
      type="text"
      value={formValues.payload}
      onChange={(e) => handleInputChange("payload", e.target.value)}
      placeholder="# This is markdown text."
    />
    <Button onClick={handleSave}>Save</Button>
    <hr></hr>Preview:
    <Widget
      src="efiz.near/widget/Every.Raw.View"
      props={{
        value: attestData,
      }}
    />
  </Container>
);
