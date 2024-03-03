return (
  <div className="container">
    <div className="row mb-3">
      <div>
        <h1>Data Garden</h1>
        <h3>
          <b>Guide:</b> Open Web Data Widgets
        </h3>
        <p>
          We are cultivating helpful resources for Near Social developers to
          quickly and easily use both on-chain and off-chain data.
        </p>
      </div>
    </div>
    <div className="row mb-3">
      <div>
        <h2>Available Components</h2>
        <div className="mb-3">
          <a
            className="btn btn-outline-primary"
            href="https://near.social/#/y3k.near/widget/NEAR_Dashboard"
          >
            Dashboard
          </a>
          <a
            className="btn btn-outline-primary"
            href="https://near.social/#/denysk.near/widget/PriceStats"
          >
            Price Feed
          </a>
          <a
            className="btn btn-outline-primary"
            href="https://near.social/#/manzanal.near/widget/ValidatorsStakingVote"
          >
            Meta Pool Staking
          </a>
        </div>
        <div className="row">
          <div className="mb-3">
            <h3>Dashboard</h3>
            <Widget src="y3k.near/widget/MonthlyActiveAccounts" />
          </div>
          <div className="mb-3">
            <Widget src="davidweinstein.near/widget/MonthlyActiveAccounts" />
          </div>
          <div className="mb-3">
            <h3>Price Stats</h3>
            <Widget src="denysk.near/widget/PriceStats" />
          </div>
          <div className="mb-3">
            <h3>Staking</h3>
            <Widget src="manzanal.near/widget/ValidatorsStakingVote" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
