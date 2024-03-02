const isPrimitiveType = (type) =>
  ["string", "number", "boolean", "date", "md"].includes(type);

const isComplexType = (type) =>
  Array.isArray(type)
    ? "typesArray" // I don't know if we still need to handle this
    : type === "array"
    ? "array"
    : typeof type === "object"
    ? "object"
    : typeof type === "string" && !isPrimitiveType(type)
    ? "custom"
    : null;

const getDefaultForPrimitive = (type, defaultValue) => {
  if (defaultValue !== undefined) {
    return defaultValue;
  }
  switch (type) {
    case "string":
      return "";
    case "number":
      return null; // should this be 0?
    case "boolean":
      return null; // do we want this to be false?
    case "date":
      return null; // do we want this to be today?
    case "md":
      return null;
  }
};

const typeToEmptyData = (typeDef) => {
  const obj = {};

  Object.keys(typeDef.properties).forEach((key) => {
    const fieldSchema = typeDef.properties[key];
    const type = fieldSchema.type;

    if (isPrimitiveType(type)) {
      obj[key] = getDefaultForPrimitive(type, fieldSchema.defaultValue);
    } else if (isComplexType(type) === "array") {
      obj[key] = fieldSchema.defaultValue ? [...fieldSchema.defaultValue] : [];
    } else if (isComplexType(type) === "object") {
      obj[key] = typeToEmptyData({ properties: type.properties });
    } else {
      console.log("edge case not handled for type: " + type);
      obj[key] = fieldSchema.defaultValue ?? null;
    }
  });

  return obj;
};

function checkProps(props, typeDef, prefix) {
  if (!prefix) {
    prefix = "";
  }
  const missingProps = [];

  for (const [key, value] of Object.entries(typeDef.properties)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (!props.hasOwnProperty(key)) {
      missingProps.push(`${fullKey}`);
      continue;
    }

    const propValue = props[key];

    if (value.type === "object" && value.properties) {
      missingProps.push(...checkProps(propValue, value, fullKey));
    }

    if (value.validation && value.validation.required && propValue == null) {
      missingProps.push(`${fullKey} (required)`);
    }
  }

  return missingProps;
}

function MissingPropsWarning({ props, typeDef, WarningElement }) {
  const missingProps = checkProps(props, typeDef);
  return (
    missingProps.length > 0 && (
      <>
        {WarningElement ? (
          <WarningElement missingProps={missingProps} />
        ) : (
          <div
            className="card border-warning mb-3 shadow"
            style={{ maxWidth: "30rem", margin: "auto" }}
          >
            <div className="card-header text-white bg-warning">
              <h4 className="card-title mb-0">Attention!</h4>
            </div>
            <div className="card-body text-danger">
              <p className="card-text">
                There {missingProps.length === 1 ? "is" : "are"}{" "}
                {missingProps.length} missing or invalid prop
                {missingProps.length === 1 ? "" : "s"}:
              </p>
              <ul className="list-group list-group-flush">
                {missingProps.map((prop) => (
                  <li key={prop} className="list-group-item">
                    <pre className="m-0">{prop}</pre>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </>
    )
  );
}

return {
  isPrimitiveType,
  isComplexType,
  getDefaultForPrimative,
  typeToEmptyData,
  checkProps,
  MissingPropsWarning,
};
