const onCapture = props.onCapture;
const height = props.height || "100vh";

const Container = styled.div`
  height: ${height};
`;

return (
  <Container>
    <Camera
      onCapture={(src) => {
        onCapture(src);
      }}
    />
  </Container>
);
