const accountId = props.debugAccountId ?? context.accountId;

if (!accountId) {
  return (
    <div className="alert alert-warning rounded-4 mb-3">
      <div className="text-end">
        <div className="fw-bold">
          Sign in by clicking
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{ accountId: "" }}
          />
          <i class="fs-1 align-middle bi bi-arrow-up-right" />
        </div>
      </div>
    </div>
  );
}

const profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "";
}

const name = profile.name;
const image = profile.image;

const editProfileButton = (
  <div>
    <a className="btn btn-success" href="#/mob.near/widget/ProfileEditor">
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

const dismissed = Storage.get("dismissed");
const defaultHomepage = "mob.near/widget/N";
const homepage = Social.get(`${accountId}/settings/near.social/homepage`);

if (homepage === null) {
  return "";
}

return !dismissed && homepage && homepage !== defaultHomepage ? (
  <div className="alert alert-info rounded-4 mb-3">
    <p>
      <b>Try new Near Social design</b>
    </p>
    <div>
      <img
        className="mw-100"
        style={{ maxHeight: "300px" }}
        src="https://ipfs.near.social/ipfs/bafkreicmkcqm64uikr2ilfcgrcpnv6rbnf6umeu6b3plzhvhvpnbqjvvii"
        alt="N Preview"
      />
    </div>
    <div className="mt-3">
      <CommitButton
        className="btn btn-primary rounded-5"
        data={{
          settings: {
            "near.social": {
              homepage: defaultHomepage,
            },
          },
        }}
      >
        Switch to new design
      </CommitButton>
      <button
        className="ms-3 btn btn-secondary rounded-5"
        onClick={() => {
          Storage.set("dismissed", true);
        }}
      >
        Dismiss
      </button>
    </div>
  </div>
) : (
  ""
);
