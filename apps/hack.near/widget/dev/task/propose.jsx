const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";
const onClose = props.onClose;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  description: state.description,
  amount: state.amount,
  times: state.times,
  max_deadline: state.max_deadline,
});

const convertAmount = (amount, decimals) => {
  const [whole, fractional] = amount.toString().split(".");
  const wholePart = new BN(whole).mul(new BN("10").pow(new BN(decimals)));
  if (fractional === undefined) {
    return wholePart.toString();
  }
  const fractionalPart = new BN(fractional).mul(
    new BN("10").pow(new BN(decimals - fractional.length))
  );
  return wholePart.add(fractionalPart).toString();
};

const handleProposal = () => {
  const bounty = {
    description: state.description,
    token: props.token ?? "",
    amount: convertAmount(state.amount.toString(), 24) ?? 0,
    times: JSON.parse(state.times),
    max_deadline: JSON.stringify(state.max_deadline * 3600000000000),
  };
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "new task proposal",
          kind: {
            AddBounty: {
              bounty,
            },
          },
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

const onChangeDescription = (description) => {
  State.update({
    description,
  });
};

const onChangeToken = (token) => {
  State.update({
    token,
  });
};

const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};

const onChangeTimes = (times) => {
  State.update({
    times,
  });
};

const onChangeDeadline = (max_deadline) => {
  State.update({
    max_deadline,
  });
};

const Wrapper = styled.div`
  margin: 16px auto;
  max-width: 900px;
  background-color: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 100%;
  overflow-y: auto;

  @media (max-width: 600px) {
    border-radius: 0;
  }

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
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(27, 27, 24);
  border-radius: 100px;
  height: 40px;
  width: 40px;
  border: none;
  margin: 0;
  font-size: 26px;
  background-color: rgb(246, 246, 245);

  &:hover {
    background-color: rgb(243, 243, 242);
    color: rgb(0, 0, 0);
  }
`;

const defaultTaskDescription =
  "# Task\n\n## Description\n\nWhat is the main goal? What exactly needs to be done? Any specific requirements or skills needed?\n\n## Acceptance Criteria\n\nWhat should be delivered upon task completion? *Please be specific and clear about expectations.*\n\n## Steps to Claim\n\nWhat is the process of claiming the opportunity. Provide necessary guides about what needs to be done to complete the task.\n\n## Additional Information\n\nIf applicable, include helpful resources.";

return (
  <Wrapper>
    <div className="d-flex justify-content-between align-items-center">
      <h3>Propose New Task</h3>
      {onClose && (
        <CloseButton onClick={onClose}>
          <i className="bi bi-x"></i>
        </CloseButton>
      )}
    </div>
    <div className="d-flex gap-3 flex-wrap">
      <div>
        <h5>Sponsor</h5>
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId: daoId, tooltip: true }}
        />
      </div>
      <div className="ms-sm-5">
        <h5>Proposer</h5>
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId: accountId, tooltip: true }}
        />
      </div>
    </div>

    <div>
      <h5>Description</h5>
      <Widget
        src="sking.near/widget/Common.Inputs.Markdown"
        props={{
          onChange: (value) => onChangeDescription(value),
          height: "270px",
          initialText: defaultTaskDescription,
        }}
      />
    </div>
    <div className="d-flex gap-2">
      <div className="col-sm">
        <h5>
          <b>Reward (NEAR)</b>
        </h5>
        <input
          type="number"
          onChange={(e) => onChangeAmount(e.target.value)}
          min="0"
          placeholder="0"
        />
      </div>
      <div className="col-sm">
        <h5>Claims</h5>
        <input
          type="number"
          onChange={(e) => onChangeTimes(e.target.value)}
          min="1"
          placeholder="0"
        />
      </div>
      <div className="col-sm">
        <h5>Hours</h5>
        <input
          type="number"
          onChange={(e) => onChangeDeadline(e.target.value)}
          min="0"
          placeholder="0"
        />
      </div>
      {state.error && <div className="text-danger">{state.error}</div>}
      <div className="ms-auto">
        <Widget
          src="sking.near/widget/Common.Button"
          props={{
            children: "Submit",
            onClick: handleProposal,
            className: "mt-3",
            variant: "success",
          }}
        />
        {onClose && (
          <Widget
            src="sking.near/widget/Common.Button"
            props={{
              children: "Close",
              onClick: onClose,
              className: "mt-3",
            }}
          />
        )}
      </div>
    </div>
  </Wrapper>
);
