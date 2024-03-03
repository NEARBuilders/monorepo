const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

const { Button, Container } = VM.require(
  "${config/account}/widget/components"
) || {
  Button: () => <></>,
  Container: () => <></>,
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;

  margin: 0 auto;
`;

const NavLink = ({ children, to }) => {
  return (
    <Link
      key={to}
      to={href({
        widgetSrc: "${config/account}/widget/app",
        params: {
          page: to,
        },
      })}
    >
      {children}
    </Link>
  );
};

return (
  <Container>
    <Content>
      <NavLink to="new">
        <Button>New Game</Button>
      </NavLink>
      <NavLink to="view">
        <Button>View Game</Button>
      </NavLink>
    </Content>
  </Container>
);
