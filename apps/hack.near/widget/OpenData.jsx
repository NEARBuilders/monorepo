const ownerId = "hack.near";
const curatedComps = [
  {
    category: "NYC",
    id: "nyc",
    icon: "bi-building",
    components: [
      {
        accountId: "efiz.near",
        widgetName: "NYC.OpenData.Communities",
      },
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
          src={`hack.near/widget/OpenData.Menu`}
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
              <b>Open Data</b>
            </h2>
          </div>
          <div className="m-1">
            <a
              href={`#/near/widget/ProfilePage?accountId=every.near`}
              class="text-muted"
            >
              <Widget
                src="mob.near/widget/Profile"
                props={{ accountId: "liberty.sputnik-dao.near" }}
              />
            </a>
          </div>
        </div>
        <p class="text text-muted">
          The mission is to make data open and freely available, while
          protecting the rights of people and communities.
        </p>
        {renderContent}
      </div>
    </div>
  </>
);
