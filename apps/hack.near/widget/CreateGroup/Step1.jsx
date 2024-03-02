const { formState, errors } = props;

const initialAnswers = {
  name: formState.name,
  description: formState.description,
  links: formState.links.length > 0 ? formState.links : [""],
};

State.init({
  answers: initialAnswers,
});

return (
  <div className="mt-4 ndc-card p-4">
    <div className="d-flex flex-column gap-4">
      <h2 className="h5 fw-bold">
        <span
          className="rounded-circle d-inline-flex align-items-center justify-content-center fw-bolder h5 me-2"
          style={{
            width: "48px",
            height: "48px",
            border: "1px solid #82E299",
          }}
        >
          1
        </span>
        Basics
      </h2>
      <div>
        <div className="mb-2 mt-3">
          <Widget
            src="near/widget/MetadataEditor"
            props={{
              initialMetadata: group,
              onChange: (group) => State.update({ group }),
              options: {
                name: { label: "Name" },
                image: { label: "Logo" },
                description: { label: "About" },
                tags: {
                  label: "Tags",
                  tagsPattern: `*/${groupId}/tags/*`,
                  placeholder: "nyc, brooklyn, edu, dev, com, nft, ai, social",
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
      </div>
    </div>
  </div>
);
