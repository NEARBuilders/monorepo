const accountId = context.accountId;

if (!accountId) {
  return <Widget src="mob.near/widget/ProfileOnboarding" />;
}

const data = accountId
  ? Social.get(`${accountId}/settings/dev/library`)
  : undefined;

if (data === null) {
  return "Loading...";
}

const library = [data];

return (
  <>
    <Widget src="hack.near/widget/dev.library" props={{ data: library }} />
  </>
);

  });

  if (notifications.length) {
    data.index.notify = JSON.stringify(
      notifications.length > 1 ? notifications : notifications[0]
    );
  }

  return data;
};

State.init({
  onChange: ({ content }) => {
    State.update({ content });
  },
});

return (
  <div className="container">
    <Widget src="mob.near/widget/ProfileOnboarding" />
    <div className="row mb-3">
      <div className="mb-3"></div>
      <div>
        <h1>Evolving Guides for Builders</h1>
        <p>
          Let's collaborate to gather knowledge and improve common resources for
          open web developers. Choose your own adventure to discover what is
          possible! #NEAR
        </p>
        <div className="mb-3"></div>
        <a
          className="btn btn-primary"
          href="https://near.social/#/hack.near/widget/Dev"
        >
          Widgets
        </a>
        <a
          className="btn btn-primary"
          href="https://near.social/#/hack.near/widget/Docs"
        >
          APIs
        </a>
        <a
          className="btn btn-primary"
          href="https://near.social/#/hack.near/widget/Data"
        >
          Data
        </a>
      </div>
      <div className="row mt-3">
        <Widget src="hack.near/widget/Common.Component.Library" />
      </div>
    </div>
  </div>
);
