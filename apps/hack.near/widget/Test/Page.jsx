const hashtag = props.hashtag ?? "near";

let keys = `${accountId ?? "*"}/widget/*`;

if (hashtag) {
  const taggedWidgets = Social.keys(
    `${accountId ?? "*"}/widget/*/metadata/tags/${hashtag}`,
    "final"
  );

  if (taggedWidgets === null) {
    return "Loading hashtags";
  }

  keys = Object.entries(taggedWidgets)
    .map((kv) => Object.keys(kv[1].widget).map((w) => `${kv[0]}/widget/${w}`))
    .flat();

  if (!keys.length) {
    return `No widgets found with tag: #${hashtag}`;
  }
}

const data = Social.keys(keys, "final", {
  return_type: "BlockHeight",
});

if (data === null) {
  return "Loading...";
}

const processData = (data) => {
  const accounts = Object.entries(data);

  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      return Object.entries(account[1].widget).map((kv) => ({
        accountId,
        widgetName: kv[0],
        blockHeight: kv[1],
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

const renderTag = (hashtag, tagBadge) => (
  <a href={makeLink(accountId, hashtag)}>{tagBadge}</a>
);

const renderItem = (a) => {
  return (
    <a
      href={`#/${a.accountId}/widget/${a.widgetName}`}
      className="text-decoration-none"
      key={JSON.stringify(a)}
    >
      <Widget
        src="mob.near/widget/WidgetImage"
        props={{
          tooltip: true,
          accountId: a.accountId,
          widgetName: a.widgetName,
        }}
      />
    </a>
  );
};

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}

return (
  <div>
    <h3>Widgets</h3>
    <div className="d-flex flex-wrap gap-1 my-3">
      {state.allItems
        .slice(0, props.limit ? parseInt(props.limit) : 999)
        .map(renderItem)}
    </div>
    <br />
    <h3>Posts</h3>
    <Widget src="hack.near/widget/Hashtag.Feed" props={{ hashtag: hashtag }} />
  </div>
);
