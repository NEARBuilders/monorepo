const { tab } = props;
const data = {
  index: "efiz.near/widget/index",
  routes: [
    {
      title: "Home",
      icon: "bi bi-house-door",
      handle: "home",
      widgetSrc: "astro.sking.near/widget/home",
    },
    [
      {
        title: "DAOs",
        icon: "bi bi-grid",
        handle: "daos-all",
        widgetSrc: "astro.sking.near/widget/DAOs.index",
        defaultProps: {},
      },
      {
        title: "NDC",
        handle: "daos-ndc",
        widgetSrc: "astro.sking.near/widget/DAOs.index",
        defaultProps: {},
      },
      {
        title: "Following",
        handle: "daos-following",
        widgetSrc: "astro.sking.near/widget/DAOs.index",
        defaultProps: {},
      },
      {
        title: "All",
        handle: "daos-all",
        widgetSrc: "astro.sking.near/widget/DAOs.index",
        defaultProps: {},
      },
    ],
    {
      title: "Bounties area",
      icon: "bi bi-briefcase",
      handle: "bounties",
      widgetSrc: "astro.sking.near/widget/bounties",
      defaultProps: {},
    },
    {
      title: "Actions library",
      icon: "bi bi-code-slash",
      handle: "actions",
      widgetSrc: "astro.sking.near/widget/actions",
      defaultProps: {},
    },
    {
      title: "Create DAO",
      handle: "create-dao",
      widgetSrc: "astro.sking.near/widget/CreateDAO.index",
      defaultProps: {},
      hidden: true,
    },
  ],
};

return (
  <Widget
    src={data.index}
    props={{ routes: data.routes, index: "efiz.near/widget/app", tab }}
  />
);
