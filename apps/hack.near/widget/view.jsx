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

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 64px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #111;
  margin: 0;
  max-width: 999px;

  span {
    display: inline-block;
    background: #96d2b7;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
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
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  text-align: center;
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

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 4px;
  overflow: auto;
  scroll-behavior: smooth;
  justify-content: center;

  @media (max-width: 1200px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin: 0 -12px 48px;

    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 23px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #11181c;
    cursor: pointer;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
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
            <H1>
              <>
                {data.name}
                <span>
                  <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
                    <path
                      d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
                      fill="#111"
                    />
                  </svg>
                  DAO
                </span>
              </>
            </H1>
            <Subtitle>{data.tagline}</Subtitle>
          </Column>
        </Row>
        <br />
      </InnerContainer>
    </Container>
    {data.isUnderConstruction === "true" ? (
      <Widget
        src="every.near/widget/every.thing.view"
        props={{ path: "efiz.near/thing/under.construction" }}
      />
    ) : null}
    <div className="m-3">
      <Tabs>
        {data &&
          data.views?.map((view) => (
            <TabsButton onClick={() => State.update({ thingSrc: view.src })}>
              {view.name}
            </TabsButton>
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
      </Tabs>
    </div>
    <>
      <Thing />
    </>
  </>
);
