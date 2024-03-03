const thing = {
  metadata: {
    type: "every.near/type/app", // every.near/type/app
  },
  "": JSON.stringify({
    routes: {
      request: {
        path: "buildhub.near/widget/Feed",
        blockHeight: "final",
        init: {
          name: "Request",
          icon: "bi-file-earmark-text",
          requiredHashtags: ["build", "request"],
        },
      },
      proposals: {
        path: "buildhub.near/widget/Proposals",
        blockHeight: "final",
        init: {
          name: "Proposals",
          icon: "bi-file-earmark-text",
          daoId: "build.sputnik-dao.near",
        },
      },
    },
  }),
};

return <Widget src="every.near/widget/app" props={thing} />;
