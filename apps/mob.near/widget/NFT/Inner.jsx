const nft = props.nft ?? {
  contractId: props.contractId,
  tokenId: props.tokenId,
};

const nftMetadata = Near.view(nft.contractId, "nft_metadata");
const token = Near.view(nft.contractId, "nft_token", {
  token_id: nft.tokenId,
});
const tokenMetadata = token.metadata;

const [imageUrl, setImageUrl] = useState(null);

useEffect(() => {
  setImageUrl(
    `https://i.near.social/magic/${
      thumbnail || "large"
    }/https://near.social/magic/img/nft/${nft.contractId}/${nft.tokenId}`
  );
}, [nft]);

return (
  <div className="nft-card">
    <div className="nft-image-wrapper">
      <img
        className="nft-image"
        loading="lazy"
        src={imageUrl}
        onError={() => {
          if (imageUrl && !imageUrl.includes("?")) {
            console.log(
              `Retying load image NFT ${nft.contractId}/${nft.tokenId} in 15 seconds`
            );
            setTimeout(() => {
              setImageUrl(imageUrl + "?retry");
            }, 15 * 1000);
          }
        }}
        alt={`${nft.contractId}/${nft.tokenId}`}
      />
    </div>
    <div className="nft-text">
      <div className="nft-title">{tokenMetadata.title || nft.tokenId}</div>
      <div className="nft-description">{tokenMetadata.description}</div>
    </div>
  </div>
);
