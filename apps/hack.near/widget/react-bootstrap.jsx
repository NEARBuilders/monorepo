const rhs = context.accountId
  ? Social.get(`${context.accountId}/settings/near.social/homepage.rhs`)
  : undefined;

if (rhs === null) {
  return "";
}

const options = [
  {
    title: "ABC",
    disabled: !context.accountId,
  },
  {
    title: "XYZ",
  },
];

const widgets = (rhs && JSON.parse(rhs)) ?? defaultWidgets;

const defaultWidgets = [
  {
    src: "bozon.near/widget/WidgetHistory",
  },
  {
    src: "mob.near/widget/ActivityFeed",
    requiresLogin: true,
  },
  {
    src: "y3k.near/widget/NEAR_Dashboard",
  },
];

const Div = styled.div`
  position: relative;
  @media (hover: hover) {
    > .edit-link {
      display: none;
    }
  }
  &:hover {
    > .edit-link {
      display: inline;
    }
  }
`;

return (
  <div className="container">
    <Widget src="mob.near/widget/ProfileOnboarding" />
    <h3>react-bootstrap</h3>
    <div className="row mb-3">
      <h5>Example Buttons</h5>
      <div>
        <a className="btn btn-primary" href="">
          Primary
        </a>
        <a className="btn btn-secondary" href="">
          Secondary
        </a>
        <a className="btn btn-success" href="">
          Success
        </a>
        <a className="btn btn-warning" href="">
          Warning
        </a>
        <a className="btn btn-danger" href="">
          Danger
        </a>
        <a className="btn btn-info" href="">
          Info
        </a>
        <a className="btn btn-light" href="">
          Light
        </a>
        <a className="btn btn-dark" href="">
          Dark
        </a>
      </div>
    </div>
    <div className="row mb-3">
      <div>
        <a className="btn btn-outline-primary" href="">
          Primary
        </a>
        <a className="btn btn-outline-secondary" href="">
          Secondary
        </a>
        <a className="btn btn-outline-success" href="">
          Success
        </a>
        <a className="btn btn-outline-warning" href="">
          Warning
        </a>
        <a className="btn btn-outline-danger" href="">
          Danger
        </a>
        <a className="btn btn-outline-info" href="">
          Info
        </a>
        <a className="btn btn-outline-light" href="">
          Light
        </a>
        <a className="btn btn-outline-dark" href="">
          Dark
        </a>
      </div>
    </div>

    <div className="row mb-3">
      <h5>Example Alerts</h5>
      <div>
        <div className="alert alert-primary">Primary</div>
        <div className="alert alert-secondary">Secondary</div>
        <div className="alert alert-warning">Warning</div>
      </div>
    </div>
    <div className="row mb-3">
      <h4>Example Nav</h4>
      <h5>Navbar</h5>
      <div>
        <div class="card border-secondary">
          <div class="nav navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item ">
                  <a
                    class="nav-link active button"
                    onClick={onHomeClick}
                    role="button"
                  >
                    <i class="bi-house-fill"> </i>
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    onClick={onRecentClick}
                    role="button"
                  >
                    <i class="bi-fire"> </i>
                    Recent
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    onClick={onRecurrentClick}
                    role="button"
                  >
                    <i class="bi-repeat"> </i> Recurrent
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    onClick={onBoardsClick}
                    role="button"
                  >
                    <i class="bi-kanban"> </i>
                    Boards
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    href="https://near.social/#/devgovgigs.near/widget/TeamsList"
                    target="_blank"
                    title="View teams and permissions"
                    role="button"
                  >
                    <i class="bi-people-fill"> </i>
                    Teams
                  </a>
                </li>
                <li class="nav-item active ms-2">
                  <Typeahead
                    clearButton
                    id="basic-typeahead-single"
                    labelKey="name"
                    onChange={onLabelSelected}
                    options={wrappedLabels}
                    placeholder="Search"
                    defaultSelected={defaultSelectedLabels}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3"></div>
      <div>
        <div class="card border-secondary mb-3">
          <div class="nav navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <div class="navbar-brand">
                <Widget
                  src="mob.near/widget/ProfileImage"
                  props={{
                    metadata,
                    accountId,
                    widgetName,
                    style: {
                      height: "2.5em",
                      width: "2.5em",
                      minWidth: "2.5em",
                    },
                    className: "me-2",
                  }}
                />
              </div>
              <div class="nav navbar-brand h1">Create</div>
              <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      aria-current="page"
                      href="#"
                      data-bs-toggle="collapse"
                      href={`#collapseIdeaEditor${postId}`}
                      role="button"
                      aria-expanded="false"
                      aria-controls={`collapseIdeaEditor${postId}`}
                    >
                      <i class="bi-lightbulb-fill"> </i>
                      Idea
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      href="#"
                      data-bs-toggle="collapse"
                      href={`#collapseSubmissionEditor${postId}`}
                      role="button"
                      aria-expanded="false"
                      aria-controls={`collapseSubmissionEditor${postId}`}
                    >
                      <i class="bi-rocket-fill"> </i>
                      Solution
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      href="#"
                      data-bs-toggle="collapse"
                      href={`#collapseAttestationEditor${postId}`}
                      role="button"
                      aria-expanded="false"
                      aria-controls={`collapseAttestationEditor${postId}`}
                    >
                      <i class="bi-check-circle-fill"> </i>
                      Validation
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      href="#"
                      data-bs-toggle="collapse"
                      href={`#collapseOpenWebEditor${postId}`}
                      role="button"
                      aria-expanded="false"
                      aria-controls={`collapseOpenWebEditor${postId}`}
                    >
                      <i class="bi-globe"> </i>
                      Open Web
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ul className="nav nav-pills mb-3">
          {options.map((option, i) => (
            <li className="nav-item" key={i}>
              <button
                className={`nav-link ${option.disabled ? "disabled" : ""}`}
                aria-disabled={!!option.disabled}
                onClick={() => !option.disabled}
              ></button>
            </li>
          ))}
        </ul>
      </div>
      <h5>For Mobile</h5>
      <p>
        <i>className="d-lg-none" is hidden on a large screen</i>
      </p>
      <ul
        className="nav nav-pills nav-fill mb-3 d-lg-none"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="pills-abc-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-abc"
            type="button"
            role="tab"
            aria-controls="pills-abc"
            aria-selected="true"
          >
            ABC
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-xyz-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-xyz"
            type="button"
            role="tab"
            aria-controls="pills-xyz"
            aria-selected="false"
          >
            XYZ
          </button>
        </li>
      </ul>
      <div className="tab-content row p-0 d-lg-none" id="pills-tabContent">
        <div
          className="tab-pane show active d-lg-block col-lg-8"
          id="pills-abc"
          role="tabpanel"
          aria-labelledby="pills-abc-tab"
        >
          ABC
        </div>
        <div
          className="tab-pane d-lg-block col-lg-4"
          id="pills-xyz"
          role="tabpanel"
          aria-labelledby="pills-xyz-tab"
        >
          XYZ
        </div>
      </div>
    </div>
    <div className="row mb-3">
      <h5>Example Buttons</h5>
      <div>
        <Widget src="hack.near/widget/Styled" />
      </div>
    </div>
  </div>
);
