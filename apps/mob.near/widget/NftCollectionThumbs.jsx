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

const size = "3em";

return (
  <>
    {nfts.map((nft) => (
      <a
        className="text-decoration-none"
        href={`#mob.near/widget/NftImage?tokenId=${nft.token_id}&contractId=${contractId}`}
      >
        <Widget
          src="mob.near/widget/NftImage"
          props={{
            nft: { tokenId: nft.token_id, contractId },
            style: {
              width: size,
              height: size,
              objectFit: "cover",
              minWidth: size,
              minHeight: size,
              maxWidth: size,
              maxHeight: size,
              overflowWrap: "break-word",
            },
            thumbnail: "thumbnail",
            className: "",
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
            alt: `NFT ${contractId} ${nft.token_id}`,
          }}
        />
      </a>
    ))}
  </>
);
