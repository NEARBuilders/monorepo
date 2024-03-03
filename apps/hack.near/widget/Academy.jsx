const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";
const role = props.role ?? "community";

State.init({
  email: "",
  agreeIsChecked: false,
  hasRegistered: false,
  isMember,
});

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}

const groups = policy.roles
  .filter((role) => role.name === "community")
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

const check = groups.map((group) => {
  return !group
    ? false
    : group.filter((address) => address === accountId).length > 0;
})?.[0];

const handleSignup = () => {
  if (state.email !== "") {
    asyncFetch("https://monkfish-app-ginhc.ondigitalocean.app/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Everything": "subscription",
      },
      body: JSON.stringify({
        query:
          "mutation CreateEmail($email: String) { emails { create(name: $email) { entities { id } } } }",
        variables: {
          email: state.email,
        },
      }),
    }).then((resp) => {
      // Storage.privateSet()
      State.update({ hasRegistered: true });
      State.update({ email: "" });
    });
  }
};

const Wrapper = styled.div`
  --section-gap: 23px;
  padding-top: 42px;

  @media (max-width: 1160px) {
    .line-rounded-corners {
      display: none !important;
    }
  }

  @media (max-width: 900px) {
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
    background: #F0DB4F;
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
  margin: 0;
`;

const Flex = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-direction: column;
  flex-wrap: "nowrap";

    @media (max-width: 900px) {
    flex-direction: column;
    gap: var(--section-gap);
    }
`;

const Container = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
`;

const InputContainer = styled.div`
  width: 320px;
`;

const CheckWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const CheckButton = styled.button`
  border: none;
  --bs-btn-hover-bg: transparent;
  --bs-btn-active-bg: transparent;
  --bs-btn-color: ${state.agreeIsChecked ? "#26A65A" : "black"};
  --bs-btn-hover-color: ${state.agreeIsChecked ? "#26A65A" : "var(--bs-blue)"};
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
    margin-top: 23px;

`;

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
`;

const TimelineText = styled.p`
  font-size: 16px;
  margin: 0;
