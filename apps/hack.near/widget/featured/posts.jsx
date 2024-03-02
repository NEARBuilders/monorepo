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
      <h3>Candidates</h3>
    </Header>

    <Items>
      <H2>AFRICA</H2>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "jeromemrys.near", blockHeight: 94344897 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "fatokunmayowa.near", blockHeight: 95012620 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "mrmoh.near", blockHeight: 95405581 }}
        />
      </Item>

      <H2>ASIA</H2>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "coineasydao.near", blockHeight: 94552554 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "harveys.near", blockHeight: 94819011 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "rileytran.near", blockHeight: 94851239 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "monish016.near", blockHeight: 95021235 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "nearlove.near", blockHeight: 95309607 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "rahulgoel.near", blockHeight: 95242325 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "sachinmurali03.near", blockHeight: 95399412 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "escobarindo.near", blockHeight: 95318546 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "dineshkruplani.near", blockHeight: 95335741 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "derymars.near", blockHeight: 95381654 }}
        />
      </Item>

      <H2>EUROPE</H2>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "ananastya.near", blockHeight: 94866343 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "kiskesis.near", blockHeight: 94484171 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "kemo.near", blockHeight: 95082496 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "bjirken.near", blockHeight: 95409527 }}
        />
      </Item>

      <H2>NORTH AMERICA</H2>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "izcc.near", blockHeight: 95327942 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "nneoma.near", blockHeight: 95351465 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "sirs.near", blockHeight: 95409155 }}
        />
      </Item>

      <H2>SOUTH AMERICA</H2>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "vianftbrasil.near", blockHeight: 94928200 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "frado.near", blockHeight: 95426622 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "fritzwagner.near", blockHeight: 95118357 }}
        />
      </Item>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "johanga108.near", blockHeight: 94544303 }}
        />
      </Item>

      <H2>AUSTRALIA</H2>
      <Item>
        <Widget
          src="near/widget/Posts.Post"
          props={{ accountId: "alejandro.near", blockHeight: 95415438 }}
        />
      </Item>
    </Items>
  </Wrapper>
);
