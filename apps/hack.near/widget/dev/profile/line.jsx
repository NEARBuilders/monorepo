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
          <div>
            <span className="fw-bold">{name}</span>{" "}
          </div>
          <div>
            <small>
              <span className="font-monospace">@{accountId}</span>
              <Widget src="hack.near/widget/dev.badge" props={{ accountId }} />
            </small>
          </div>
        </div>
      </a>
    </div>
  </div>
);
