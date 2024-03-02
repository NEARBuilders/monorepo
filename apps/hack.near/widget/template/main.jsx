const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = ({ page, routes, ...props }) => (
  <Widget src="hack.near/widget/Navbar" props={{ page, routes, ...props }} />
);

function AppLayout({ routes, page, children, ...props }) {
  return (
    <Container>
      <Header page={page} routes={routes} {...props} />
      <ContentContainer key={page}>{children}</ContentContainer>
    </Container>
  );
}

return { AppLayout };
