const accountId = context.accountId;

let project = Social.getr(`${accountId}/project`);

if (project === null) {
  return "Loading";
}

State.init({
  project,
});

return (
  <div className="row">
    <div className="mb-2">
      <h3>Submit Your Project This Week!</h3>
      <p>Make a custom page featuring your main widget.</p>
      <p>
        Due by <b>11:59pm UTC on Friday, February 17</b>
      </p>
      <Widget
        src="gov.near/widget/MetadataEditor"
        props={{
          initialMetadata: project,
          onChange: (project) => State.update({ project }),
          options: {
            name: { label: "Project Name" },
            featuredWidget: {
              label: "Featured Widget: <account>.near/widget/<Example>",
            },
            image: { label: "Project Logo" },
            backgroundImage: { label: "Background Image" },
            description: { label: "About the Project" },
            tags: {
              label: "Tags",
              tagsPattern: "*/project/tags/*",
              placeholder: "near, hackathon, project",
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
      <CommitButton data={{ project: state.project }}>
        Save Project
      </CommitButton>
      <a
        className="btn btn-outline-primary ms-2"
        href={`#/create.near/widget/Page?accountId=${accountId}`}
      >
        View Project
      </a>
    </div>
  </div>
);
