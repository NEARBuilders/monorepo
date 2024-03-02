const ownerId = "hack.near";
const curatedComps = [
  {
    category: "Explore",
    id: "explore",
    icon: "bi-binoculars",
    components: [
      {
        accountId: "mob.near",
        widgetName: "Explorer",
      },
      { accountId: "efiz.near", widgetName: "Tree" },
    ],
  },
  {
    category: "Query API",
    icon: "bi-database",
    id: "query-api",
    components: [
      {
        accountId: "dataplatform.near",
        widgetName: "QueryApi.Dashboard",
      },
    ],
  },
  {
    category: "Dashboards",
    icon: "bi-bar-chart-line",
    id: "dashboards",
    components: [
      {
        accountId: "nearhorizon.near",
        widgetName: "Dashboard",
      },
      {
        accountId: "frichard5.near",
        widgetName: "SputnikBOS.Home",
      },
      {
        accountId:
          "28a944ad13408d15f15a04bb61e2b126a156472064c27df0da6f0cfe5ef29a14",
        widgetName: "Created_posts",
      },
      {
        accountId:
          "57842917f42b7c59125fa393e046d07a88f7e239c817395ebaebcd82e823cc97",
        widgetName: "most-accounts-followed",
      },
      {
        accountId: "y3k.near",
        widgetName: "widgets.external.statsOverview",
      },
    ],
  },
  {
    category: "Examples",
    id: "examples",
    icon: "bi-pie-chart",
    components: [
      { accountId: "y3k.near", widgetName: "pieChartSVG" },
      { accountId: "nui.sking.near", widgetName: "Data.Balances" },
      { accountId: "nui.sking.near", widgetName: "Data.ChartJs" },
      { accountId: "ostolex.near", widgetName: "near_radar" },
      { accountId: "sainthiago.near", widgetName: "your-stats" },
      {
        accountId:
          "0e7a82d0ef92b5559ef04df11f5de68ac4c4479319da5a72b3e2799c4717a422",
        widgetName: "QuickChart.io",
      },
      {
        accountId: "ndcplug.near",
        widgetName: "NDC.SBT.main",
      },
      {
        accountId: "y3k.near",
        widgetName: "NEAR_Dashboard",
      },
      {
        accountId: "opshenry.near",
        widgetName: "RankByFollowersList",
      },
      {
        accountId: "efiz.near",
        widgetName: "NYC.OpenData.Communities",
      },
    ],
  },
  {
    category: "Metadata",
    id: "metadata",
    icon: "bi-box-seam",
    components: [
      { accountId: "mob.near", widgetName: "MetadataEditor" },
      { accountId: "hack.near", widgetName: "DAO.Profile.Editor" },
    ],
  },
  {
    category: "Tools",
    id: "tools",
    icon: "bi-tools",
    components: [
      { accountId: "y3k.near", widgetName: "chartJsdelivr" },
      { accountId: "sainthiago.near", widgetName: "contract-stats" },
      { accountId: "manzanal.near", widgetName: "DateProgress" },
      { accountId: "efiz.near", widgetName: "Dashboard" },
    ],
  },
];
const filterTag = props.commonComponentTag ?? "data";
const debug = props.debug ?? false;

const searchComponents = () => {
  return (
    <div className="mb-3">
      <div className="mb-2">
        <Widget
          src="mob.near/widget/ComponentSearch"
          props={{
            boostedTag: "data",
            placeholder: "🔍 Search Applications",
            limit: 10,
            onChange: ({ result }) => {
              State.update({ apps: result });
            },
          }}
        />
      </div>
      {state.apps && (
        <div className="mb-2">
          {state.apps.map((app, i) => (
            <div key={i}>
              <Widget
                src="mob.near/widget/ComponentSearch.Item"
                props={{
                  link: `#/${app.widgetSrc}`,
                  accountId: app.accountId,
                  widgetName: app.widgetName,
                  onHide: () => State.update({ apps: null }),
                  extraButtons: ({ widgetPath }) => (
                    <a
                      target="_blank"
                      className="btn btn-outline-secondary"
                      href={`#/mob.near/widget/WidgetSource?src=${widgetPath}`}
                    >
                      Source
                    </a>
                  ),
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const renderCategory = (categoryId) => {
  if (!categoryId || categoryId === "") return <></>;
  const item = curatedComps.find((i) => i.id == categoryId);
  return (
    <div class="mt-3">
      <div class="text fs-5 text-muted mb-1" id={item.id}>
        {item.category}
      </div>
      <div class="border border-2 mb-4 rounded"></div>
      <div class="container">
        <div className="row ">
          {item.components.map((comp, i) => (
            <div class="mb-3">
              <Widget
                key={i}
                src="hack.near/widget/docs.card"
                props={{
                  accountId: comp.accountId,
                  widgetPath: `${comp.accountId}/widget/${comp.widgetName}`,
                  expanded: false,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
State.init({
  tab: "home",
  id: "",
});

const renderHome = () => {
  return (
    <>
      {searchComponents()}
      <div class="mt-2">
        <h4>Resources</h4>
        <p class="text text-muted ">
          Discover useful components and helpful examples.
        </p>
        <div className="mb-3">
          {curatedComps && (
            <div className="mb-3 m-3">
              {curatedComps.map((cat, i) => renderCategory(cat.id))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const onSelect = (selection) => {
  State.update({ tab: selection.tab, id: selection.id ? selection.id : "" });
};

const renderContent = {
  home: renderHome(),
  searchComponents: searchComponents(),
  category: renderCategory(state.id),
}[state.tab];

return (
  <>
    <div class="row">
      <div class="col-md-3">
        <Widget
          src={`hack.near/widget/data.menu`}
          props={{
            tab: state.tab,
            onSelect,
            navItems: curatedComps.map((i) => ({
              category: i.category,
              icon: i.icon,
              id: i.id,
            })),
          }}
        />
        <hr className="border-2" />
      </div>
      <div class="col-md-9">
        <div className="d-flex flex-wrap justify-content-between mb-3">
          <div className="m-1">
            <h2>
              <b>#data</b>
            </h2>
          </div>
          <div className="m-1">
            <a
              href={`#/near/widget/ProfilePage?accountId=every.near`}
              class="text-muted"
            >
              <Widget
                src="mob.near/widget/Profile"
                props={{ accountId: "build.sputnik-dao.near" }}
              />
            </a>
          </div>
        </div>
        <p class="text text-muted">
          Learn how to build on the blockchain operating system together!
        </p>
        {renderContent}
      </div>
    </div>
  </>
);
