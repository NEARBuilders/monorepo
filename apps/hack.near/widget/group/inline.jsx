const accountId = props.accountId ?? context.accountId;
const groupId = props.groupId ?? "526fb256e74eelmf0nw3n5909bc189c13d";

const group =
  props.group ?? Social.get(`${accountId}/thing/${groupId}/metadata/**`);

const name = group.name;
const description = group.description;
const tags = Object.keys(group.tags ?? {});

const Tag = styled.a`
  color: black;
  text-decoration: none;

  &:hover {
    color: blue;
    text-decoration: none;
  }
`;

return (
  <div className="d-flex flex-row">
    <a href={`/hack.near/widget/group?groupId=${groupId}`}>
      <Widget
        src="hack.near/widget/group.image"
        props={{
          groupId,
          widgetName,
          style: { height: "3.4em", width: "3.4em", minWidth: "3.4em" },
          className: "me-3",
        }}
      />
    </a>
    <div className="text-truncate">
      <div className="text-truncate">
        <a
          href={`/hack.near/widget/Group?groupId=${groupId}`}
          style={{ textDecoration: "none" }}
        >
          <span className="fw-bold" style={{ color: "black" }}>
            {group.name}
          </span>
        </a>
      </div>
      <div className="text-truncate text-muted">
        {tags.length > 0 && (
          <>
            {tags.map((tag, i) => (
              <span
                key={i}
                className="me-1 fw-light badge border border-secondary text-bg-light"
              >
                <a
                  href={`/hack.near/widget/every.group?tag=${tag}`}
                  style={{ textDecoration: "none" }}
                  className="no-text-decoration"
                >
                  <Tag>#{tag}</Tag>
                </a>
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  </div>
);
