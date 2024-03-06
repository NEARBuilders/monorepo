const accountId = context.accountId;

const accounts = Array.isArray(props.accounts)
  ? props.accounts
  : Object.keys(props.accounts || {}).reverse();
const limit = props.limit ?? 5;

const graphAccounts = [];
const nonGraph = [];

const graph =
  (accountId &&
    Social.keys(`${accountId}/graph/follow/*`, "final")[accountId].graph
      .follow) ||
  {};

accounts.forEach((accountId) => {
  if (accountId in graph) {
    graphAccounts.push(accountId);
  } else {
    nonGraph.push(accountId);
  }
});

let faces = [...graphAccounts, ...nonGraph];

const numAccounts = accounts.length;

const children = numAccounts;

return numAccounts > 0 ? (
  <Widget
    loading={children}
    src="mob.near/widget/N.Common.OverlayTrigger"
    props={{
      popup: (
        <div
          className="text-start overflow-hidden"
          style={{ maxWidth: "20em" }}
        >
          {faces.slice(0, limit).map((accountId, i) => (
            <Fragment key={i}>
              <Widget
                src="mob.near/widget/N.ProfileLine"
                props={{ accountId, link: false }}
              />
              <br />
            </Fragment>
          ))}
          {faces.length > limit ? "..." : ""}
        </div>
      ),
      children,
    }}
  />
) : (
  ""
);
