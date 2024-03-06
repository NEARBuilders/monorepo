const Button = styled.button`
  border: 0 !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  &:hover {
    color: DeepSkyBlue;
    background: rgba(0, 191, 255, 0.1);
  }
`;

return (
  <div className="d-inline-flex align-items-center">
    <Button
      disabled={!context.accountId}
      className="btn me-1"
      title={"Comment"}
      onClick={props.onClick}
    >
      <i className={`bi fs-4 bi-chat`} />
    </Button>
  </div>
);
