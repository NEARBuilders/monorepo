const items = Social.index("post", "berryclub", {
  order: "desc",
});

if (!items) {
  return "Loading";
}

const profileLink = (accountId, c) => (
  <a
    className="text-decoration-none link-dark"
    href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
  >
    {c}
  </a>
);

const renderItem = (a) => {
  const accountId = a.accountId;
  const whenPostedBlockHeight = a.blockHeight;
  const blockHeight = parseInt(a.value?.blockHeight ?? a.value);
  const contract = a.value?.contract ?? "berryclub.ek.near";
  return (
    <div key={JSON.stringify(a)} style={{ minHeight: "40vh" }}>
      <div style={{ maxWidth: "45vh" }}>
        <div
          className="d-flex align-items-start"
          style={{
            padding: "1.5rem 0",
          }}
        >
          <div>
            {profileLink(
              accountId,
              <Widget
                src="mob.near/widget/ProfileImage"
                props={{ accountId }}
              />
            )}
          </div>
          <div className="ms-2 flex-grow-1" style={{ minWidth: 0 }}>
            <div className="d-flex justify-content-start">
              <div className="flex-grow-1 me-1 text-truncate">
                {profileLink(
                  accountId,
                  <>
                    <span className="fw-bold">{profile.name}</span>
                    <span className="text-secondary">@{accountId}</span>
                  </>
                )}
              </div>
              <div>
                <small className="ps-1 text-nowrap text-muted ms-auto">
                  <i className="bi bi-clock me-1"></i>
                  <Widget
                    src="mob.near/widget/TimeAgo"
                    props={{ blockHeight: whenPostedBlockHeight }}
                  />
                </small>
              </div>
            </div>
            <div
              className="d-block ratio ratio-1x1 mb-1"
              style={{ maxHeight: "40vh" }}
            >
              <a
                href={`#/mob.near/widget/BerryclubBoard?blockHeight=${blockHeight}&contract=${contract}`}
                target="_blank"
              >
                <Widget
                  src="mob.near/widget/BerryclubBoard"
                  props={{ blockHeight, contract }}
                />
              </a>
            </div>
            <div>
              <a
                href={`#/mob.near/widget/BerryclubHistory?blockHeight=${blockHeight}&contract=${contract}`}
                target="_blank"
                className="btn btn-outline-dark"
              >
                Finetune{" "}
                {contract === "v1.dacha-finance.near"
                  ? "🥔"
                  : contract === "farm-draw.cheddar.near"
                  ? "🧀"
                  : "🥑"}{" "}
                #{blockHeight}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

return <Widget src="mob.near/widget/ItemFeed" props={{ items, renderItem }} />;
