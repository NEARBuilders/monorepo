const image = props.image;
const className = props.className;
const style = props.style;
const alt = props.alt;
const fallbackUrl = props.fallbackUrl;
const thumbnail = props.thumbnail;

State.init({
  image,
});

if (JSON.stringify(image) !== JSON.stringify(state.image)) {
  State.update({
    image,
    imageUrl: null,
  });
}

function toUrl(image) {
  return (
    (image.ipfs_cid
      ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
      : image.url) || fallbackUrl
  );
}

const thumb = (imageUrl) =>
  thumbnail && imageUrl && !imageUrl.startsWith("data:image/")
    ? `https://i.near.social/${thumbnail}/${imageUrl}`
    : imageUrl;

return <p>Woohooo</p>;
