const accountId = "meta.sputnik-dao.near";

let profile = Social.getr(`${accountId}/profile`);

State.init({
  profile,
});

const handleSave = () => {
  Near.call([
    {
      contractName: "social.near",
      methodName: "set",
      args: {
        data: {
          [accountId]: {
            profile: state.profile,
          },
        },
      },
      deposit: "1",
    },
  ]);
};

return (
  <div className="row">
    <div className="col-lg-6">
      <div>
        <h4>Edit profile of @{accountId}</h4>
      </div>
      <div className="mb-2">
        <Widget
          src="mob.near/widget/MetadataEditor"
          props={{
            initialMetadata: profile,
            onChange: (profile) => State.update({ profile }),
            options: {
              name: { label: "Name" },
              image: { label: "Profile picture" },
              backgroundImage: { label: "Background image" },
              description: { label: "About" },
              tags: {
                label: "Tags",
                tagsPattern: "*/profile/tags/*",
                placeholder:
                  "rust, engineer, artist, humanguild, nft, learner, founder",
              },
              linktree: {
                links: [
                  {
                    label: "Twitter",
                    prefix: "https://twitter.com/",
                    name: "twitter",
                  },
                  {
                    label: "Github",
                    prefix: "https://github.com/",
                    name: "github",
                  },
                  {
                    label: "Telegram",
                    prefix: "https://t.me/",
                    name: "telegram",
                  },
                  {
                    label: "Website",
                    prefix: "https://",
                    name: "website",
                  },
                ],
              },
            },
          }}
        />
      </div>
      <div className="mb-2">
        <button onClick={handleSave}>Save profile</button>
        <a
          className="btn btn-outline-primary ms-2"
          href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
        >
          View profile
        </a>
      </div>
    </div>
    <div className="col-lg-6">
      <div>
        <Widget
          src="mob.near/widget/ProfilePage"
          props={{ accountId, profile: state.profile }}
        />
      </div>
    </div>
  </div>
);
