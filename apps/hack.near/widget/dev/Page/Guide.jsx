const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 48px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #11181c;
  margin: 0;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
    color: #11181c;
  }

  &[href] {
    display: inline-flex;
    gap: 0.25rem;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const Button = styled.a`
  display: block;
  width: 100%;
  padding: 8px;
  height: 32px;
  background: #FBFCFD;
  border: 1px solid #D7DBDF;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #11181C !important;
  margin: 0;

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
    outline: none;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
`;

const Item = styled.div``;

return (
  <Wrapper>
    <Header>
      <Widget src="hack.near/widget/dev.Page.Header" />
    </Header>

    <Items>
      <h3>Create bOS Apps</h3>
      <Item>
        <Widget
          src="adminalpha.near/widget/ComponentCard"
          props={{ src: "hack.near/widget/Customization" }}
        />
      </Item>
      <Item>
        <Widget
          src="adminalpha.near/widget/ComponentCard"
          props={{ src: "hack.near/widget/SocialPosts" }}
        />
      </Item>
      <Item>
        <Widget
          src="adminalpha.near/widget/ComponentCard"
          props={{ src: "evrything-docs.near/widget/StartHere" }}
        />
      </Item>
    </Items>
  </Wrapper>
);
