const data = props.data;

const Header = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
`;

const Container = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    justify-content: flex-start;
  }
`;

const InnerContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 535px;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;  
//   border: 2px solid orange;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
//   border: 2px solid green;
  padding: 20px;

  @media (max-width: 767px) {
    border-top: none;
    padding: 10px;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  

  svg {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 767px) {
    margin-top: 0;
    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Button = styled.button`
  text-transform: lowercase !important;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const SubjectField = styled.input`
  font-size: 4em;
  line-height: 1.25;
  font-weight: 400;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  width: 100%;

  @media (max-width: 767px) {
    font-size: 1.5em;
  }
`;

const Title = styled.p`
  line-height: 1.25;
  font-weight: 400;
  font-size: 4em;
  margin-bottom: 0;
`;

const Subtitle = styled.p`
  line-height: 1.25;
  font-weight: 400;
  font-size: 2em;
  margin-left: 70px;
`;

const Text = styled.p`
  line-height: 1.25;
  font-weight: 400;
  font-size: 2em;
`;

const Subtext = styled.p`
  line-height: 1.25;
  font-weight: 400;
  font-size: 1em;
`;

State.init({
  thingSrc: data.views[0]?.src,
});

function Thing() {
  if (state.thingSrc) {
    return (
      <>
        <Widget
          src={"every.near/widget/every.thing.view"}
          props={{ path: state.thingSrc }}
        />
      </>
    );
  }
}

// how can we have this be custom?
// settings/every/subject

function handleInputChange(e) {
  State.update({
    path: e.target.value,
  });
}

return (
  <>
    <Container>
      <InnerContainer>
        <Row>
          <Column>
            <Title>{data.name}</Title>
            <Subtitle>{data.tagline}</Subtitle>
          </Column>
        </Row>
      </InnerContainer>
    </Container>
    {data.isUnderConstruction === "true" ? (
      <Widget
        src="every.near/widget/every.thing.view"
        props={{ path: "efiz.near/thing/under.construction" }}
      />
    ) : null}
    <ButtonRow>
      {data &&
        data.views?.map((view) => (
          <Button onClick={() => State.update({ thingSrc: view.src })}>
            {view.name}
          </Button>
        ))}
      {/**
      <Button
        onClick={() =>
          State.update({
            thingSrc: "efiz.near/widget/every.type.create",
          })
        }
      >
        +
      </Button>
      */}
    </ButtonRow>
    <>
      <Thing />
    </>
  </>
);
