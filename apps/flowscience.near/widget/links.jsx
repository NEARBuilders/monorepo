const loggedIn = context.accountId ? props.loggedIn ?? false : false;

const accountId = loggedIn
  ? context.accountId ?? "flowscience.near"
  : props.accountId ?? "flowscience.near";

const theme = props.theme ?? "default"; // will add themes later

State.init({
  copiedShareUrl: false,
  hasBeenFlagged: false,
  theme: theme,
});
const profile =
  props.profile || Social.get(`${accountId}/profile/**`, "final") || {};
const profileUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;

if (!accountId) {
  return "";
}

const profile1 = {
  avatar:
    "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  title: "Zahid Islam",
  subtitle: "Data Engineer",
  links: [
    { title: "github", url: "https://github.com/zahid-dev" },
    { title: "twitter", url: "https://twitter.com/zahid-dev" },
  ],
  socials: [
    { title: "github", url: "https://github.com/zahid-dev" },
    { title: "twitter", url: "https://twitter.com/zahid-dev" },
  ],
};

const titleToIcon = [
  {
    title: "github",
    icon: <i class="bi bi-github"></i>,
  },
  {
    title: "twitter",
    icon: <i class="bi bi-twitter"></i>,
  },
  {
    title: "facebook",
    icon: <i class="bi bi-facebook"></i>,
  },
  {
    title: "whatsapp",
    icon: <i class="bi bi-whatsapp"></i>,
  },
  {
    title: "linkedin",
    icon: <i class="bi bi-linkedin"></i>,
  },
];
// Profile Data:
const tags = Object.keys(profile.tags || {});
const viewingOwnAccount = accountId === context.accountId;
const accountUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;
const shareUrl = `https://near.org${accountUrl}`;

// Follower Count:
const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
const followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
const followingCount = following
  ? Object.keys(following[accountId].graph.follow || {}).length
  : null;
const followersCount = followers ? Object.keys(followers || {}).length : null;

// Account follows you:
const accountFollowsYouData = Social.keys(
  `${accountId}/graph/follow/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);
const accountFollowsYou = Object.keys(accountFollowsYouData || {}).length > 0;

const contentModerationItem = {
  type: "social",
  path: profileUrl,
  reportedBy: context.accountId,
};

const Wrapper = styled.div`
  display: grid;
  gap: 40px;
  position: relative;

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #fbfcfd;
    border: 1px solid #d7dbdf;
    color: #11181c !important;

    &.button--primary {
      width: 100%;
      color: #006adc !important;

      @media (max-width: 1024px) {
        width: auto;
      }
    }

    &:hover,
    &:focus {
      background: #ecedee;
      text-decoration: none;
      outline: none;
    }

    i {
      color: #7e868c;
    }

    .bi-16 {
      font-size: 16px;
    }
  }

  @media (max-width: 900px) {
    gap: 24px;
  }
`;

const Section = styled.div`
  display: grid;
  gap: 24px;
