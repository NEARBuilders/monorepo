const accountId = props.accountId ?? "hack.near";
const widgetName = props.widgetName ?? "Academy";
const widgetPath = `${accountId}/widget/${widgetName}`;
const blockHeight = props.blockHeight;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);

const name = metadata.name ?? widgetName;
const description = metadata.description;
const tags = Object.keys(metadata.tags ?? {});

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
    <a href={`#/${widgetPath}`} className="text-decoration-none link-dark">
      <Widget
        src="mob.near/widget/WidgetImage"
        props={{
          metadata,
          accountId,
          widgetName,
          style: { height: "3em", width: "3em", minWidth: "3em" },
          className: "me-2 float-start d-inline-block",
          imageClassName: "w-100 h-100",
        }}
      />
    </a>
    <div className="d-inline-block">
      <a href={`#/${widgetPath}`} className="text-decoration-none link-dark">
        <div className="text-truncate">
          <span className="fw-bold">{name}</span>{" "}
        </div>
      </a>

      <div className="text-truncate text-muted">
        {tags.length > 0 && (
          <>
            <TagContainer>
              {tags.map((tag, i) => (
                <TagLink>
                  <a key={i} href={`#/mob.near/widget/LastWidgets?tag=${tag}`}>
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
