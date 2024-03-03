const image = props.image;
const title = props.title || "";
const className = props.className;
const style = props.style;
const alt = props.alt;
const fallbackUrl = props.fallbackUrl;
const thumbnail = props.thumbnail;

State.init({
  image,
  modalMediaUrl: null, // Rename to modalMediaUrl
  showModal: false,
});

if (JSON.stringify(image) !== JSON.stringify(state.image)) {
  State.update({
    image,
    imageUrl: null,
  });
}

const response = fetch(image.url, { method: "HEAD" });
if (!response) {
  return <p>Loading...</p>;
}
const contentType = response["contentType"];
const isVideo = contentType.startsWith("video/");

function toUrl(image) {
  const url =
    (image.ipfs_cid
      ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
      : image.url) || fallbackUrl;

  return url;
}

const thumb = (imageUrl) =>
  thumbnail && imageUrl && !imageUrl.startsWith("data:image/")
    ? `https://i.near.social/${thumbnail}/${imageUrl}`
    : imageUrl;

return image.nft.contractId && image.nft.tokenId ? (
  <Widget
    src="mob.near/widget/NftImage"
    props={{
      className,
      style,
      alt,
      nft: image.nft,
      thumbnail,
      fallbackUrl,
    }}
  />
) : (
  <>
    {isVideo ? (
      <video
        className={className}
        controls
        style={style}
        title={title}
        src={state.imageUrl ? thumb(state.imageUrl) : thumb(toUrl(image))}
      />
    ) : (
      <img
        className={className}
        title={title}
        onClick={() => {
          const mediaUrl = state.imageUrl
            ? thumb(state.imageUrl)
            : thumb(toUrl(image));
          State.update({
            modalMediaUrl: mediaUrl,
            showModal: true,
          });
        }}
        style={style}
        src={state.imageUrl ? thumb(state.imageUrl) : thumb(toUrl(image))}
        alt={alt}
        onError={() => {
          if (state.imageUrl !== fallbackUrl) {
            State.update({
              imageUrl: fallbackUrl,
            });
          }
        }}
      />
    )}
    {state.showModal && (
      <div
        className="modal fade show d-block"
        onClick={() => State.update({ showModal: false })}
        tabIndex="-1"
        role="dialog"
        aria-hidden={!state.showModal}
        style={{ backgroundColor: "rgba(0,0,0,0.8)" }} // Darkens the screen
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered" // Center the modal vertically
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body">
              {isVideo ? (
                <video
                  src={state.modalMediaUrl}
                  className="img-fluid"
                  controls
                />
              ) : (
                <img
                  src={state.modalMediaUrl}
                  className="img-fluid"
                  alt="Modal"
                  title={title}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
