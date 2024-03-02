const accountId = context.accountId;

const custom = accountId
  ? Social.get(`${accountId}/settings/every/app/left/menu`)
  : undefined;

if (custom === null) {
  return "Loading";
}
const { requestSignIn, logOut, handleCloseMenu } = props;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 80%;
  max-width: 400px;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 60px;
  border: 1px solid #ccc;
`;

const Body = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
`;

const Button = styled.button``;

function upgrade() {
  Social.set({
    settings: {
      every: { app: { left: { menu: null } } },
    },
  });
}

if (custom) {
  return <Widget src={custom} props={props} />;
} else {
  return (
    <Container>
      <Header>
        <Button onClick={handleCloseMenu}>close</Button>
      </Header>
      <Body>
        <Button onClick={upgrade}>upgrade</Button>
      </Body>
      {accountId ? (
        <Button onClick={logOut}>log out</Button>
      ) : (
        <Button onClick={requestSignIn}>sign in</Button>
      )}
    </Container>
  );
}
