const accountId = props.accountId ?? context.accountId;

State.init({
  wallet: accountId ?? "",
  data: null,
});

const getBackgroundColor = (value, goodCondition, warningCondition) => {
  if (goodCondition(value)) return "lightgreen";
  if (warningCondition(value)) return "yellow";
  return "pink";
};

const handleWalletChange = (event) => {
  State.update({ wallet: event.target.value });
};

function fetchData() {
  console.log("getData");
  asyncFetch("https://auth.shard.dog/wallet/" + state.wallet, {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      State.update({ data: res.body });
    } else {
      console.log(res);
    }
  });
}

if (!state.data) {
  return (
    <div>
      <h3>NEAR "Just to get a rep"</h3>
      <small>
        <i>
          This is a beta of how you could look at scoring users rep based on
          activity
        </i>
      </small>
      <input
        value={state.wallet}
        onChange={handleWalletChange}
        placeholder="Enter wallet name"
      />
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
}

const {
  creationTimestamp,
  last30,
  stakeDeposit,
  functionCall,
  sbt,
  nftTokens,
  historicCount,
} = state.data;

const tableStyle = {
  border: "1px solid black",
  borderCollapse: "collapse",
  boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
  width: "80%",
  textAlign: "center",
};

const cellStyle = {
  border: "1px solid black",
  padding: "10px",
};

function getCreateDate(creationTimestamp) {
  console.log(creationTimestamp);
  let created = creationTimestamp / 1000000;
  console.log(created);
  let date = new Date(created);

  return date.toString("MMM dd yy");
}

return (
  <div
    style={{
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <h3>NEAR "Just to get a rep"</h3>
    <small>
      <i>
        This is a beta of how you could look at scoring users rep based on
        activity
      </i>
    </small>
    <input
      value={state.wallet}
      onChange={handleWalletChange}
      placeholder="Enter wallet name"
    />
    <button onClick={fetchData}>Fetch Data</button>
    <br />

    <table style={tableStyle}>
      <thead>
        <tr style={cellStyle}>
          <th>Criteria</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Account Created</td>
          <td>{getCreateDate(creationTimestamp)}</td>
        </tr>
        <tr
          style={{
            backgroundColor:
              last30 === historicCount || Math.abs(last30 - historicCount) <= 10
                ? "yellow"
                : "white",
          }}
        >
          <td>Tx - Last 30 days vs Historic</td>
          <td>
            {last30} vs {historicCount}
          </td>
        </tr>
        <tr
          style={{
            backgroundColor: getBackgroundColor(
              sbt,
              (v) => v > 0,
              (v) => v === 0
            ),
          }}
        >
          <td>SBT</td>
          <td>{sbt}</td>
        </tr>
        <tr
          style={{
            backgroundColor: getBackgroundColor(
              nftTokens,
              (v) => v > 5,
              (v) => v >= 1 && v <= 4
            ),
          }}
        >
          <td>NFT Tokens (max 100)</td>
          <td>{nftTokens}</td>
        </tr>
        <tr
          style={{
            backgroundColor: getBackgroundColor(
              stakeDeposit,
              (v) => v > 1,
              (v) => v === 1
            ),
          }}
        >
          <td>Stake Actions (max 50)</td>
          <td>{stakeDeposit}</td>
        </tr>
        <tr
          style={{
            backgroundColor: getBackgroundColor(
              functionCall,
              (v) => v > 20,
              (v) => v >= 6 && v <= 20
            ),
          }}
        >
          <td>Contract Interacts (max 50)</td>
          <td>{functionCall}</td>
        </tr>
      </tbody>
    </table>
  </div>
);
