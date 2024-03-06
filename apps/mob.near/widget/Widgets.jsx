const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to view your widgets";
}

let data = Social.keys(`${accountId}/widget/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (!data) {
  return "Loading";
}

data = Object.entries(data[accountId].widget ?? {});
data.sort((a, b) => b[1] - a[1]);

const widgets = data.map((p, i) => {
  const src = `${accountId}/widget/${p[0]}`;
  return (
    <div key={i}>
      <li>
        <a href={`#/${src}`}>{p[0] || <i>Noname widget</i>}</a>
      </li>
    </div>
  );
});

return (
  <div className="col">
    <div className="card h-100">
      <div className="card-header">
        <Widget src="mob.near/widget/Profile" props={{ accountId }} />{" "}
      </div>
      <div className="card-body">{widgets}</div>
    </div>
  </div>
);
