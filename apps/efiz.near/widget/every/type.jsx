const accountId = props.accountId;
const typeName = props.typeName || "type";
const tag = props.tag;
const metadataTemplate =
  props.metadataTemplate || "efiz.near/widget/every.type.metadata";

let keys = `${accountId ?? "*"}/${typeName}/*`;

if (tag) {
  const taggedWidgets = Social.keys(
    `${accountId ?? "*"}/${typeName}/*/metadata/tags/${tag}`,
    "final"
  );

  if (taggedWidgets === null) {
    return render("Loading tags");
  }

  keys = Object.entries(taggedWidgets)
    .map((kv) =>
      Object.keys(kv[1][typeName]).map((w) => `${kv[0]}/${typeName}/${w}`)
    )
    .flat();

  if (!keys.length) {
    return render(`No types found by tag #${tag}`);
  }
}

const data = Social.keys(keys, "final", {
  return_type: "BlockHeight",
  limit: 1,
});

if (data === null) {
  return <p>"Loading"</p>;
}

const processData = (data) => {
  const accounts = Object.entries(data);

  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      return Object.entries(account[1][typeName]).map((kv) => ({
        accountId,
        typeName: kv[0],
        blockHeight: kv[1],
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

const renderItem = (a) => {
  return (
    <div className="mb-3" key={JSON.stringify(a)} style={{ minHeight: "10em" }}>
      <Widget
        src="efiz.near/widget/every.type.metadata"
        props={{
          accountId: a.accountId,
          widgetName: a.typeName,
          blockHeight: a.blockHeight,
        }}
      />
    </div>
  );
};

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}

return (
  <div className="px-2 mx-auto">
    {(accountId || tag) && (
      <div className="mb-2">
        Filter:
        {accountId && (
          <a className="btn btn-outline-primary">
            <Widget
              src="mob.near/widget/ProfileLine"
              props={{ accountId, link: false }}
            />
            <i className="bi bi-x-square"></i>
          </a>
        )}
        {tag && (
          <a className="btn btn-outline-primary">
            <span className="badge text-bg-secondary">#{tag}</span>
            <i className="bi bi-x-square"></i>
          </a>
        )}
      </div>
    )}
    <Widget
      src="efiz.near/widget/ItemFeed"
      props={{ items: state.allItems || [], renderItem }}
    />
  </div>
);
