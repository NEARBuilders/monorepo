if (!sender) {
  return (
    <div className="alert alert-warning rounded-4 mb-3">
      <div className="text-end">
        <div className="fw-bold">
          Connect Your Wallet
          <i class="fs-1 align-middle bi bi-arrow-up-right" />
        </div>
      </div>
    </div>
  );
}

const profile = Social.getr(`${sender}/profile`);

if (profile === null) {
  return "";
}

const name = profile.name;
const image = profile.image;

const editProfileButton = (
  <div>
    <a className="btn btn-success" href="#/hack.near/widget/ProfileEditor">
      Edit Profile
    </a>
  </div>
);

if (!name) {
  return (
    <div className="alert alert-warning rounded-4 mb-3">
      <p>Your profile is missing a name.</p>
      {editProfileButton}
    </div>
  );
}

if (
  !image.ipfs_cid &&
  (!image.nft.contractId || !image.nft.tokenId) &&
  !image.url
) {
  return (
    <div className="alert alert-warning rounded-4 mb-3">
      <p>Your profile is missing a picture.</p>
      {editProfileButton}
    </div>
  );
}

return <></>;
