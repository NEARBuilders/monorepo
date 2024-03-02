const { Button } = VM.require("buildhub.near/widget/components");
const imageUrl =
  props.imageUrl ??
  JSON.stringify(state.image.url) ??
  "https://builders.mypinata.cloud/ipfs/QmQmKGGJXhkhGrTbE4MgJ3G1wUUu8eo7mNKwRSCB5tihCw";
const HeaderContainer = styled.div`
  width: 100%;
  position: relative;

  padding: 9.375rem 3rem;

  @media screen and (max-width: 768px) {
    padding: 9.375rem 1.5rem;
  }
`;

const Logo = styled.img`
height: 55px;
  object-fit: cover;
  margin: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  margin: 0 auto;
`;

return (
  <>
    <HeaderContainer>
      <Content>
        <Logo src={imageUrl} />
        <h3 style={{ fontFamily: "Courier" }}>
          <b>Construction Site</b>
        </h3>
        <Button variant="primary">
          <a
            style={{
              textDecoration: "none",
              color: "#000",
            }}
            href={props.buttonLink ?? "/hack.near/widget/app.create"}
          >
            <b>{props.buttonText ?? "BUILD"}</b>
          </a>
        </Button>
      </Content>
    </HeaderContainer>
    <Widget
      src="hack.near/widget/Footer"
      props={{ creatorId: props.accountId, appId: props.projectId }}
    />
  </>
);
