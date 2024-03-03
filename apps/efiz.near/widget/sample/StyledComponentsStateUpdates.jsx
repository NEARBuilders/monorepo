const BLACK = "#000";

const VariableInjection = styled.div`
    background-color: ${BLACK};
`;

const NoVariableInjection = styled.div`
    background-color: #000;
`;

const [value, setValue] = useState("");

return (
  <>
    <VariableInjection>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="This input is nested in a styled component with variable injection"
      />
    </VariableInjection>
    <NoVariableInjection>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="This input is nested in a styled component without variable injection"
      />
    </NoVariableInjection>
  </>
);
