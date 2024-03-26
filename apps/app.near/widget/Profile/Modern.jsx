const { Root } = VM.require("app.near/widget/Profile.Modern.Root") || {
  Root: () => <></>,
};

const { Button, LinkTree, FollowStats, Hashtag } = VM.require(
  "app.near/widget/Components"
) || {
  Button: () => <></>,
  LinkTree: () => <></>,
  FollowStats: () => <></>,
  Hashtag: () => <></>,
};

const { LinkIcon, CopyIcon } = VM.require("app.near/widget/Icons") || {
  LinkIcon: () => <></>,
  CopyIcon: () => <></>,
};

const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return (
    <div>
      <p>No user signed in or AccountId passed</p>
    </div>
  );
}

const profile = Social.getr(`${accountId}/profile`);
const profileTags = Object.keys(profile.tags || []);

const theme = profile.profileTheme ?? "light";
const font = profile.profileFont ?? "InterVariable";
const activeColor = profile.profileActiveColor ?? "#E93D82";

const ProfileImagesContainer = styled.div`
  position: relative;
  overflow-x: clip;
  overflow-y: visible;
  z-index: 5;
`;

const BackgroundImage = styled.div`
  img {
    z-index: 5;
    width: 100%;
    height: 280px;
    object-fit: cover;

    @media (max-width: 768px) {
      height: 120px;
    }
  }
`;

const ProfileImage = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);

  img {
    z-index: 5;
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 100%;
    border: 3px solid var(--profile-stroke);
  }

  @media (max-width: 768px) {
    img {
      width: 80px;
      height: 80px;
    }
  }
`;

const ProfileName = styled.h2`
  color: var(--color);
  font-family: InterVariant, sans-serif;
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 56px */
  letter-spacing: -0.4px;
  margin: 0;

  display: inline-flex;
  gap: 8px;
  align-items: center;

  svg {
    scale: 1.5;
    margin-bottom: 6px;
  }
`;

const AccountName = styled.div`
  display: inline-flex;
  gap: 4px;
  align-items: center;
  color: var(--color-muted);
  font-family: InterVariable;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */

  span {
    cursor: pointer;
    margin-top: 3px;
  }
`;

const LeftFullBlur = styled.div`
  width: 407px;
  height: 697px;
  flex-shrink: 0;

  border-radius: 697px;
  background: var(--active-color);
  filter: blur(200px);

  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(-50%);
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;
`;

const RightFullBlur = styled.div`
  width: 407px;
  height: 697px;
  flex-shrink: 0;

  border-radius: 697px;
  background: var(--active-color);
  filter: blur(200px);

  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%);
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;
`;

return (
  <Root theme={theme} font={font} activeColor={activeColor}>
    <ProfileImagesContainer>
      <BackgroundImage>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.backgroundImage,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreic5bphlb7v324i4ztzrd3xif5cmpg7qynf763hw7tv27xh3dwpcf4",
          }}
        />
      </BackgroundImage>
      <ProfileImage>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.image,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreic5bphlb7v324i4ztzrd3xif5cmpg7qynf763hw7tv27xh3dwpcf4",
          }}
        />
      </ProfileImage>
    </ProfileImagesContainer>
    <div className="container-xl">
      <div className="d-flex justify-content-end p-md-3 pt-3">
        <OverlayTrigger
          placement="auto"
          overlay={<Tooltip>{"Copy to clipboard"}</Tooltip>}
        >
          <Button
            onClick={() =>
              clipboard.writeText(
                `app.near/widget/Profile?accountId=${accountId}`
              )
            }
          >
            Share <LinkIcon theme={theme} />
          </Button>
        </OverlayTrigger>
      </div>
      <div className="d-flex flex-column align-items-center gap-3 mb-5">
        <div className="d-flex flex-column align-items-center">
          <ProfileName>
            {profile.name}
            <Widget
              loading={""}
              src="mob.near/widget/Checkmark"
              props={{ isPremium, accountId }}
            />
          </ProfileName>
          <AccountName>
            @{accountId}
            <span onClick={() => clipboard.writeText(accountId)}>
              <Widget
                loading={content}
                src="mob.near/widget/N.Common.OverlayTrigger"
                props={{
                  popup: <div>Copy AccountId</div>,
                  children: <CopyIcon />,
                }}
              />
            </span>
          </AccountName>
        </div>
        <LinkTree linkTree={profile.linktree} theme={theme} />
        <FollowStats accountId={accountId} />
        <div className="d-flex justify-content-center align-items-center gap-3">
          {context.accountId === accountId ? (
            <Widget
              src="app.near/widget/Components.EditModal"
              props={{
                accountId: accountId,
                theme: theme,
                activeColor: activeColor,
                font: font,
                profileLayout: "modern",
              }}
            />
          ) : (
            <>
              <Widget
                src={"app.near/widget/Components.Profile.FollowButton"}
                loading=""
                props={{
                  accountId: accountId,
                }}
              />
              <Widget
                src={"app.near/widget/Components.Profile.PokeButton"}
                loading=""
                props={{
                  accountId: accountId,
                }}
              />
            </>
          )}
        </div>
        <div className="d-flex justify-content-center mt-2">
          <div className="d-flex align-items-center flex-wrap gap-2">
            {profileTags.length > 0 &&
              profileTags.map((tag) => <Hashtag key={tag}>{tag}</Hashtag>)}
          </div>
        </div>
      </div>
    </div>
    <Widget
      src="app.near/widget/Components.Profile.Tabs"
      loading=""
      props={{ accountId: accountId }}
    />
    <LeftFullBlur />
    <RightFullBlur />
  </Root>
);
