const data = props.data;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const Logo = styled.img`
  height: 100%
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  gap: 8px;
  background-color: black;
`;

const Button = styled.button`
  display: flex;
  background-color: #FFD50D;
  padding: 8px 20px;
  border-radius: 10px;
  border: none;
  gap: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

function Content() {
  if (state.thingSrc) {
    return (
      <>
        <Widget
          src={"efiz.near/widget/Every.Thing.View"}
          props={{ path: state.thingSrc }}
        />
      </>
    );
  }
}

return (
  <Container>
    <Widget
      src="efiz.near/widget/marquee"
      props={{
        text: "Join the Movement",
      }}
    />
    <Header>
      <Logo
        src={
          "https://ipfs.near.social/ipfs/bafkreie6esjs3h2bdwrvwdt4zksk3nzfqdds3waej5solgh3vk6a7dm7ly"
        }
      />
    </Header>
    <Navigation>
      {data &&
        data.views?.map((view) => (
          <Button onClick={() => State.update({ thingSrc: view.src })}>
            {view.name}
          </Button>
        ))}
    </Navigation>
    <Content />
  </Container>
);
