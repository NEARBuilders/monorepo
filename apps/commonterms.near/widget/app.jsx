const { Layout } = VM.require("${config/account}/widget/components") || { // I like this, but it's very generic
  Layout: () => <></>,
};

const { Router } = VM.require("devs.near/widget/Router") || {
  Router: () => <></>
}

const { page, tab, ...passProps } = props;

const { routes } = {
  type: "app",
  routes: {
    home: {
      path: "${config/account}/widget/page.home",
      blockHeight: "final",
      init: {
        name: "Home",
      },
    },
    new: {
      path: "${config/account}/widget/page.new",
      blockHeight: "final",
      init: {
        name: "New",
      },
    },
    view: {
      path: "${config/account}/widget/page.view",
      blockHeight: "final",
      init: {
        name: "View",
      },
    },
    end: {
      path: "${config/account}/widget/page.end",
      blockHeight: "final",
      init: {
        name: "End",
      },
    },
  },
};

if (!page) page = Object.keys(routes)[0] || "home";

const CSS = styled.div`
  .container {
    border: 1px solid red;
  }
  
  .button {
    
  }
  
  .input {
  }
  
  .layout {
    border: 1px solid green;
  }
  
  .header {
    border: 1px solid blue;
  }
  
  .content {
  }

  .footer {
  }
`;

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

return (
  <CSS>
    <Container>
      <Layout
        variant="standard"
        blocks={{
          Header: () => ( // customize your header
            <Widget
              src="${config/account}/widget/components.Navbar"
              props={{ page, routes, ...props }}
            />
          ),
          Footer: () => <></>, // customize your footer
        }}
      >
        <Content>
          <Router active={page} routes={routes} routerParam="page" />
        </Content>
      </Layout>
    </Container>
  </CSS>
);