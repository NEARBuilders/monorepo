const { Layout, Router } = VM.require("${config/account}/widget/components") || {
  Layout: () => <></>,
  Router: () => <></>,
};

const { page, tab, ...passProps } = props;

const { routes } = {
  type: "app",
  routes: {
    home: {
      path: "proofofvibes.near/widget/Vibes.DAO.main",
      blockHeight: "final",
      init: {
        name: "Home",
      },
    },
    people: {
      path: "nearefi.near/widget/ReFi.DAO.members",
      blockHeight: "final",
      init: {
        name: "People",
        daoId: "proofofvibes.sputnik-dao-near",
        humanRequiredForSbt: true,
        registry: "registry.i-am-human.near",
      },
    },
    places: {
      path: "efiz.near/widget/Mapbox",
      blockHeight: "final",
      init: {
        name: "Places",
      },
    },
    things: {
      path: "mintbase.near/widget/nft-marketplace",
      blockHeight: "final",
      init: {
        name: "Things",
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
          <Router active={page} routes={routes} />
        </Content>
      </Layout>
    </Container>
  </CSS>
);
