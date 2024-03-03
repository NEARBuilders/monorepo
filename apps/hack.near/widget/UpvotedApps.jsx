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

const renderItem = (widgetSrc) => {
  const [accountId, _, widgetName] = widgetSrc.split("/");
  return (
    <a
      href={`/${widgetSrc}`}
      className="text-decoration-none position-relative"
      key={widgetSrc}
      onClick={() => {
        order[widgetSrc] = -1;
        Storage.privateSet(StorageKey, order);
      }}
    >
      {voteFillSvg}
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

const voteFillSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#FFD700"
    stroke="#FFD700"
    strokeWidth="0.5"
    viewBox="-2 -2 20 20"
    style={{
      width: "1.25em",
      left: "0.2em",
      top: "0.2em",
      position: "absolute",
      translate: "-50% -50%",
    }}
  >
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
  </svg>
);

return apps.length > 0 ? (
  <>
    <div className="mb-2 pb-2" style={{ borderBottom: "1px dashed #eee" }}>
      <div className="d-flex flex-wrap gap-1 placeholder-glow">
        {apps
          .slice(0, props.limit ? parseInt(props.limit) : 24)
          .map(renderItem)}
      </div>
    </div>
  </>
) : (
  ""
);
