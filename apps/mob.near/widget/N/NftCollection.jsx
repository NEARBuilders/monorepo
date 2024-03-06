const accountId = props.accountId;
const contractId = props.contractId;

if (!contractId) {
  return `Missing prop "contractId"`;
}

if (!accountId) {
  return `Missing prop "accountId"`;
}

const nfts = Near.view(contractId, "nft_tokens_for_owner", {
  account_id: accountId,
  from_index: "0",
  limit: 200,
});

if (!nfts) {
  return "";
}

return (
  <>
    {nfts.map((nft, i) => (
      <Widget
        key={nft.token_id}
        loading=""
        src="mob.near/widget/NFT.Inner"
        props={{
          nft: { tokenId: nft.token_id, contractId },
        }}
      />
    ))}
  </>
);
