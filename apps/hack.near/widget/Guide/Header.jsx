const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 48px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Item = styled.div``;

return (
  <div>
    <Wrapper>
      <Header>
        <H1>Guide for Hackers</H1>

        <Header>
          <a className="btn btn-primary" href="https://docs.near.org">
            NEAR Documentation
          </a>
          <a
            className="btn btn-outline-primary"
            href="https://banyan-collective.notion.site/LionHack-23-Hacker-Tool-Kit-641c4523e02748fb8451b08eebfcd43a"
          >
            Additional Resources
          </a>
        </Header>

        <Text>
          <h2>Learn to Earn</h2>

          <h5>
            <b>1.</b> Click "Start Here" below.
          </h5>
          <h5>
            <b>2.</b> Follow the instructions.
          </h5>
          <h5>
            <b>3.</b> Save your widget.
          </h5>
        </Text>

        <Header>
          <a
            className="btn btn-success"
            href="#/edit/hack.near/widget/ForkThis"
          >
            Start Here
          </a>
        </Header>

        <Text>
          <h3>Tutorial</h3>
        </Text>

        <Items>
          <Item>
            <Widget
              src="adminalpha.near/widget/ComponentCard"
              props={{ src: "hack.near/widget/ForkThis" }}
            />
          </Item>
        </Items>
      </Header>
    </Wrapper>
  </div>
);
