const path = props.path;
const blockHeight = props.blockHeight;

const thing = JSON.parse(Social.get(path, blockHeight) || "null");

if (!thing) {
  return <></>;
}

const Card = styled.div`
  background-color: white;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  overflow: hidden;
  width: 15rem;  /* you can adjust as needed */
  height: 15rem; /* you can adjust as needed */
`;

const ImageContainer = styled.div`
  padding: 0.5rem 1rem 0 1rem;
  background-color: #343a40;
  position: relative;
`;

const ProfilePictureContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  transform: translateY(1rem);
`;

const ContentContainer = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LinkText = styled.a`
  text-overflow: ellipsis;
  overflow: hidden;
  color: black;
`;

const NameHeader = styled.h4`
  margin-top: 0.5rem; /* Add some space between image and text */
  margin-bottom: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

function Edge({ thing }) {
  console.log(thing);
  const data = thing.data;
  const type = thing.type;
  const name = data.name;
  const image = data.logo;
  const backgroundImage = data.background;

  return (
    <Card>
      <ImageContainer>
        {backgroundImage && (
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: backgroundImage,
              alt: "profile background",
              className: "position-absolute w-100 h-100",
              style: { objectFit: "cover", left: 0, top: 0 },
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
            }}
          />
        )}
        <ProfilePictureContainer>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: image,
              style: { width: "10rem", height: "10rem" },
              className: "rounded-circle img-thumbnail d-block mb-2",
            }}
          />
        </ProfilePictureContainer>
      </ImageContainer>
      <ContentContainer>
        <HeaderContainer>
          {link ? (
            <LinkText href={link}>
              <NameHeader>{name}</NameHeader>
            </LinkText>
          ) : (
            <NameHeader>{name}</NameHeader>
          )}
        </HeaderContainer>
      </ContentContainer>
    </Card>
  );
}

return (
  <Link
    to={`/${path}`}
    style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
  >
    <Edge thing={thing} />
  </Link>
);
