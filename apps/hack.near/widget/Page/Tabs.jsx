const accountId = props.accountId ?? "hack.near";
const hashtag = props.hashtag ?? "builders";
if (!accountId) {
  return "No account ID";
}

const page = props.page ?? Social.getr(`${accountId}/page`);

if (page === null) {
  return "Loading";
}

const description = page.description;

const pills = [
  { id: "guides", title: "Guides" },
  { id: "about", title: "About" },
  { id: "posts", title: "Posts" },
  { id: "widgets", title: "Widgets" },
];

return (
  <>
    <ul className="nav nav-pills nav-fill mb-4" id="pills-tab" role="tablist">
      {pills.map(({ id, title }, i) => (
        <li className="nav-item" role="presentation" key={i}>
          <button
            className={`nav-link ${i === 0 ? "active" : ""}`}
            id={`pills-${id}-tab`}
            data-bs-toggle="pill"
            data-bs-target={`#pills-${id}`}
            type="button"
            role="tab"
            aria-controls={`pills-${id}`}
            aria-selected={i === 0}
            onClick={() => {
              const key = `load${id}`;
              !state[key] && State.update({ [key]: true });
            }}
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade show active"
        id="pills-guides"
        role="tabpanel"
        aria-labelledby="pills-guides-tab"
      >
        <div className="mx-auto">
          <Widget
            src="hack.near/widget/ForkThis"
            props={{ accounts: [accountId] }}
          />
        </div>
      </div>
      <div
        className="tab-pane fade"
        id="pills-about"
        role="tabpanel"
        aria-labelledby="pills-about-tab"
      >
        <div className="mx-auto">
          {description && (
            <div className="border rounded-4 p-3 pb-0 mb-3">
              <h4>
                <i class="bi bi-pin-angle" /> Description
              </h4>
              <Markdown text={description} />
            </div>
          )}
        </div>
      </div>
      <div
        className="tab-pane fade"
        id="pills-posts"
        role="tabpanel"
        aria-labelledby="pills-posts-tab"
      >
        <div className="mx-auto">
          <Widget src="hack.near/widget/Hashtag.Feed" props={{ hashtag }} />
        </div>
      </div>
      <div
        className="tab-pane fade widgets"
        id="pills-widgets"
        role="tabpanel"
        aria-labelledby="pills-widgets-tab"
      >
        <div className="mx-auto">
          <Widget src="hack.near/widget/Components" props={{ accountId }} />
        </div>
      </div>
    </div>
  </>
);
