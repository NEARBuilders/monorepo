let totalComponents = 0;
const componentsData = Social.keys("*/widget/*", "final", {
  return_type: "BlockHeight",
});
if (componentsData) {
  Object.keys(componentsData).forEach((accountId) => {
    totalComponents += Object.keys(componentsData[accountId].widget).length;
  });
}

const ipfsImages = {
  logos: {
    team: "ipfs_id",
  },
};

const web3Teams = [
  {
    url: "https://creativesdao.org/",
    name: "Creatives DAO",
    ipfsImage: ipfsImages.logos.creativesdao,
  },
];

function returnIpfsImage(cfid) {
  return {
    ipfs_cid: cfid,
  };
}

const Wrapper = styled.div`
  --section-gap: 82px;
  padding-top: 100px;

  @media (max-width: 900px) {
    padding-top: 0;
  }
`;

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 90px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 0;
  max-width: 700px;

  span {
    display: inline-block;
    background: #00ec97;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
  }
`;

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;

const Flex = styled.div`
  display: flex;
  gap: ${(p) => p.gap};
  align-items: ${(p) => p.alignItems};
  justify-content: ${(p) => p.justifyContent};
  flex-direction: ${(p) => p.direction ?? "row"};
  flex-wrap: ${(p) => p.wrap ?? "nowrap"};

  ${(p) =>
    p.mobileStack &&
    `
    @media (max-width: 900px) {
      flex-direction: column;
      gap: var(--section-gap);
    }
  `}
`;

const Grid = styled.div`
  display: grid;
  gap: ${(p) => p.gap};
  grid-template-columns: ${(p) => p.columns};
  align-items: ${(p) => p.alignItems};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  position: relative;
  background-color: ${(p) => p.backgroundColor};
  padding: 208px 24px ${(p) => p.paddingBottom ?? "var(--section-gap)"};
  overflow: hidden;

  @media (max-width: 900px) {
    padding-top: var(--section-gap);
    padding-bottom: ${(p) => p.paddingBottomMobile ?? "var(--section-gap)"};
  }
`;

const SectionBgShape = styled.div`
  position: absolute;
  z-index: 0;
  inset: 0;
  overflow: hidden;

  svg {
    position: absolute;
    max-width: 80%;
    top: 0;
    left: -30px;
    width: 790px;

    @media (max-width: 900px) {
      max-width: 100%;
      width: 370px;
      top: 0;
      left: -40px;
    }
  }
`;

const SectionTitle = styled.div`
  position: relative;
  z-index: 15;
  display: inline-block;
  background: #fff;
  padding: 16px 42px;
  border-radius: 20px;
  align-self: ${(p) => (p.center ? "center" : undefined)};
  margin-left: ${(p) => (p.center ? "0px" : p.marginLeft)};

  @media (max-width: 1365px) {
    margin-left: ${(p) => (p.center ? "0px" : "-100px")};
  }

  @media (max-width: 1160px) {
    margin-left: 0;
  }

  @media (max-width: 900px) {
    margin-left: ${(p) => (p.center ? "0px" : "-42px")};
    margin-bottom: calc(var(--section-gap) * -0.5);

    h2 {
      font-size: 42px;
    }
  }
`;

const SectionContent = styled.div`
  position: relative;
  display: flex;
  gap: ${(p) => p.gap ?? "var(--section-gap)"};
  flex-direction: column;
  align-items: flex-start;
  z-index: 15;
  max-width: 790px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 900px) {
    h3 {
      font-size: 30px;
    }
  }
`;

const Container = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: ${(p) => p.gap ?? "var(--section-gap)"};
  flex-direction: column;
  align-items: ${(p) => (p.center ? "center" : undefined)};
  justify-content: ${(p) => (p.center ? "center" : undefined)};
  text-align: ${(p) => (p.center ? "center" : undefined)};
  padding: var(--section-gap) 24px;
`;

const LogoLinks = styled.div`
  display: flex;
  gap: 72px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;

  a {
    display: block;
    height: 24px;
    color: var(--sand10);

    img {
      display: block;
      height: 100%;
      margin: 0 auto;
    }
  }

  @media (max-width: 550px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;

    a {
      height: 20px;
    }
  }
`;

const IconAndContent = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-start;
  position: relative;

  svg {
    width: 48px;
    flex-shrink: 0;
    flex-grow: 0;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

return (
  <Wrapper>
    <Section backgroundColor="#fec804" paddingBottom="324px">
      <SectionBgShape>
        <svg viewBox="0 0 790 624" fill="none">
          <path
            d="M604 148C748.8 121.6 788.333 38.3333 790 0H2.99999C1.33332 157.333 -1.00001 479.4 2.99999 509C7.99999 546 54 624 164 624C274 624 304 507 307 380C310 253 423 181 604 148Z"
            fill="#FFDE65"
          />
        </svg>
      </SectionBgShape>

      <SectionContent>
        <SectionTitle center>
          <Text as="h2" size="72px" lineHeight="1" weight="500" color="#fec804">
            why
          </Text>
        </SectionTitle>

        <Flex
          direction="column"
          gap="24px"
          alignItems="center"
          style={{
            textAlign: "center",
            alignSelf: "center",
          }}
        >
          <Text as="h3" size="36px" lineHeight="1.2" weight="500">
            supporting creative communities around the world using blockchain
            technology
          </Text>
          <Text
            style={{ maxWidth: "414px", backgroundColor: "#17D9D4" }}
          ></Text>
        </Flex>
        <Widget src="hack.near/widget/dev.Badge" />
      </SectionContent>
    </Section>
  </Wrapper>
);
