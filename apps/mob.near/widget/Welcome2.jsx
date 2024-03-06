return (
  <>
    <Widget src="mob.near/widget/ProfileOnboarding" />
    {context.accountId && (
      <div className="text-bg-light rounded-4 p-3 mb-3">
        <a
          href={`#/mob.near/widget/ProfilePage`}
          className="text-decoration-none link-dark"
        >
          <Widget
            src="mob.near/widget/Profile.InlineBlock"
            props={{ accountId: context.accountId }}
          />
        </a>
      </div>
    )}
    <div className="text-bg-light rounded-4 p-3 mb-3">
      <Widget src="mob.near/widget/Applications" />
    </div>
    <div className="text-bg-light rounded-4 p-3 mb-3">
      <Widget src="mob.near/widget/People" />
    </div>
    <div className="text-bg-light rounded-4 p-3 mb-3">
      <div>
        <h4>Get involved</h4>
        <div className="mb-2 d-flex gap-2 flex-wrap">
          <a
            className="btn btn-outline-primary"
            href="https://thewiki.near.page/PastPresentAndFutureOfNearSocial"
          >
            What's Near Social?
          </a>
          <a
            className="btn btn-outline-primary"
            href="https://thewiki.near.page/near.social_docs"
          >
            Documentation
          </a>
        </div>
        <div className="mb-2 d-flex gap-2 flex-wrap">
          <a
            className="btn btn-outline-secondary border-0"
            href="#/mob.near/widget/ProfilePage?accountId=self.social.near"
          >
            <i className="bi bi-person-circle"></i>
          </a>
          <a
            className="btn btn-outline-secondary border-0"
            href="https://t.me/NearSocial"
          >
            <i className="bi bi-telegram"></i>
          </a>
          <a
            className="btn btn-outline-secondary border-0"
            href="https://github.com/NearSocial"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            className="btn btn-outline-secondary border-0"
            href="https://twitter.com/NearSocial_"
          >
            <i className="bi bi-twitter"></i>
          </a>
          <a
            className="btn btn-outline-secondary border-0"
            href="https://thewiki.near.page/near.social"
          >
            <i className="bi bi-wikipedia"></i>
          </a>
        </div>
      </div>
    </div>

    <div className="row mb-3">
      <ul
        className="d-block d-lg-none nav nav-pills nav-fill mb-3"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="pills-posts-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-posts"
            type="button"
            role="tab"
            aria-controls="pills-posts"
            aria-selected="true"
          >
            Posts
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-graph-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-graph"
            type="button"
            role="tab"
            aria-controls="pills-graph"
            aria-selected="false"
          >
            Graph
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-pokes-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-pokes"
            type="button"
            role="tab"
            aria-controls="pills-pokes"
            aria-selected="false"
          >
            Pokes
          </button>
        </li>
      </ul>
      <div className="tab-content row" id="pills-tabContent">
        <div
          className="tab-pane d-lg-block col-lg-3"
          id="pills-graph"
          role="tabpanel"
          aria-labelledby="pills-graph-tab"
        >
          <div className="text-bg-light rounded-4 p-3">
            <h5>Follow activity</h5>
            <Widget src="mob.near/widget/FollowFeed" />
          </div>
        </div>
        <div
          className="tab-pane show active d-lg-block col-lg-6"
          id="pills-posts"
          role="tabpanel"
          aria-labelledby="pills-posts-tab"
        >
          <Widget src="mob.near/widget/MainPage.Content" />
        </div>
        <div
          className="tab-pane d-lg-block col-lg-3"
          id="pills-pokes"
          role="tabpanel"
          aria-labelledby="pills-pokes-tab"
        >
          <div className="text-bg-light rounded-4 p-3">
            <h5>Poke activity</h5>
            <Widget src="mob.near/widget/PokeFeed" />
          </div>
        </div>
      </div>
    </div>
  </>
);
