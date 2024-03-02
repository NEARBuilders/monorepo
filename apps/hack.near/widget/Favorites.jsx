// adapted from these widgets by mob.near
//
// - `StarredApps`
// - `WidgetMetadata`
// - `StarButton`

const accountId = props.accountId ?? context.accountId;

const votes = Social.getr(`${accountId}/graph/vote`, "final", {
  withBlockHeight: true,
});

const StorageKey = "order";
const order = Storage.privateGet(StorageKey);
const apps = useMemo(() => {
  if (votes === null || order === null) {
    return [];
  }
  const upvotedApps = new Map();
  const path = [];

  const buildSrc = (node) => {
    if (node.hasOwnProperty("")) {
      upvotedApps.set(path.join("/"), node[":block"]);
    }
    Object.entries(node).forEach(([key, value]) => {
      if (typeof value === "object") {
        path.push(key);
        buildSrc(value);
        path.pop();
      }
    });
  };

  buildSrc(votes ?? {}, [], upvotedApps);
  let apps = [...upvotedApps.entries()];
  apps.sort((a, b) => b[1] - a[1]);
  apps = apps.map((a) => a[0]);
  apps.sort((a, b) => (order?.[a] || 0) - (order?.[b] || 0));
  Storage.privateSet(
    StorageKey,
    Object.fromEntries(apps.map((a, i) => [a, i + 1]))
  );
  return apps;
}, [votes, order]);

const renderItem = (src) => {
  const [accountId, _, name] = src.split("/");
  return (
    <Widget
      src="hack.near/widget/WidgetCard"
      props={{
        tooltip: true,
        accountId,
        widgetName: name,
        widgetSrc: src,
      }}
    />
  );
};

return apps.length > 0 ? (
  <>{apps.slice(0, props.limit ? parseInt(props.limit) : 10).map(renderItem)}</>
) : (
  ""
);
