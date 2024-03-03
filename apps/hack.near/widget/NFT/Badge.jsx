const accountId = props.accountId ?? "james.near";
const contractId = "nft.bluntdao.near";

const nftData = Near.view(contractId, "nft_supply_for_owner", {
  account_id: accountId,
});

if (nftData > 0) {
  return "🔥";
}
