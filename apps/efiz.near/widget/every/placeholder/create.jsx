const onChange = props.onChange;

const type = JSON.parse(
  Social.get("every.near/type/placeholder", "final") || "null"
);
const properties = type.properties || [];
// const test = [
//   { name: "test", type: "boolean", required: false },
//   { name: "test2", type: "number", required: false },
//   { name: "image", type: "every.near/type/image", required: false },
// ];
// properties = [...properties, ...test];

const Input = styled.input`
  width: 300px;
  height: 30px;
`;

const Select = styled.select`
  height: 30px;
  width: 300px;
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

const handleInputChange = (name, value) => {
  State.update({ [name]: value });
  if (props.onChange) {
    props.onChange({ [name]: value });
  }
};

function Property({ item }) {
  if (item.type === "string") {
    return (
      <Input
        key={item.name}
        onChange={(e) => handleInputChange(item.name, e.target.value)}
        value={state[item.name] || ""}
        placeholder={item.name}
      />
    );
  } else if (item.type === "boolean") {
    return (
      <Select
        key={item.name}
        onChange={(e) => handleInputChange(item.name, e.target.value)}
        value={state[item.name] || ""}
      >
        <option value="true">true</option>
        <option value="false">false</option>
      </Select>
    );
  } else if (item.type === "number") {
    return (
      <Input
        key={item.name}
        type="number"
        onChange={(e) =>
          handleInputChange(item.name, parseInt(e.target.value, 10))
        }
        value={state[item.name] || ""}
        placeholder={item.name}
      />
    );
  } else {
    const itemType = JSON.parse(Social.get(item.type, "final") || "null");
    const widgetSrc = itemType?.widgets?.create;
    // it would be great to modify the onChange function
    return <Widget src={widgetSrc} onChange={onChange} />;
  }
}

return (
  <Container>
    {properties.map((item) => (
      <Property item={item} />
    ))}
  </Container>
);
