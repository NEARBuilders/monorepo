const { page, tab, layout, loading, twitter, github, telegram, ...passProps } =
  props;

const routes = props.routes ?? {
  main: {
    path: "hack.near/widget/events.view",
    blockHeight: "final",
    init: {
      name: "Events",
    },
  },
  about: {
    path: "hack.near/widget/page.about",
    blockHeight: "final",
    init: {
      name: "About",
    },
  },
  social: {
    path: "hack.near/widget/page.feed",
    blockHeight: "final",
    init: {
      name: "Discussion",
    },
  },
};

const { AppLayout } = VM.require("hack.near/widget/template.main") || {
  AppLayout: () => <>Layout loading...</>,
};

if (!page) page = "main";

const [activeRoute, setActiveRoute] = useState(page);

useEffect(() => {
  setActiveRoute(page);
}, [page]);

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
      return <p className="m-3">ERROR: NOTHING FOUND</p>;
    }
  }

  return (
    <div key={active}>
      <Widget
        src="hack.near/widget/thing"
        props={{ ...passProps, ...defaultProps, path: src, page: tab }}
      />
    </div>
  );
}

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 23px;
`;

return (
  <Container>
    <AppLayout page={activeRoute} routes={routes}>
      <Content>
        <Router active={activeRoute} routes={routes} />
      </Content>
      <Widget
        src="hack.near/widget/Footer"
        props={{ twitter, github, telegram }}
      />
    </AppLayout>
  </Container>
);
