const width = props.width;
const height = props.height;
const note = props.note;

const Container = styled.div`
  width: ${width || "100%"};
  height: auto;
  background-color: gray;
  border: 2px solid #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: ${height || "300px"};
`;

const Text = styled.div`
  font-size: 20px;
  color: #fff;
`;

const Button = styled.button`
`;

return (
  <Container>
    <Text>{note || "placeholder"}</Text>
  </Container>
);
