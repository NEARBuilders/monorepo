const { currentPath, page, ...passProps } = props;

const { Post } = VM.require("buildhub.near/widget/components") || {
  Post: () => <></>,
};

const routes = {
  all: {
    path: "hack.near/widget/feed",
    blockHeight: "final",
    init: {
      name: "Posts",
      icon: "bi-view-list",
      requiredHashtags: ["build"],
    },
  },
  tasks: {
    path: "hack.near/widget/feed",
    blockHeight: "final",
    init: {
      name: "Tasks",
      icon: "bi-clipboard",
      requiredHashtags: ["build", "task"],
      template: `### TASK NAME:
        ##### Scope
        Describe the work.

`,
    },
  },
  events: {
    path: "buildhub.near/widget/events.Calendar",
    blockHeight: "final",
    init: {
      name: "Events",
      icon: "bi-calendar3",
    },
  },
};

const { SidebarLayout } = VM.require("apps.near/widget/template.sidebar") || {
  SidebarLayout: () => <></>,
};

if (!page) page = Object.keys(routes)[0] || "main";

const Root = styled.div``;

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
      return <p>ERROR: NOTHING FOUND</p>;
    }
  }

  return (
    <div key={active}>
      <Widget src={src} props={{ ...passProps, ...defaultProps }} />
    </div>
  );
}

const Container = styled.div`
  // display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

return (
  <Root>
    <Container>
      <SidebarLayout currentPath={currentPath} page={page} routes={routes}>
        <Content>
          <Router active={page} routes={routes} />
        </Content>
      </SidebarLayout>
    </Container>
  </Root>
);
