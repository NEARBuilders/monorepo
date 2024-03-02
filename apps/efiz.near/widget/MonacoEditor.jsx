const path = props.path;
const code = props.code;
const language = props.language;
const onChange = props.onChange;

const height = props.height || "500px";
const Container = styled.div`
    height: ${height};
`;

return (
  <Container>
    <MonacoEditor
      path={path}
      language={language}
      value={code}
      onChange={onChange}
    />
  </Container>
);
