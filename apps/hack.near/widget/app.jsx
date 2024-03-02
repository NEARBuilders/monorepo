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

function AppLayout({ page, Header, Footer, children, ...props }) {
  return (
    <Container key={page}>
      <Header {...props} />
      <ContentContainer key={page}>{children}</ContentContainer>
      <Footer {...props} />
    </Container>
  );
}

return { AppLayout };
") || {
  AppLayout: () => <></>,
};

if (!page) page = Object.keys(routes)[0] || "main";

function Router({ active, routes }) {
  const routeParts = active.split(".");

  let currentRoute = routes;
  let src = "";
  let defaultProps = {};

  for (let part of routeParts) {
    if (currentRoute[part]) {
      currentRoute = currentRoute[part];
      src = currentRoute.path;

      if (currentRoute.init) {
        defaultProps = { ...defaultProps, ...currentRoute.init };
      }
    } else {
      return <p>NOTHING FOUND</p>;
    }
  }

  return (
    <div key={active}>
      <Widget
        src={src}
        props={{
          currentPath: `/hack.near/widget/app?page=${page}`,
          page: tab,
          ...passProps,
          ...defaultProps,
        }}
      />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

return (
  <Container>
    <AppLayout page={page} routes={routes} {...props}>
      <Content>
        <Router active={page} routes={routes} />
      </Content>
    </AppLayout>
  </Container>
);
