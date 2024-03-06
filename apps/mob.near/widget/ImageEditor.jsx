const image = props.image;
const onChange = props.onChange;

if (JSON.stringify(image) !== JSON.stringify(state.image)) {
  State.update({
    image,
    url: image.url,
    nft: image.nft ?? {},
    img: { cid: image.ipfs_cid },
  });
}

let localImage = {};

if (state.nft.contractId || state.nft.tokenId) {
  localImage.nft = state.nft;
}
if (state.img.cid) {
  localImage.ipfs_cid = state.img.cid;
}
if (state.url) {
  localImage.url = state.url;
}

if (onChange && JSON.stringify(image) !== JSON.stringify(localImage)) {
  onChange(localImage);
}

return (
  <div>
    <div className="mb-2">
      Upload or choose an NFT
      <br />
      <IpfsImageUpload image={state.img} />
    </div>
    <div className="mb-2">
      NFT contract
      <input type="text" value={state.nft.contractId} />
      NFT token id
      <input type="text" value={state.nft.tokenId} />
    </div>
    {!state.img.cid && !localImage.nft && state.url && (
      <div className="mb-2">
        Image URL
        <input type="text" value={state.url} />
      </div>
    )}
  </div>
);
