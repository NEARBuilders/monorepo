const { title, description, small } = props;

const Container = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  h3,
  h4 {
    margin: 0 3px;
  }
  h3 {
    font-weight: 900;
  }
  .text-secondary {
    margin: 0 10px;
  }
  &.not-verified {
    h4 {
      font-size: 16px;
      margin: 0 0 5px 0;
      font-weight: 600;
    }
    h5 {
      margin: 0;
      font-size: 12px;
    }
  }
`;

const Participate = () => (
  <Container
    className={`not-verified d-flex ${
      small ? "flex-column" : "align-items-center justify-content-between"
    }`}
  >
    <div className={`${small ? "pb-3" : ""}`}>
      <h4>{title}</h4>
      <h5 className="text-secondary">{description}</h5>
    </div>
    <Widget src="hack.near/widget/start" />
  </Container>
);
return <Participate />;
