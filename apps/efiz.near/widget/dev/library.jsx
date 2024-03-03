const ownerId = "manzanal.near";
const accountId = props.accountId ?? context.accountId;

const data = props.data;

const filterTag = props.commonComponentTag ?? "dev";
const debug = props.debug ?? false;

const searchComponents = () => {
  return (
    <div class="mb-4">
      <div className="mb-2">
        <Widget
          src="mob.near/widget/ComponentSearch"
          props={{
            debug: debug,
            filterTag: filterTag,
            placeholder: "🔍 Search for common components",
            limit: 24,
            onChange: ({ result }) => {
              State.update({ components: result });
            },
          }}
        />
      </div>
      {state.components && (
        <div className="mb-2">
          {state.components?.map((comp, i) => {
            const parts = comp.split("/");
            return (
              <div class="mb-2" key={i}>
                <Widget
                  src="mob.near/widget/WidgetMetadata"
                  props={{
                    accountId: parts[0],
                    widgetName: parts[2],
                    expanded: false,
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const renderCategory = (categoryId) => {
  if (!categoryId || categoryId === "") return <></>;
  const item = data.categories?.find((i) => i.id == categoryId);
  return (
    <div class="mt-3">
      <div class="text fs-5 text-muted mb-1" id={item.id}>
        {item.label}
      </div>
      <div class="border border-2 mb-4 rounded"></div>
      <div class="container">
        <div className="row ">
          {item.components.map((comp, i) => {
            const parts = comp.split("/");
            return (
              <div class="col-6 mb-2">
                <Widget
                  key={i}
                  src="mob.near/widget/WidgetMetadata"
                  props={{
                    accountId: parts[0],
                    widgetName: parts[2],
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
        <h4>Gallery</h4>
        <p class="text text-muted ">
          A curated list of common components grouped by categories.
        </p>
        <div className="mb-3">
          {data.categories && (
            <div className="mb-6">
              {data.categories.map((cat, i) => renderCategory(cat.id))}
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
          src="hack.near/widget/CommonComponentsLibrary.Navbar"
          props={{
            tab: state.tab,
            onSelect,
            navItems: data.categories?.map((i) => ({
              id: i.id,
              category: i.label,
              icon: i.icon,
            })),
          }}
        />
        <hr className="border-2" />
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ authors: [ownerId], dep: true }}
        />
      </div>
      <div class="col-md-9">
        {" "}
        <h2>Components Library</h2>
        <p class="text text-muted">
          Building blocks for Near Social applications.
        </p>
        {renderContent}
      </div>
    </div>
  </>
);
