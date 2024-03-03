const accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR account :)";
}

let page = Social.getr(`${accountId}/page`);

if (page === null) {
  return "Loading";
}

State.init({
  page,
});

return (
  <div className="row">
    <div className="col-lg-6">
      <div>
        <h4>Edit Project Page</h4>
        <h6>@{accountId}</h6>
      </div>
      <div className="mb-2">
        <Widget
          src="mob.near/widget/MetadataEditor"
          props={{
            initialMetadata: page,
            onChange: (page) => State.update({ page }),
            options: {
              name: { label: "Name" },
              image: { label: "Logo" },
              backgroundImage: { label: "Cover Image" },
              description: { label: "About" },
              tags: {
                label: "Tags",
                tagsPattern: "*/page/tags/*",
                placeholder:
                  "rust, engineer, artist, humanguild, nft, learner, founder",
              },
              linktree: {
                links: [
                  {
                    label: "Twitter",
                    prefix: "https://twitter.com/",
                    name: "twitter",
                  },
                  {
                    label: "Github",
                    prefix: "https://github.com/",
                    name: "github",
                  },
                  {
                    label: "Telegram",
                    prefix: "https://t.me/",
                    name: "telegram",
                  },
                  {
                    label: "Website",
                    prefix: "https://",
                    name: "website",
                  },
                ],
              },
            },
          }}
        />
      </div>
      <div className="mb-2">
        <CommitButton data={{ page: state.page }}>Save</CommitButton>
        <a
          className="btn btn-outline-primary ms-2"
          href={`#/hack.near/widget/Project.Page?accountId=${accountId}`}
        >
          View
        </a>
      </div>
    </div>
    <div className="col-lg-6">
      <div>
        <Widget
          src="hack.near/widget/Project.Page"
          props={{ accountId, page: state.page }}
        />
      </div>
    </div>
  </div>
);
