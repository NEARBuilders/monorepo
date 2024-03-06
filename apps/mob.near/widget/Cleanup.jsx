const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

State.init({
  selectedKeys: {},
  nonce: 0,
});

const value = Social.getr(accountId, undefined, {
  nonce: state.nonce,
});

const extractKeys = (data, prefix) =>
  Object.entries(data)
    .map((kv) =>
      typeof kv[1] === "string"
        ? { key: `${prefix}${kv[0]}`, value: kv[1] }
        : extractKeys(kv[1], `${prefix}${kv[0]}/`)
    )
    .flat();

const kvs = extractKeys(value || {}, "");
kvs.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key));

const hasKey = (key) => {
  let t = state.selectedKeys;
  key.split("/").forEach((k) => {
    t = t[k];
  });
  return t === null;
};

const onSelect = (key) => {
  const val = hasKey(key) ? undefined : null;
  let t = state.selectedKeys;
  const path = key.split("/");
  path.slice(0, -1).forEach((k) => {
    t[k] = t[k] || {};
    t = t[k];
  });
  t[path[path.length - 1]] = val;
  State.update();
};

return (
  <div>
    <h4>Select keys to delete</h4>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>X</th>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {kvs.map((kv) => {
          return (
            <tr>
              <td>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={hasKey(kv.key)}
                  onChange={() => onSelect(kv.key)}
                />
              </td>
              <td className="text-truncate font-monospace">{kv.key}</td>
              <td className="text-truncate font-monospace">{kv.value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <div>
      <CommitButton
        data={state.selectedKeys}
        disabled={Object.keys(state.selectedKeys).length === 0}
        onCommit={() =>
          State.update({ selectedKeys: {}, nonce: state.nonce + 1 })
        }
      >
        Delete selected keys
      </CommitButton>
    </div>
  </div>
);
