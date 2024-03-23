const accountId = props.accountId ?? context.accountId;

const stars = Social.getr(`${accountId}/graph/star`, "final", {
  withBlockHeight: true,
});

const StorageKey = "order";
const order = Storage.privateGet(StorageKey);
const apps = useMemo(() => {
  if (stars === null || order === null) {
    return [];
  }
  const starredApps = new Map();
  const path = [];

  const buildSrc = (node) => {
    if (node.hasOwnProperty("")) {
      starredApps.set(path.join("/"), node[":block"]);
    }
    Object.entries(node).forEach(([key, value]) => {
      if (typeof value === "object") {
        path.push(key);
        buildSrc(value);
        path.pop();
      }
    });
  };

  buildSrc(stars ?? {}, [], starredApps);
  let apps = [...starredApps.entries()];
  apps.sort((a, b) => b[1] - a[1]);
  apps = apps.map((a) => a[0]);
  apps.sort((a, b) => (order?.[a] || 0) - (order?.[b] || 0));
  Storage.privateSet(
    StorageKey,
    Object.fromEntries(apps.map((a, i) => [a, i + 1]))
  );
  return apps;
}, [stars, order]);

const renderItem = (widgetSrc) => {
  const [accountId, _, widgetName] = widgetSrc.split("/");
  return (
    <a
      href={`https://near.social/${widgetSrc}`}
      target="_blank"
      className="text-decoration-none position-relative"
      key={widgetSrc}
      onClick={() => {
        order[widgetSrc] = -1;
        Storage.privateSet(StorageKey, order);
      }}
    >
      <Widget
        loading={
          <div
            className="placeholder d-inline-block rounded-3"
            style={{ width: "3em", height: "3em" }}
          />
        }
        src="mob.near/widget/WidgetImage"
        props={{
          tooltip: true,
          accountId,
          widgetName,
        }}
      />
    </a>
  );
};

const Container = styled.div`
  img {
    box-shadow: none !important;
  }
`;

return apps.length > 0 ? (
  <>
    <Container className="d-flex flex-wrap gap-2 placeholder-glow">
      {apps.slice(0, props.limit ? parseInt(props.limit) : 24).map(renderItem)}
    </Container>
  </>
) : (
  "No Starred Applications"
);
