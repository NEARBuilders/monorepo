const aboutLinks = [
  {
    id: "Docs",
    title: "Docs",
    src: "https://docs.near.org",
    img: "https://i.near.social/magic/large/https://near.social/magic/img/account/academy.near",
  },
  {
    id: "Wiki",
    title: "Wiki",
    src: "https://wiki.near.org",
    img: "https://ipfs.io/ipfs/bafybeiegcxl662nreuyb4cfleo4hnj3kx27zqvysq3wpjy462kpcfjei3q/near-logo.png",
  },
];

const Small = styled.small`
  margin-top: 10px;
  font-weight: 333;
`;

const H6 = styled.h6`
  margin-top: 5px;
  margin-bottom: 0;
  text-decoration: none;
`;

const ImgContainer = styled.div`
  margin-right: 20px;
`;

const ItemContainer = styled.div`
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background: ${(props) => (props.selected ? "#A2D3F8" : "#fff")};
  color: ${(props) => (props.selected ? "white" : "inherit")};
  transition: background 0.3s; /* Add a smooth transition for the background */

  &:hover {
    background: #A2D3F8;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const LinkItem = ({ link }) => (
  <ItemContainer
    key={link.id}
    role="button"
    className="d-flex p-3 px-4 align-items-center mb-3 justify-content-between"
  >
    <StyledLink href={link.src} target="_blank">
      <div className="d-flex align-items-center">
        <ImgContainer>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: { url: link.img },
              alt: link.title,
              style: {
                height: "40px",
                objectFit: "cover",
                maxHeight: "40px",
                borderRadius: "50%",
              },
            }}
          />
        </ImgContainer>
        <H6>{link.title}</H6>
      </div>
    </StyledLink>
  </ItemContainer>
);

return (
  <div>
    {aboutLinks.map((link) => (
      <LinkItem key={link.id} link={link} />
    ))}
  </div>
);
