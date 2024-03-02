const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to edit your profile";
}

let profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

State.init({
  profile,
});

const Wrapper = styled.div`
  #pills-tab,
  #pills-tabContent {
    display: none;
  }
`;

return (
  <Wrapper>
    <hr />
    <div>
      <h3>Edit Freelancer Profile</h3>
    </div>

    <div className="mb-3">
      <div>
        <Widget
          src="near/widget/AccountProfileCard"
          props={{ accountId, profile: state.profile }}
        />
      </div>
    </div>
    <div className="mb-3">
      <CommitButton data={{ profile: state.profile }}>
        Save Profile
      </CommitButton>
      <a
        className="btn btn-outline-primary ms-2"
        href={`#/near/widget/ProfilePage?accountId=${accountId}`}
      >
        View Profile
      </a>
    </div>
    <div className="mb-2">
      <Widget
        src="hack.near/widget/pro.metadata"
        props={{
          initialMetadata: profile,
          onChange: (profile) => State.update({ profile }),
          options: {
            name: { label: "Your Name" },
            location: {
              label: "Location: Where are you based?",
            },
            languages: { label: "Languages: Written and Spoken" },
            image: { label: "Picture" },
            description: {
              label: "Resume / Cover Letter",
            },
            tags: {
              label: "Skills",
              tagsPattern: "*/profile/tags/*",
              placeholder:
                "designer, marketing, community, translation, writing, dev, content-creator",
            },
            linktree: {
              links: [
                {
                  label: "Twitter",
                  prefix: "https://twitter.com/",
                  name: "twitter",
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
  </Wrapper>
);
