const accountId = props.accountId ?? context.accountId;

const limitForPosts = props.limitForPosts ?? 888;
initState({ widgetsByStars: [] });

const starredWidgets = Social.get(`${accountId}/index/star`);

const index = {
  action: "star",
  key: "dev",
  options: {
    subscribe: false,
    limit: limitForPosts,
    order: "desc",
  },
};

if (!state.stars) {
  State.update({
    stars: Social.index(index.action, index.key, index.options),
  });
  return "";
}

let widgetsByStars = [];
state.stars.map((star) => {
  const key = JSON.stringify(star.value.item);
  widgetsByStars[key] = (widgetsByStars[key] ?? 0) + 1;
});

const sortedPosts = Object.keys(widgetsByStars).sort(
  (a, b) => widgetsByStars[b] - widgetsByStars[a]
);

const topWidgets = sortedPosts.map((widgetStringified) => {
  const widget = JSON.parse(widgetStringified);
  return (
    <div style={{ paddingBottom: "10px" }}>
      <Widget
        src="hack.near/widget/dev.Widget.Card"
        props={{
          accountId: widget.path.replace("/widget/starred", ""),
          blockHeight: widget.blockHeight,
          rewidgetsNum: widgetsByStars[widgetStringified],
        }}
      />
    </div>
  );
});

return (
  <>
    <h1>Starred Widgets</h1>
    {topWidgets}
  </>
);
