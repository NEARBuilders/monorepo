const accountId = props.accountId || context.accountId;
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
      <a
        key={i}
        className="text-decoration-none"
        href={`#mob.near/widget/NftImage?tokenId=${nft.token_id}&contractId=${contractId}`}
      >
        <Widget
          src="mob.near/widget/NftImage"
          props={{
            nft: { tokenId: nft.token_id, contractId },
            style: {
              width: "10em",
              height: "10em",
              objectFit: "cover",
              minWidth: "10em",
              minHeight: "10em",
              maxWidth: "10em",
              maxHeight: "10em",
              overflowWrap: "break-word",
            },
            className: "img-thumbnail",
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
            alt: `NFT ${contractId} ${nft.token_id}`,
          }}
        />
      </a>
    ))}
  </>
);
