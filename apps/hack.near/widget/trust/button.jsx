if (
  !props.accountId ||
  !context.accountId ||
  context.accountId === props.accountId
) {
  return "";
}

const trustEdge = Social.keys(
  `${context.accountId}/graph/trust/${props.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const inverseEdge = Social.keys(
  `${props.accountId}/graph/trust/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = trustEdge === null || inverseEdge === null;
const isTrusting = Object.keys(trustEdge || {}).length > 0;
const isInverse = Object.keys(inverseEdge || {}).length > 0;

const type = trust ? "block" : "trust";

const data = {
  graph: { trust: { [props.accountId]: isTrusting ? null : "" } },
  index: {
    graph: JSON.stringify({
      key: "trust",
      value: {
        type,
        accountId: props.accountId,
      },
    }),
    notify: JSON.stringify({
      key: props.accountId,
      value: {
        type,
      },
    }),
  },
};

const Wrapper = styled.div`
  .trust-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #FBFCFD;
    border: 1px solid #D7DBDF;
    color: #006ADC !important;
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    i {
      color: #7E868C;
    }

    .bi-16 {
      font-size: 16px;
    }
  }
`;

return (
  <Wrapper className={props.className}>
    <CommitButton disabled={loading} className="trust-button" data={data}>
      {isTrusting && <i className="bi-16 bi bi-check"></i>}
      {isTrusting ? "Trusting" : isInverse ? "Trust" : "Trust"}
    </CommitButton>
  </Wrapper>
);