`;

const isValidEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

return (
  <Wrapper>
    <Container>
      <Flex>
        <H1>
          <span>
            BOS{" "}
            <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
              <path
                d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
                fill="#323330"
              />
            </svg>
          </span>
          Academy
        </H1>
        <Text style={{ maxWidth: "670px" }}>
          Did you know? The
          <a href="https://nearbuilders.com/bos">blockchain operating system</a>
          (BOS) makes it fun and easy to learn programming skills! Join
          collaborative groups, discover projects, and together, we can build
          anything with open web components.
        </Text>
        <Text size="23px" weight="600">
          Workshops + Hackathon
        </Text>
        <Text
          size="18px"
          weight="600"
          style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
        >
          <a href="https://calendar.google.com/calendar/u/0?cid=Y182NGYxNGNkMDFiMWY0MmU1OGE4MTY2MGYyOGVmOWFkZjE4NjdhMTJlNDJiM2UyZDNhMTc3ODczOTYwYjAyNTcwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20">
            Summer 2023
          </a>
        </Text>
        {!state.hasRegistered && (
          <InputContainer>
            <Widget
              src={"nearhorizon.near/widget/Inputs.Text"}
              props={{
                label: "",
                placeholder: "Email",
                placeholder: "Your Email Address",
                value: state.email,
                onChange: (email) => State.update({ email }),
              }}
            />
          </InputContainer>
        )}
        {isValidEmail(state.email) && (
          <div>
            {!agreeIsChecked ? (
              <CheckWrapper>
                <CheckButton
                  onClick={() => {
                    State.update({ agreeIsChecked: !state.agreeIsChecked });
                  }}
                  className="btn"
                >
                  <div className="d-flex flex-row align-items-center gap-3">
                    <i
                      className={`bi bi-${
                        state.agreeIsChecked ? "check-square" : "square"
                      }`}
                      style={{ fontSize: "1.5rem" }}
                    />
                    <span style={{ textAlign: "left" }}>
                      I would like to receive more info about participating.
                    </span>
                  </div>
                </CheckButton>
              </CheckWrapper>
            ) : (
              ""
            )}
          </div>
        )}
        {!state.hasRegistered && (
          <div className="row">
            <button
              className="btn btn-primary"
              disabled={!state.agreeIsChecked}
              onClick={handleSignup}
            >
              Register for Updates
            </button>
          </div>
        )}
        {state.hasRegistered && (
          <div>
            {check ? (
              <Widget
                src="near/widget/DIG.Button"
                props={{
                  href: "https://wallet.near.org/linkdrop/v2.keypom.near/4japszHTmC37t94Ep47d16DfPWx3A83BMExt26iH4YgnjDtHJGwpXokeZQoxuogKCvagzAF4DN2wW8ePZvwKKCyj",
                  label: "Get Started",
                  variant: "outline-secondary",
                  size: "large",
                }}
              />
            ) : (
              <div>
                <Widget
                  src="near/widget/DIG.Button"
                  props={{
                    href: "#/academy.near/widget/edu",
                    label: "Get More Info",
                    variant: "outline-secondary",
                    size: "large",
                  }}
                />
              </div>
            )}
          </div>
        )}
      </Flex>
      <Flex>
        <TimelineContainer>
          <h5>
            <b>Course Timeline:</b> Virtual Sessions
          </h5>
          <TimelineItem>
            <TimelineText>
              <b>June 21:</b>{" "}
              <a href="https://zoom.us/webinar/register/WN_X6DN7sShRPy_OGrCL8fEfw">
                Create your first BOS app!
              </a>
            </TimelineText>
          </TimelineItem>
          <div className="row mb-3">
            <Widget
              src="miraclx.near/widget/Attribution"
              props={{ dep: true, authors: ["james.near"] }}
            />
          </div>
          <TimelineItem>
            <TimelineText>
              <b>June 28:</b>
              <a href="https://zoom.us/webinar/register/WN_RagPHBFlQlGx6YS4WEpi3Q">
                Smart Contract Interactions
              </a>
            </TimelineText>
          </TimelineItem>
          <div className="row mb-3">
            <Widget
              src="miraclx.near/widget/Attribution"
              props={{ dep: true, authors: ["alan777.near"] }}
            />
          </div>
          <TimelineItem>
            <TimelineText>
              <b>July 7:</b>
              <a href="https://zoom.us/webinar/register/WN_zXO7b31-TM62J_sxiytAVQ">
                Indexers, APIs, and Components
              </a>
            </TimelineText>
          </TimelineItem>
          <div className="row mb-3">
            <Widget
              src="miraclx.near/widget/Attribution"
              props={{ dep: true, authors: ["microchipgnu.near"] }}
            />
          </div>
          <TimelineItem>
            <TimelineText>
              <b>July 18:</b>
              <a href="https://zoom.us/webinar/register/WN_URaUqvDqTjaP7NoLOaHACw">
                Build Anything with 'Everything'
              </a>
            </TimelineText>
          </TimelineItem>
          <div className="row mb-3">
            <Widget
              src="miraclx.near/widget/Attribution"
              props={{ dep: true, authors: ["efiz.near"] }}
            />
          </div>
          <TimelineItem>
            <TimelineText>
              <b>July 21:</b>
              <a href="https://zoom.us/webinar/register/WN_K0Dq50nGRiiX9fiv3BDINw">
                BOS Component Design Patterns
              </a>
            </TimelineText>
          </TimelineItem>
          <div className="row mb-3">
            <Widget
              src="miraclx.near/widget/Attribution"
              props={{ dep: true, authors: ["manzanal.near"] }}
            />
          </div>
          <TimelineItem>
            <TimelineText>
              <b>July 25:</b>
              <a href="https://zoom.us/webinar/register/WN_8Ba3cAzzS5euv4ck094WvA">
                BOS Web Engine + Gateways
              </a>
            </TimelineText>
          </TimelineItem>
          <div className="row mb-3">
            <Widget
              src="miraclx.near/widget/Attribution"
              props={{ dep: true, authors: ["mattlock.near"] }}
            />
          </div>
          <TimelineItem>
            <TimelineText>
              <b>August 11-27:</b>
              <a href="https://nearbuilders.com/boshacks">
                Virtual BOS Hackathon
              </a>
            </TimelineText>
          </TimelineItem>
          <div className="row mb-3">
            <Widget
              src="miraclx.near/widget/Attribution"
              props={{ dep: true, authors: ["hackerhouse.near"] }}
            />
          </div>
        </TimelineContainer>
        <div>
          <Widget
            src="near/widget/DIG.Button"
            props={{
              href: "https://zoom.us/meeting/register/tJwrfuqgrDsjGdD6P4I_E-pfswqYv4v8JQok",
              label: "Daily Office Hours",
              variant: "outline-secondary",
              size: "large",
            }}
          />
        </div>
      </Flex>
      <br />
      <Flex>
        <Text
          size="14px"
          weight="600"
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.17em",
            textAlign: "center",
          }}
        >
          Made Possible by Collaboration
        </Text>
        <Widget src="hack.near/widget/banyan.logo" />
      </Flex>
    </Container>
  </Wrapper>
);
