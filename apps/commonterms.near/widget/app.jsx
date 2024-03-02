const config = {
  theme: {
    "--main-color": "blue",
    "--secondary-color": "red",
    background: "var(--main-color)",
    color: "var(--secondary-color)",
  },
  layout: {
    src: "commonterms.near/widget/components",
    // variant: "grid",
  },
  blocks: { // these get passed to the layout and children
    Header: () => (
      // customize your header
      <Widget
        src="commonterms.near/widget/components.Navbar"
        props={{ routes: config.router.routes, ...passProps }}
      />
    ),
    Footer: () => <></>, // customize your footer
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
