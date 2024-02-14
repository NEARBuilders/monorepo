return {
    type: "app",
    routes: {
      main: {
        path: "apps.near/widget/root",
        blockHeight: "final",
        init: {
          name: "View",
        },
      },
      build: {
        path: "apps.near/widget/src",
        blockHeight: "final",
        init: {
          name: "Explore",
        },
      },
      social: {
        path: "apps.near/widget/feed",
        blockHeight: "final",
        init: {
          name: "Discuss",
        },
      },
      about: {
        path: "apps.near/widget/docs",
        blockHeight: "final",
        init: {
          name: "Learn",
        },
      },
    },
  };
  