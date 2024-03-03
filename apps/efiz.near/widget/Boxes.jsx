const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  background-color: white;
  margin: 10px;
`;

const FirstBox = styled(Box)`
  height: 200px;
`;

const SecondBox = styled(Box)`
  height: 400px;
`;

const ThirdBox = styled(Box)`
  flex-grow: 1;
`;

return (
  <Container>
    <FirstBox>Box 1</FirstBox>
    <SecondBox>Box 2</SecondBox>
    <ThirdBox>Box 3</ThirdBox>
  </Container>
);
