const Wrapper = styled.div`
  .submit-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 39px;
    border-radius: 100px;
    font-weight: 500;
    font-size: 14px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #FBFCFD;
    border: 1px solid #D7DBDF;
    color: ${props.primary ? "#006ADC" : "#11181C"} !important;
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    i {
      display: inline-block;
      transform: rotate(90deg);
      color: #7E868C;
    }
  }
`;

const data = {
  index: {
    graph: JSON.stringify({
      key: "request",
      value: {
        accountId: props.accountId,
        type: props.type,
        name: props.name,
      },
    }),
    notify: JSON.stringify({
      key: props.ownerId,
      value: {
        type: "request",
      },
    }),
  },
};

return (
  <Wrapper className={props.className}>
    <CommitButton className="submit-button" force data={data}>
      <i className="bi bi-git"></i>
      Submit
    </CommitButton>
  </Wrapper>
);