`;

const Avatar = styled.div`
  width: 133px;
  height: 133px;
  flex-shrink: 0;
  border: 3px solid #fff;
  overflow: hidden;
  border-radius: 100%;
  box-shadow: 0px 12px 16px rgba(16, 24, 40, 0.08),
    0px 4px 6px rgba(16, 24, 40, 0.03);

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 900px) {
    width: 80px;
    height: 80px;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: ${(p) => p.size || "25px"};
  line-height: 1.2em;
  color: #11181c;
  margin: ${(p) => (p.margin ? "0 0 24px" : "0")};
  overflow-wrap: anywhere;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
    color: #11181c;
  }

  &[href] {
    display: inline-flex;
    gap: 0.25rem;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const TextLink = styled.a`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: #11181c !important;
  font-weight: 400;
  font-size: 14px;
  white-space: nowrap;
  outline: none;
  overflow-x: hidden;
  text-overflow: ellipsis;

  &:focus,
  &:hover {
    text-decoration: underline;
  }

  i {
    color: #7e868c;
    margin-right: 8px;
  }
`;

const TextBadge = styled.p`
  display: inline-block;
  margin: 0;
  font-size: 10px;
  line-height: 1.1rem;
  background: #687076;
  color: #fff;
  font-weight: 600;
  white-space: nowrap;
  padding: 0 6px;
  border-radius: 3px;
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
`;

const Stats = styled.div`
  display: flex;
  gap: 24px;
`;

const SocialLinks = styled.div`
  display: grid;
  gap: 9px;
`;

const FollowButtonWrapper = styled.div`
  flex: 1 0 auto;
  div,
  button {
    width: 100%;
  }
  @media (max-width: 1024px) {
    flex: 0 0 auto;
    div,
    button {
      width: auto;
    }
  }
`;

return (
  <>
    <Wrapper>
      <Section>
        {false && (
          <Actions>
            {viewingOwnAccount ? (
              <a
                className="button button--primary"
                href="#/near/widget/ProfileEditor"
              >
                <i className="bi bi-pencil"></i>
                Edit Profile
              </a>
            ) : context.accountId ? (
              <>
                {false && (
                  <FollowButtonWrapper>
                    <Widget
                      src="near/widget/FollowButton"
                      props={{
                        accountId,
                      }}
                    />
                  </FollowButtonWrapper>
                )}

                <Widget
                  src="near/widget/PokeButton"
                  props={{
                    accountId,
                  }}
                />
              </>
            ) : (
              <></>
            )}

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Copy URL to clipboard</Tooltip>}
            >
              <button
                className="button"
                type="button"
                onMouseLeave={() => {
                  State.update({ copiedShareUrl: false });
                }}
                onClick={() => {
                  clipboard.writeText(shareUrl).then(() => {
                    State.update({ copiedShareUrl: true });
                  });
                }}
              >
                {state.copiedShareUrl ? (
                  <i className="bi-16 bi bi-check"></i>
                ) : (
                  <i className="bi-16 bi-link-45deg"></i>
                )}
                Share
              </button>
            </OverlayTrigger>
          </Actions>
        )}
      </Section>

      <Section>
        {false && (
          <Stats>
            <Text as="a" href={`${accountUrl}&tab=following`}>
              <b bold as="span">
                {followingCount === null ? "--" : followingCount}
              </b>{" "}
              Following
            </Text>
            <Text as="a" href={`${accountUrl}&tab=followers`}>
              <b>{followersCount === null ? "--" : followersCount}</b> Followers
            </Text>
          </Stats>
        )}
      </Section>
    </Wrapper>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        height: "100%",
        padding: "0 8px",
      }}
    >
      <a
        href={`https://near.org/near/widget/ProfilePage?accountId=${accountId}`}
        target="_blank"
      >
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.image,
            alt: profile.name,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
            style: {
              height: "100%",
              maxHeight: 200,
              borderRadius: "50%",
              aspectRatio: 1 / 1,
              objectFit: "cover",
            },
          }}
        />
      </a>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: props.theme.textColor }}>
          {profile.name || accountId}
        </h2>

        <h5 style={{ color: props.theme.textColor2 }}>@{accountId}</h5>
        {tags.length > 0 && (
          <Section>
            <Widget
              src="near/widget/Tags"
              props={{
                tags,
              }}
            />
          </Section>
        )}
      </div>

      {profile.linktree && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: "100%",
            maxWidth: 400,
          }}
        >
          {profile.linktree.website && (
            <a href={`https://${profile.linktree.website}`} target="_blank">
              <button style={{ width: "100%" }}>
                {" "}
                <i className="bi bi-globe"></i> Website
              </button>
            </a>
          )}

          {profile.linktree.github && (
            <>
              <a
                href={`https://github.com/${profile.linktree.github}`}
                target="_blank"
              >
                <button style={{ width: "100%" }}>
                  <i className="bi bi-github"></i> Github
                </button>
              </a>
            </>
          )}

          {profile.linktree.twitter && (
            <a
              href={`https://twitter.com/${profile.linktree.twitter}`}
              target="_blank"
            >
              <button style={{ width: "100%" }}>
                <i className="bi bi-twitter"></i> Twitter
              </button>
            </a>
          )}

          {profile.linktree.telegram && (
            <a
              href={`https://t.me/${profile.linktree.telegram}`}
              target="_blank"
            >
              <button style={{ width: "100%" }}>
                <i className="bi bi-telegram"></i> Telegram
              </button>
            </a>
          )}
        </div>
      )}
      {false && (
        <div style={{ display: "flex", gap: 16 }}>
          {profile1.socials?.map((link) => (
            <a href={link.url} target="_blank" style={{ fontSize: "1.5rem" }}>
              {titleToIcon.find((ti) => ti.title === link.title).icon}
            </a>
          ))}
        </div>
      )}
    </div>
  </>
);
