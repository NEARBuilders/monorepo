const accountId = props.accountId ?? context.accountId ?? "hack.near";

let isBuilder = false;
let widgets = Social.get(`${accountId}/widget/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
let widgetCount = 0;
if (widgets) {
  widgetCount = Object.keys(widgets).length;
}
if (widgetCount > 0) {
  isBuilder = true;
}

const Wrapper = styled.div`
  --section-gap: 23px;
  padding-top: 42px;

  @media (max-width: 1155px) {
    .line-rounded-corners {
      display: none !important;
    }
  }

  @media (max-width: 998px) {
    padding-top: 0;
  }
`;

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 90px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 0;
  max-width: 700px;

  span {
    display: inline-block;
    background: #6ce89f;
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

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin-botton: 8px;
`;

const Flex = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: column;
  flex-wrap: "nowrap";

    @media (max-width: 998px) {
    flex-direction: column;
    gap: var(--section-gap);
    }
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 998px) {
    flex-direction: column;
    gap: var(--section-gap);
  }
`;

const Container = styled.div`
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
`;

return (
  <Wrapper>
    <Container>
      <Flex>
        <H1>
          Build
          <span>
            DAO
            <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
              <path
                d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
                fill="#323330"
              />
            </svg>
          </span>
        </H1>
      </Flex>
      {isBuilder ? (
        <div>
          <Text
            size="18px"
            weight="600"
            style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
          >
            Your Adventure Has Begun
          </Text>
          <FlexContainer>
            <div className="m-1">
              <Widget
                src="hack.near/widget/Join"
                props={{ groupId, accountId, curatorId }}
              />
              <button
                onClick={() => State.update({ showModal: true })}
                className="btn btn-dark m-1"
              >
                Edit
              </button>
            </div>
          </FlexContainer>
        </div>
      ) : (
        <Flex>
          <Text
            size="18px"
            weight="600"
            style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
          >
            Begin a New Adventure
          </Text>
          <FlexContainer>
            <div className="m-1">
              <Widget
                src="near/widget/DIG.Button"
                props={{
                  href: "#/hack.near/widget/create.page",
                  label: "Create Something",
                  variant: "outline-secondary",
                  size: "large",
                }}
              />
            </div>
          </FlexContainer>
        </Flex>
      )}
      <Widget
        src="hack.near/widget/Graph"
        props={{
          accountId,
          thingId: groupId,
        }}
      />
      {state.showModal && (
        <Widget
          src="hack.near/widget/Connect"
          props={{
            handleClose: () => State.update({ showModal: false }),
          }}
        />
      )}
    </Container>
  </Wrapper>
);
