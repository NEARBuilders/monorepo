const initialSchemaSrc = props.schemaSrc || "attestations.near";
const [newSchemaSrc, setNewSchemaSrc] = useState(initialSchemaSrc);
const [schemaSrc, setSchemaSrc] = useState(initialSchemaSrc);
const [availableSchemas, setAvailableSchemas] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [selectedSchema, setSelectedSchema] = useState(
  props.selectedSchema || "attestations.near/type/isTrue"
);

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  `;
const FormContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;
const Select = styled.select`
  `;
const Label = styled.label`
`;
const Input = styled.input`
  `;

useEffect(() => {
  const fetchSchemasList = async () => {
    setIsLoading(true);
    // Ensure dynamic accountId is correctly included in the query
    const schemas = Social.get(`${schemaSrc}/type/**`, "final");
    if (schemas) {
      const schemasList = Object.keys(schemas).map(
        (key) => `${schemaSrc}/type/${key}`
      );
      setAvailableSchemas(schemasList);
    } else {
      setAvailableSchemas([]);
    }
    setIsLoading(false);
  };

  fetchSchemasList();
}, [schemaSrc]); // Depend on schemaSrc to refetch when it changes

if (!schemas) {
  console.error(`Failed to fetch schemas for ${schemaSrc}`);
  // Handle the error appropriately in the UI
}

useEffect(() => {
  // Sync state with prop when it changes
  setSelectedSchema(props.selectedSchema);
}, [props.selectedSchema]); // Re-run effect if props.selectedSchema changes

const handleSchemaChange = (e) => {
  setSelectedSchema(e.target.value);
  console.log(`New schema selected: ${newSchema}`); // Log the new schema selection

  if (props.onSelectedSchemaChange) {
    props.onSelectedSchemaChange(e.target.value);
  }
};

const handleSchemaOwnerChange = (e) => {
  setNewSchemaSrc(e.target.value);
};

const handleApplySchemaSrc = () => {
  setSchemaSrc(newSchemaSrc); // Apply the new schema source
  console.log(`Applying new Schema Owner: ${newSchemaSrc}`); // Log the action
};

return (
  <FormContainer>
    <Label>Schema Owner:</Label>
    <Row>
      <Input
        type="text"
        onChange={handleSchemaOwnerChange} // Corrected to use the handleSchemaOwnerChange function
        value={newSchemaSrc}
        placeholder="accountId"
      />
      <Button onClick={handleApplySchemaSrc}>apply</Button>
    </Row>
    <Label>Schema:</Label>
    <Row>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Select value={selectedSchema} onChange={handleSchemaChange}>
          <option value="">Choose a schema</option>
          {availableSchemas.map((schema) => (
            <option key={schema} value={schema}>
              {schema}
            </option>
          ))}
        </Select>
      )}
    </Row>
  </FormContainer>
);
