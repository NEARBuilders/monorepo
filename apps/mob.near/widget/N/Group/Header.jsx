const groupId = props.groupId;
if (!groupId) {
  return "No groupId";
}

const link =
  props.link &&
  (props.link === true
    ? `https://near.social/?groupId=${groupId}`
    : props.link);

const nftMetadata = props.nftMetadata ?? Near.view(groupId, "nft_metadata");
const owners = props.owners;

if (nftMetadata === null) {
  return "Loading";
}

const name = nftMetadata.name || "Unnamed group";
const imageUrl = nftMetadata.icon;
// const backgroundImage = nftMetadata.backgroundImage;
// const tags = Object.keys(nftMetadata.tags ?? {});

const nameHeader = <h4 className="mt-0 mb-0 text-truncate">{name}</h4>;

const Wrapper = styled.div`
  overflow: hidden;
  margin: 0 -12px;
`;

const shareSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 16 16"
    stroke="currentColor"
    strokeWidth="0.363"
  >
    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
  </svg>
);

return (
  <Wrapper
    style={
      props.noBorder
        ? undefined
        : {
            borderBottom: "1px solid #eee",
          }
    }
  >
    <div className="px-4 pt-0 pb-5 bg-dark position-relative">
      {backgroundImage && (
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: backgroundImage,
            alt: "profile background",
            className: "position-absolute w-100 h-100",
            style: { objectFit: "cover", left: 0, top: 0 },
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
      )}
      <div
        className="profile-picture d-inline-block"
        style={{ transform: "translateY(7rem)" }}
      >
        <div className="mb-2" style={{ width: "10rem", height: "10rem" }}>
          <img
            src={imageUrl}
            className="rounded-5 w-100 h-100 img-thumbnail d-block"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
    <div className="px-4 pb-1">
      <div className="d-flex justify-content-between pt-3 mb-2">
        <div style={{ paddingTop: "3rem" }}>
          <div className="me-2 d-flex gap-1 flex-row align-items-center">
            <div className="me-2 position-relative">
              {link ? (
                <a className="text-truncate text-dark" href={link}>
                  {nameHeader}
                </a>
              ) : (
                nameHeader
              )}
              <div className="small text-truncate">
                <i className="bi bi-buildings-fill text-secondary"></i>
                {groupId}
                <Widget
                  src="mob.near/widget/CopyButton"
                  props={{
                    text: groupId,
                    className: "btn btn-sm btn-outline-dark border-0",
                  }}
                />
              </div>
            </div>
          </div>
          {owners !== undefined && (
            <div>
              <div className="d-flex flex-row">
                <div className="me-4">
                  <a
                    href={`#/mob.near/widget/FollowPage?accountId=${accountId}&tab=following`}
                    className="text-dark"
                  >
                    {owners && owners.length > 0 ? (
                      <span className="fw-bolder">{owners.length}</span>
                    ) : (
                      "?"
                    )}{" "}
                    <span className="text-muted">Members</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        {/*
        <div style={{ minWidth: "12rem" }}>
          <Widget
            src="mob.near/widget/LinkTree"
            props={{ linktree: profile.linktree }}
          />
        </div>*/}
        <div className="float-end">
          <Widget
            src="mob.near/widget/CopyButton"
            props={{
              text: link,
              label: "Share",
              clipboardIcon: shareSvg,
            }}
          />
        </div>
      </div>

      {/*
      tags.length > 0 && (
        <div>
          {tags.map((tag, i) => (
            <span
              key={i}
              className="me-1 mb-1 fw-light badge border border-secondary text-bg-light"
            >
              #{tag}
            </span>
          ))}
        </div>
      )
      */}
    </div>
  </Wrapper>
);
