const componentsUrl = "#/near/widget/ComponentsPage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181c;
  margin: 0;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Item = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const TextLink = styled.a`
  color: #006adc;
  outline: none;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;

  &:hover,
  &:focus {
    color: #006adc;
    text-decoration: underline;
  }
`;

return (
  <Wrapper>
    <Header>
      <H2>Examples</H2>
      <TextLink href={componentsUrl}>View All</TextLink>
    </Header>

    <Items>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "devgovgigs.near/widget/Ideas" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "near/widget/ProfilePage" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "mob.near/widget/ProfilePage" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "hack.near/widget/communities" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "mob.near/widget/Explorer" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "hack.near/widget/ProfilePage" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "devs.near/widget/dev.community" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "nycdao.near/widget/nyc.dao" }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/ComponentCard"
          props={{ src: "hack.near/widget/Academy" }}
        />
      </Item>
    </Items>
  </Wrapper>
);
