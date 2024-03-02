const Container = styled.div`
    height: 90vh;
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
`;

const TextBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    font-family: Inter;
`;

const UserAmount = styled.div`
    font-size: 10vw;
    font-weight: 500;
`;

const TextTop = styled.div`
    font-size: 1.5vw;
    font-weight: 300;
    text-align: right;
`;

const TextBottom = styled.div`
    font-size: 3vw;
    font-weight: 400;
`;
const totalHumans = Near.view("registry.i-am-human.near", "sbt_supply", {
  issuer: "gooddollar-v1.i-am-human.near",
});

return (
  <Container>
    {totalHumans ? (
      <>
        <TextBlock>
          <UserAmount>{1000 - totalHumans}</UserAmount>
          <TextBottom>more verified humans until 1K!</TextBottom>
        </TextBlock>
      </>
    ) : (
      <h1>Loading...</h1>
    )}
  </Container>
);
