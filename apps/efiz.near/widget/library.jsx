const data = props.data;
const ownerId = data.ownerId;
const categories = data.categories;
const filterTag = data.filterTag;

const searchComponents = () => {
  return (
    <div className="mb-3">
      <div className="mb-2">
        <Widget
          src="mob.near/widget/ComponentSearch"
          props={{
            boostedTag: filterTag,
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
  const category = categories.find((i) => i.id == categoryId);
  return (
    <div class="mt-3">
      <div class="text fs-5 text-muted mb-1" id={category.id}>
        {category.label}
      </div>
      <div class="border border-2 mb-4 rounded"></div>
      <div class="container">
        <div className="row ">
          {category.components &&
            category.components.map((comp, i) => {
              const parts = comp.split("/");
              return (
                <div class="mb-3">
                  <Widget
                    key={i}
                    src="hack.near/widget/docs.card"
                    props={{
                      accountId: parts[0],
                      widgetPath: comp,
                      expanded: false,
                    }}
                  />
                </div>
              );
            })}
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
          Test your knowledge and skills to earn an official builder badge by
          passing various levels of quizzes and solving fun code puzzles.
        </p>
        <div className="mb-3">
          {categories && (
            <div className="mb-3 m-3">
              {categories.map((cat, i) => renderCategory(cat.id))}
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
          src={`hack.near/widget/edu.navbar`}
          props={{
            tab: state.tab,
            onSelect,
            navItems:
              (categories &&
                categories.map((i) => ({
                  category: i.label,
                  icon: i.icon,
                  id: i.id,
                }))) ||
              [],
          }}
        />
        <hr className="border-2" />
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ authors: [ownerId], dep: true }}
        />
      </div>
      <div class="col-md-9">
        <div className="d-flex flex-wrap justify-content-between mb-3">
          <div className="m-1">
            <h2>
              <b>#{filterTag}</b>
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
