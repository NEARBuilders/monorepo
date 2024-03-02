const accountId = props.accountId ?? context.accountId;
const thingId = props.thingId ?? "f8ad9d1a76259lmdpjnd74e69162a0a014";

const thing =
  props.thing ?? Social.get(`${accountId}/thing/${thingId}/metadata/**`);

const name = thing.name;
const description = thing.description;
const tags = Object.keys(thing.tags ?? {});

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
    <a href={`/hack.near/widget/some?thingId=${thingId}`}>
      <Widget
        src="hack.near/widget/thing.image"
        props={{
          thingId,
          style: { height: "3.4em", width: "3.4em", minWidth: "3.4em" },
          className: "me-3",
        }}
      />
    </a>
    <div className="text-truncate">
      <div className="text-truncate">
        <a
          href={`/hack.near/widget/some?thingId=${thingId}`}
          style={{ textDecoration: "none" }}
        >
          <span className="fw-bold" style={{ color: "black" }}>
            {thing.name}
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
                  href={`/hack.near/widget/every.thing?tag=${tag}`}
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
