const src = props.src ?? "hack.near/widget/Academy";
const primaryAction = props.primaryAction || "viewDetails";
const [accountId, type, name] = src.split("/");
const data = Social.get(`${accountId}/${type}/${name}/metadata/**`);
const metadata = data || {};
const tags = Object.keys(metadata.tags || {});
const appUrl = `#/${src}`;
const detailsUrl = `#/hack.near/widget/GitBos?src=${src}`;
const shareUrl = `https://near.org${detailsUrl}`;
const size = props.size || "large";

State.init({
  copiedShareUrl: false,
});

const sizes = {
  medium: {
    gap: "16px",
    thumbnail: "56px",
    title: "16px",
  },
  large: {
    gap: "16px",
    thumbnail: "100px",
    title: "32px",
  },
};

const Wrapper = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => sizes[p.size].gap};
  margin-bottom: 32px;

  > * {
    min-width: 0;
  }

  @media (max-width: 770px) {
    gap: 16px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TagsWrapper = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: ${(p) => sizes[p.size].title};
  line-height: 1.2em;
  color: #11181c;
  margin: 0 0 8px;
  font-weight: 600;

  @media (max-width: 770px) {
    font-size: 16px;
    margin: 0;
  }
`;

const Thumbnail = styled.div`
  width: ${(p) => sizes[p.size].thumbnail};
  height: ${(p) => sizes[p.size].thumbnail};
  flex-shrink: 0;
  border: 1px solid #eceef0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 770px) {
    width: 58px;
    height: 58px;
  }
`;

const Button = styled.button`
  ${sharedButtonStyles}
  color: ${(p) => (p.primary ? "#09342E" : "#11181C")} !important;
  background: ${(p) => (p.primary ? "#59E692" : "#FBFCFD")};
  border: ${(p) => (p.primary ? "none" : "1px solid #D7DBDF")};

  &:hover,
  &:focus {
    background: ${(p) => (p.primary ? "rgb(112 242 164)" : "#ECEDEE")};
  }
`;

const ButtonLink = styled.a`
  ${sharedButtonStyles}
  color: ${(p) => (p.primary ? "#09342E" : "#11181C")} !important;
  background: ${(p) => (p.primary ? "#59E692" : "#FBFCFD")};
  border: ${(p) => (p.primary ? "none" : "1px solid #D7DBDF")};

  &:hover,
  &:focus {
    background: ${(p) => (p.primary ? "rgb(112 242 164)" : "#ECEDEE")};
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};

  i {
    margin-right: 4px;
  }
`;

return (
  <Wrapper>
    <Row>
      <Header size={size}>
        <Thumbnail size={size}>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: metadata.image,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreifc4burlk35hxom3klq4mysmslfirj7slueenbj7ddwg7pc6ixomu",
              alt: metadata.name,
            }}
          />
        </Thumbnail>
        <div>
          <Title size={size}>{metadata.name || name}</Title>
          <Text ellipsis>{src}</Text>
        </div>
      </Header>
      <Header size={size}>
        {context.accountId !== accountId && (
          <Widget
            src="hack.near/widget/ForkButton"
            props={{
              accountId,
              type,
              name,
            }}
          />
        )}
      </Header>
    </Row>

    {tags.length > 0 && (
      <TagsWrapper>
        <Widget
          src="near/widget/Tags"
          props={{
            tags,
          }}
        />
      </TagsWrapper>
    )}
  </Wrapper>
);
