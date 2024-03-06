return (
  <div>
    <div className="mb-2">
      <Widget
        src="mob.near/widget/ComponentSearch"
        props={{
          limit: 10,
          term: state.term,
          onChange: ({ result: components, term }) =>
            State.update({ components, term }),
        }}
      />
    </div>
    {state.components && state.components.length > 0 && (
      <div className="mb-2">
        {state.components.map((component, i) => (
          <div key={i}>
            <Widget
              src="mob.near/widget/Editor.ComponentSearch.Item"
              props={{
                accountId: component.accountId,
                widgetName: component.widgetName,
                onEmbed: () => State.update({ components: null }),
                onHide: () => State.update({ components: null }),
                extraButtons: props.extraButtons,
              }}
            />
          </div>
        ))}
      </div>
    )}
  </div>
);
