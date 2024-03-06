let accountId = props.accountId ?? context.accountId;

const profile = Social.getr(`${accountId}/profile`);

const name = profile.name || "No-name profile";
const image = profile.image;
const url =
  (image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

return (
  <div
    className="profile-circle d-inline-block  me-2"
    title={`${name} @${accountId}`}
    style={{ width: "3em", height: "3em" }}
  >
    <img
      className="rounded-circle w-100 h-100"
      style={{ objectFit: "cover" }}
      src={`https://i.near.social/thumbnail/${url}`}
      alt="profile image"
    />
  </div>
);
