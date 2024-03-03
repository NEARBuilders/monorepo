const data = Social.keys("*/profile", "final");

if (!data) {
  return "Loading...";
}

const accounts = Object.entries(data);
const holderData = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];

  const nftData = Near.view("mint.sharddog.near", "nft_supply_for_owner", {
    account_id: accountId,
  });

  if (nftData && nftData > 0) {
    holderData.push({ accountId, nftData });
  }
}

holderData.sort((a, b) => b.nftData - a.nftData);

const holderProfiles = holderData.map((holder, index) => (
  <div className="mb-2" key={holder.accountId}>
    <h5 className="m-3">
      <b>Rank {index + 1}:</b> Minted {holder.nftData}
    </h5>
    <Widget
      src="near/widget/AccountProfileCard"
      props={{ accountId: holder.accountId }}
    />
  </div>
));

return (
  <>
    <h3 className="m-3">ShardDog NFT Holders</h3>
    <h5 className="m-3">
      <i>{holderProfiles.length} Total</i>
    </h5>
    <div className="m-3">{holderProfiles}</div>
  </>
);
