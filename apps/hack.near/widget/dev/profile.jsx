const accountId = props.accountId ?? context.accountId ?? "devs.near";

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name;
const description = profile.description;
const tags = Object.keys(profile.tags ?? {});

const TagLink = styled.div`
  text-decoration: none;

  .tag-link:hover {
    text-decoration: none;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
`;

return (
  <div className="d-flex flex-row">
    <a href={`#/near/widget/ProfilePage?accountId=${accountId}`}>
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          metadata,
          accountId,
          widgetName,
          style: { height: "3em", width: "3em", minWidth: "3em" },
          className: "me-2",
        }}
      />
    </a>
    <div className="text-truncate">
      <a
        href={`#/near/widget/ProfilePage?accountId=${accountId}`}
        className="text-decoration-none link-dark"
      >
        <div className="text-truncate">
          <span className="fw-bold">{name}</span>{" "}
          <small>
            <span className="font-monospace">@{accountId}</span>
          </small>
          <Widget src="hack.near/widget/dev.badge" props={{ accountId }} />
        </div>
      </a>
      <div className="text-truncate text-muted">
        {tags.length > 0 && (
          <>
            <TagContainer>
              {tags.map((tag, i) => (
                <TagLink>
                  <a
                    key={i}
                    href={`#/efiz.near/widget/every.hashtag.view?hashtag=${tag}`}
                  >
                    <span
                      key={i}
                      className="fw-light badge border border-secondary text-bg-light"
                    >
                      #{tag}
                    </span>
                  </a>
                </TagLink>
              ))}
            </TagContainer>
          </>
        )}
      </div>
    </div>
  </div>
);
