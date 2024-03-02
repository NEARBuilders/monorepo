const config = {
  theme: {
    // add key values to define colors
    // "--main-color": "blue",
    // "--secondary-color": "red",
    // background: "var(--main-color)",
    // color: "var(--secondary-color)",
  },
  layout: {
    src: "devs.near/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    // these get passed to the layout and children
    Header: () => (
      // customize your header
      <Widget
        src="${config/account}/widget/components.Navbar"
        props={{ routes: config.router.routes, ...passProps }}
      />
    ),
    Footer: () => (
      <>
        <button onClick={() => console.log("create")}>create</button>
      </>
    ), // customize your footer
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "${config/account}/widget/page.home",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
      metadata: {
        path: "${config/account}/widget/page.metadata",
        blockHeight: "final",
        init: {
          name: "Metadata",
        },
      },
      styles: {
        path: "${config/account}/widget/page.styles",
        blockHeight: "final",
        init: {
          name: "Styles",
        },
      },
      features: {
        path: "${config/account}/widget/page.features",
        blockHeight: "final",
        init: {
          name: "Features",
        },
      },
      button: {
        path: "${config/account}/widget/page.button",
        blockHeight: "final",
        init: {
          name: "Button",
        },
      },
      preview: {
        path: "${config/account}/widget/page.preview",
        blockHeight: "final",
        init: {
          name: "Preview",
        },
      },
    },
  },
};

const Root = styled.div`
  // you can override classnames here
`;

return (
  <Root>
    <Widget src="every.near/widget/app.view" props={{ config, ...props }} />
  </Root>
);
