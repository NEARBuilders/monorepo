const { Button } = VM.require("app.near/widget/Components") || {
  Button: () => <></>,
};

const accountId = props.accountId;
const widgetName = props.widgetName;
const widgetPath = `${accountId}/widget/${widgetName}`;
const blockHeight = props.blockHeight;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);

const name = metadata.name ?? widgetName;
const description = metadata.description;
const image = metadata.image;

const Card = styled.div`
  border: 1px solid var(--stroke);
  border-radius: 1rem;
  background: var(--post-bg);
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  a {
    color: var(--color) !important;
  }
`;

const InlineUser = ({ accountId }) => {
  const profile = Social.getr(`${accountId}/profile`);
  return (
    <div className="d-flex gap-1 align-items-center text-truncate">
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          accountId,
          style: { width: 16, objectFit: "cover" },
        }}
      />
      <p className="m-0">{profile.name || ""}</p>
      <p className="m-0" style={{ color: "var(--color-muted)" }}>
        @{accountId}
      </p>
    </div>
  );
};

const CardButton = styled.a`
  display: flex;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-grow: 1;

  color: var(--color) !important;
  font-weight: 500;
  font-size: 16px;
  border: 1px solid var(--stroke);
  transition: background 300ms;

  &:hover {
    text-decoration: none;
    cursor: pointer;
    background: var(--bg-hover);
  }
`;

return (
  <Card>
    <a
      style={{ textDecoration: "none" }}
      target="_blank"
      href={`https://near.social/${widgetPath}`}
    >
      <div className="d-flex gap-3 p-3 w-100 overflow-auto">
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: image,
            style: {
              objectFit: "cover",
              borderRadius: "1em",
              width: 88,
              height: 88,
            },
            thumbnail: false,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
            alt: widgetName,
          }}
        />
        <div className="d-flex flex-column gap-1">
          <p
            className="m-0"
            style={{ color: "var(--color)", fontSize: 20, fontWeight: 500 }}
          >
            {name}
          </p>
          <span className="text-truncate">
            <InlineUser accountId={accountId} />
          </span>
          <p className="m-0">
            <i className="bi bi-time"></i>{" "}
            <Widget
              loading=""
              src="mob.near/widget/TimeAgo"
              props={{ blockHeight: blockHeight }}
            />
          </p>
        </div>
      </div>
    </a>
    <div className="d-flex justify-content-between">
      <CardButton
        href={`https://near.social/mob.near/widget/WidgetSource?src=${widgetPath}`}
        target="_blank"
        style={{ borderRadius: "0 0 0 1rem" }}
      >
        <i className="bi bi-file-code"></i> Source
      </CardButton>
      <CardButton
        href={`https://near.social/bozon.near/widget/WidgetHistory?widgetPath=${widgetPath}`}
        target="_blank"
      >
        <i className="bi bi-clock"></i> History
      </CardButton>
      <CardButton
        href={`https://near.social/edit/${widgetPath}`}
        target="_blank"
        style={{ borderRadius: "0 0 1rem 0" }}
      >
        <i className="bi bi-pencil-square"></i> Fork
      </CardButton>
    </div>
  </Card>
);
