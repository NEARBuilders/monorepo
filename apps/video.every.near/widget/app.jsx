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
        src="video.every.near/widget/App.Header"
        props={{ routes: config.router.routes, ...passProps }}
      />
    ),
    Footer: () => <></>, // customize your footer
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "video.every.near/widget/App.Video.browse",
        blockHeight: "final",
        init: {
          name: "Browse",
        },
        default: true,
      },
      create: {
        path: "video.every.near/widget/App.Video.create",
        blockHeight: "final",
        init: {
          name: "Create",
        },
      },
      view: {
        path: "video.every.near/widget/App.Video.create",
        blockHeight: "final",
        init: {
          name: "View",
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
