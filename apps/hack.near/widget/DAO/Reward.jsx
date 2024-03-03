const accountId = props.accountId ?? context.accountId;

const daoId = props.daoId ?? "multi.sputnik-dao.near";

const bounty = props.bounty ?? {
  id: 888,
  description: "xyz",
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
    font-size: 12px;
    font-weight: 400;
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

const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
`;

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;

  > * {
    min-width: 0;
  }
`;

const CardContent = styled.div`
  width: 100%;
`;

const CardFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid #eceef0;
`;

const CardTag = styled.p`
  margin: 0;
  font-size: 9px;
  line-height: 14px;
  color: #687076;
  font-weight: 400;
  white-space: nowrap;
  position: absolute;
  top: 0;
  right: 0;
  border-bottom-left-radius: 3px;
  padding: 0 4px;

  i {
    margin-right: 3px;
  }
`;

const Button = styled.div`
  width: 100%;
`;

const ButtonLink = styled.a`
  padding: 8px;
  height: 32px;
  border: 1px solid #d7dbdf;
  border-radius: 100px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: ${(p) => (p.primary ? "#006ADC" : "#11181C")} !important;
  background: #fbfcfd;
  white-space: nowrap;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }
`;

const claims = Near.view(daoId, "get_bounty_claims", {
  account_id: accountId,
});

return (
  <Wrapper>
    <Card>
      <CardTag>
        <div className="d-flex justify-content-between align-items-center">
          <h5>Bounty ID: {bounty.id}</h5>
        </div>
      </CardTag>
      <CardBody>
        <CardContent>
          <div className="row">
            <div className="col-sm">
              <h5>Amount</h5>
              <p>
                {bounty.amount / 1000000000000000000000000}
                {bounty.token === "" ? "NEAR" : ""}
              </p>
            </div>
            <div className="col-sm">
              <h5>Claims</h5>
              <p>{bounty.times}</p>
            </div>
            <div className="col-sm">
              <h5>Hours</h5>
              <p>{bounty.max_deadline / 3600000000000}</p>
            </div>
          </div>
        </CardContent>

        <CardContent>
          <div>
            <h5>Job Description</h5>
            <p>{bounty.description}</p>
          </div>
        </CardContent>
      </CardBody>
      <CardFooter>
        {!claims.length > 0 && (
          <ButtonLink onClick={handleClaim}>Claim</ButtonLink>
        )}
        {claims.length > 0 && (
          <ButtonLink onClick={handleSubmit}>Submit</ButtonLink>
        )}
        {claims.length > 0 && (
          <ButtonLink onClick={handleUnclaim}>Unclaim</ButtonLink>
        )}
      </CardFooter>
    </Card>
  </Wrapper>
);
