const item = props.item;
const onChange = props.onChange;

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

State.init({
  ...item.value,
});

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

const handleInputChange = (name, value) => {
  State.update({ [name]: value });
  if (props.onChange) {
    props.onChange({ [name]: value });
  }
};

const fetchTypeDefinition = (type) => {
  fetch(type, "final")
    .then((response) => {
      if (!response) {
        throw new Error("No response received for type definition");
      }
      return JSON.parse(response);
    })
    .catch((error) => {
      console.error("Error fetching type definition:", error);
    });
};

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
        onChange={(e) => onChange(property.name, e.target.value)}
        value={value}
        placeholder={property.name}
      />
    );
  } else {
    // For non-primitive types, fetch the type definition and render sub-properties
    const [subType, setSubType] = useState(null);

    useEffect(() => {
      if (property.type) {
        const response = fetch(property.type, "final");
        if (response) {
          const typeDef = JSON.parse(response);
          setSubType(typeDef);
        } else {
          console.error(
            "Error: Type definition not found or invalid response."
          );
        }
      }
    }, [property.type]);

    if (subType && subType.properties) {
      // Recursively render sub-properties
      return subType.properties.map((subProperty) => (
        <Property
          key={subProperty.name}
          property={subProperty}
          value={value[subProperty.name]}
          onChange={onChange}
        />
      ));
    } else {
      // Render loading state or placeholder
      return <div>Loading...</div>;
    }
  }
}

return (
  <Container>
    {createWidgetSrc ? (
      <Widget src={createWidgetSrc} props={{ onChange }} />
    ) : (
      properties.map((property) => (
        <div key={property.name}>
          <Label>{property.name}</Label>
          <Row>
            <Property
              property={property}
              value={item.value[property.name]}
              onChange={handleInputChange}
            />
          </Row>
        </div>
      ))
    )}
  </Container>
);
