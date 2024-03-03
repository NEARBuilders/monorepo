const accountId = props.accountId ?? context.accountId;

const hiddenAccounts = Social.get(`${accountId}/graph/hide/*`, "final");

if (!hiddenAccounts) {
  return (
    <>
      <h1>Hidden Accounts</h1>
      <p>No hidden accounts found.</p>
    </>
  );
}

hiddenAccounts = hiddenAccounts && Object.keys(hiddenAccounts);

const [accounts, setAccounts] = useState(hiddenAccounts || []);

return (
  <>
    <h1>Hidden Accounts</h1>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
      }}
    >
      {
        accounts.length ? (
          <>
            {accounts.map((it) => (
              <div
                key={it}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Widget
                  src="mob.near/widget/ProfileLine"
                  props={{
                    accountId: it,
                    link: false,
                    hideAccountId: true,
                    hideImage: true,
                  }}
                />
                <button
                  className={"btn btn-outline-dark"}
                  onClick={() => {
                    Social.set({
                      graph: {
                        hide: {
                          [it]: null,
                        },
                      },
                      onCommit: () => {
                        setAccounts((prevAccounts) =>
                          prevAccounts.filter((acc) => acc !== it)
                        );
                      },
                    });
                  }}
                >
                  unhide
                </button>
              </div>
            ))}
          </>
        ) : null // Render nothing when accounts.length is 0
      }
    </div>
  </>
);
