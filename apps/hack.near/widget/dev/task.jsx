const accountId = props.accountId ?? context.accountId;

const daoId = props.daoId ?? "build.sputnik-dao.near";

const bounty = JSON.parse(JSON.stringify(props.bounty)) ?? {
  id: 888,
  description:
    "# [Bounty Title Here]\n\n## Description\n\n[Detailed description of what the bounty entails. What needs to be done, any specific requirements or skills needed, etc.]\n\n## Acceptance Criteria\n\n[What should be delivered upon the completion of the bounty? Be specific and clear about what you expect.]\n\n## Steps to Claim\n\n[Explanation of the procedure to claim the bounty. Step by step guide on what needs to be done to complete the bounty and how to submit the work.]\n\n## Additional Information\n\n[If applicable, include any additional information or resources relevant to the bounty. It could be helpful links, tips, or contacts.]",
  times: 1,
  amount: "1000000000000000000000000",
  max_deadline: "86400000000000",
};

// ==============================
// Functions
// ==============================

const handleClaim = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "bounty_claim",
      args: {
        id: JSON.parse(bounty.id),
        deadline: bounty.max_deadline,
      },
      deposit: 100000000000000000000000,
      gas: 150000000000000,
    },
  ]);
};

const handleUnclaim = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "bounty_giveup",
      args: {
        id: JSON.parse(bounty.id),
      },
      gas: 150000000000000,
    },
  ]);
};

const handleSubmit = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "work submitted",
          kind: {
            BountyDone: {
              receiver_id: accountId,
              bounty_id: JSON.parse(bounty.id),
            },
          },
        },
      },
      deposit: 100000000000000000000000,
      gas: 150000000000000,
    },
  ]);
};

// ==============================
// Styled Components
// ==============================

const Wrapper = styled.div`
  margin: 16px auto;
  background-color: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  p {
    line-height: 1.4;
    font-weight: 400;
    font-size: 15px;
    color: #868682;
    margin: 0;
  }

  h3 {
    font-weight: 600;
    font-size: 24px;
    color: #1b1b18;
  }

  h5 {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
    color: #6c757d;
  }

  .status {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    color: ${statusColor};
  }
`;

const CardFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid #eceef0;
`;

const Button = styled.div`
  width: 100%;
`;

const MarkdownContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 24px;
  background-color: #f8f9fa;
  color: #1b1b18;
  border-radius: 16px;
  max-height: 800px;
  overflow-y: auto;
  color: #333;
  line-height: 1.6;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

  h1 {
    font-size: 2em;
    color: #111;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.3em;
    margin-bottom: 1em;
  }

  h2 {
    font-size: 1.5em;
    color: #222;
    margin-bottom: 0.75em;
  }

  h3 {
    font-size: 1.3em;
    color: #333;
    margin-bottom: 0.6em;
  }

  h4 {
    font-size: 1.2em;
    color: #444;
    margin-bottom: 0.5em;
  }

  h5 {
    font-size: 1.1em;
    color: #555;
    margin-bottom: 0.4em;
  }

  p {
    font-size: 1em !important;
    margin-bottom: 1em !important;
  }

  a {
    color: #0645ad;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const claims = Near.view(daoId, "get_bounty_claims", {
  account_id: accountId,
});

return (
  <Wrapper>
    <div className="w-100">
      <h5>Bounty ID: {bounty.id}</h5>
      <MarkdownContainer>
        <Markdown text={bounty.description} />
      </MarkdownContainer>
    </div>
    <div className="d-flex flex-wrap gap-5">
      <div>
        <h5>Amount</h5>
        <Widget
          src="sking.near/widget/Common.TokenAmount"
          props={{
            amountWithoutDecimals: bounty.amount,
            address: bounty.token,
          }}
        />
      </div>
      <div>
        <h5>Hours</h5>
        <p>{bounty.max_deadline / 3600000000000}</p>
      </div>
    </div>
    <CardFooter>
      {!claims.length > 0 && (
        <Widget
          src="sking.near/widget/Common.Button"
          props={{
            children: <>Claim ({bounty.times - claims.length} left)</>,
            onClick: handleClaim,
          }}
        />
      )}
      {claims.length > 0 && (
        <Widget
          src="sking.near/widget/Common.Button"
          props={{
            children: <>Submit</>,
            onClick: handleSubmit,
          }}
        />
      )}
      {claims.length > 0 && (
        <Widget
          src="sking.near/widget/Common.Button"
          props={{
            children: <>Unclaim</>,
            onClick: handleUnclaim,
          }}
        />
      )}
    </CardFooter>
  </Wrapper>
);
