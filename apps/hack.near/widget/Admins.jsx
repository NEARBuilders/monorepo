const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";
const role = props.role ?? "admin";

const sbtData = Near.view("registry.i-am-human.near", "sbt_supply_by_owner", {
  account: accountId,
  issuer: "gooddollar-v1.i-am-human.near",
});

const isHuman = sbtData > 0;

const handleJoin = () => {
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "potential member",
          kind: {
            AddMemberToRole: {
              member_id: accountId,
              role: role,
            },
          },
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

const Wrapper = styled.div`
  --section-gap: 42px;
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
  font-size: 85px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 0;
  max-width: 700px;

  span {
    display: inline-block;
    background: #62C6F2;
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
  gap: ${(p) => p.gap};
  align-items: ${(p) => p.alignItems};
  justify-content: ${(p) => p.justifyContent};
  flex-direction: ${(p) => p.direction ?? "row"};
  flex-wrap: ${(p) => p.wrap ?? "nowrap"};

  ${(p) =>
    p.mobileStack &&
    `
    @media (max-width: 900px) {
      flex-direction: column;
      gap: var(--section-gap);
    }
  `}
`;

const Container = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: ${(p) => p.gap ?? "var(--section-gap)"};
  flex-direction: column;
  align-items: ${(p) => (p.center ? "center" : undefined)};
  justify-content: ${(p) => (p.center ? "center" : undefined)};
  text-align: ${(p) => (p.center ? "center" : undefined)};
  padding: var(--section-gap) 23px;
`;

return (
  <Wrapper>
    <Container center>
      <Flex gap="23px" direction="column" alignItems="center">
        <H1>
          Regional Communities
          <span>
            DAO{" "}
            <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
              <path
                d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
                fill="#4D63EC"
              />
            </svg>
          </span>
        </H1>

        <Text size="29px" weight="600">
          NEAR Ecosystem Governance
        </Text>

        {!accountId && (
          <Widget
            src="near/widget/DIG.Button"
            props={{
              href: "https://near.org/signup",
              label: "Create Account",
              variant: "outline-dark",
              size: "large",
            }}
          />
        )}

        {accountId && (
          <button className="btn btn-outline-success" onClick={handleJoin}>
            Join the DAO
          </button>
        )}

        {!accountId && !isHuman && (
          <div className="row">
            <div className="col-6 mt-5">
              <Widget
                src="near/widget/DIG.Button"
                props={{
                  href: "https://i-am-human.app",
                  label: "Get Verified",
                  variant: "outline-primary",
                  size: "large",
                }}
              />
            </div>
            <div className="col-6">
              <Widget src="hack.near/widget/gov.Badge" />
            </div>
          </div>
        )}
      </Flex>

      <Text
        size="14px"
        weight="600"
        style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
      >
        Made Possible by{" "}
        <a href="https://near.org/blog/near-digital-collective-legal-framework/">
          NDC
        </a>
        <Widget src="hack.near/widget/dev.Badge" />
      </Text>
    </Container>
  </Wrapper>
);
