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
        src="events.efiz.near/widget/components.Navbar"
        props={{ routes: config.router.routes, ...passProps }}
      />
    ),
    Footer: () => <></>, // customize your footer
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "events.efiz.near/widget/page.home",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
      metadata: {
        path: "events.efiz.near/widget/page.metadata",
        blockHeight: "final",
        init: {
          name: "Start",
        },
      },
      styles: {
        path: "events.efiz.near/widget/page.styles",
        blockHeight: "final",
        init: {
          name: "Styles",
        },
      },
      router: {
        path: "events.efiz.near/widget/page.router",
        blockHeight: "final",
        init: {
          name: "Features",
        },
      },
      button: {
        path: "events.efiz.near/widget/page.button",
        blockHeight: "final",
        init: {
          name: "Button",
        },
      },
      preview: {
        path: "events.efiz.near/widget/page.preview",
        blockHeight: "final",
        init: {
          name: "Preview",
          ...props,
        },
      },
      launch: {
        path: "events.efiz.near/widget/page.launch",
        blockHeight: "final",
        init: {
          name: "Launch",
          ...props,
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
