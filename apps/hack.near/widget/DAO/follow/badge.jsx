if (!props.accountId || !context.accountId) {
  return "";
}

const o = Social.keys(
  `${props.accountId}/graph/follow/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const Button = styled.div`
  .join-button {
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

return o && Object.keys(o).length ? (
  <Wrapper>
    <a className="join-button" href="#/hack.near/widget/DAO.Profile.Editor">
      Edit
    </a>
  </Wrapper>
) : (
  <Wrapper>
    <button className="join-button" onClick={handleProposal}>
      Connect
    </button>
  </Wrapper>
);
