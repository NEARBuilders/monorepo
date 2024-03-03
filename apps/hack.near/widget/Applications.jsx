return (
  <div>
    <h5>Applications</h5>
    <div className="mb-2">
      <Widget
        src="mob.near/widget/ComponentSearch"
        props={{
          boostedTag: "app",
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

    <Widget
      src="mob.near/widget/WidgetIcons"
      props={{ tag: "app", limit: 333 }}
    />
    <h3>#Template</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "template" }} />
    <h3>#Data</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "data" }} />
    <h3>#Dev</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "dev" }} />
    <h3>#Social</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "social" }} />
    <h3>#Widget</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "widget" }} />
    <h3>#Page</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "page" }} />
    <h3>#Feed</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "feed" }} />
    <h3>#Inline</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "inline" }} />
    <h3>#Component</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "component" }} />
    <h3>#NFT</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "nft" }} />
    <h3>#Search</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "search" }} />
    <h3>#Editor</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "editor" }} />
    <h3>#Game</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "game" }} />
    <h3>#Hack</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "hack" }} />
    <h3>#Example</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "example" }} />
    <h3>#Settings</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "settings" }} />
    <h3>#Explorer</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "explorer" }} />
    <h3>#Profile</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "profile" }} />
  </div>
);
