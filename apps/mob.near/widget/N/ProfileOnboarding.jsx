const accountId = props.debugAccountId ?? context.accountId;

if (!accountId) {
  return "";
}

const profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "";
}

const name = profile.name;
const image = profile.image;

const Wrapper = styled.div`
  border-bottom: 1px solid #eee;
  margin: 0 -12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const renderEditProfile = (content) => {
  return (
    <Wrapper className="d-flex align-items-center flex-row p-2">
      <div className="flex-shrink-1 me-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#bbb"
          className="ratio ratio-1x1"
          viewBox="0 0 16 16"
          style={{ maxHeight: "4em" }}
        >
          <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
          <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5Zm0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
        </svg>
      </div>
      <div>
        {content}
        <div>
          <a
            className="btn btn-primary rounded-5"
            href="/mob.near/widget/ProfileEditor"
          >
            Edit Profile
          </a>
        </div>
      </div>
    </Wrapper>
  );
};

if (!name) {
  return renderEditProfile(<p>Your profile is missing a name!</p>);
}

if (
  !image.ipfs_cid &&
  (!image.nft.contractId || !image.nft.tokenId) &&
  !image.url
) {
  return renderEditProfile(<p>Your profile is missing a picture!</p>);
}

return "";
