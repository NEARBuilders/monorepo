// A function to render properties, adjusted to use stored schemas from the state
const renderProperties = (properties, data, onChange) => {
  if (state.loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }
  if (!properties) {
    return <div>No properties to display</div>; // Add a condition for no properties
  }
  return properties.map((property) => {
    const propertyType = property.type;
    if (
      propertyType.startsWith("${typeSrc}.near/type/") &&
      state.schemas[propertyType]
    ) {
      // Use the stored schema from the state
      const nestedSchema = state.schemas[propertyType];
      if (nestedSchema && nestedSchema.properties) {
        return renderProperties(
          nestedSchema.properties,
          data[property.name],
          onChange
        );
      } else {
        // Handle the case where the nested schema is not available yet
        // This could be a placeholder or a loading indicator
        return <div>Loading...</div>;
      }
    } else {
      // Render a simple input for primitive types
      return (
        <Input
          key={property.name}
          type={property.type === "string" ? "text" : property.type}
          value={data[property.name] || ""}
          placeholder={property.name}
          onChange={(e) => onChange(property.name, e.target.value)}
        />
      );
    }
  });
};
