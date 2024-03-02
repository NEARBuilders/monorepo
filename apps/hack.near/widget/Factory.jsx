const accountId = context.accountId;

let project = Social.getr(`${accountId}/project`);

State.init({
  project,
});

return (
  <>
    <div className="container">
      <div className="row mb-3">
        <div>
          <h1>Widget Factory</h1>
          <h3>
            <b>Guide:</b> Open Web Development
          </h3>
          <p>
            The <i>composability</i> of blockchain-based frontend solutions
            changes the game for web developers! Below are useful resources for
            anyone building on Near Social.
          </p>
          <a
            className="btn btn-success"
            href="https://near.social/#/hack.near/widget/Docs"
          >
            Docs
          </a>
          <a
            className="btn btn-primary"
            href="https://near.social/#/hack.near/widget/Tutorial"
          >
            Tutorial
          </a>
        </div>
      </div>
      <div className="row mb-3">
        <div>
          <h3>Reusable Components</h3>
          <h5>Explore available building blocks!</h5>
          <div className="mb-3"></div>
          <a
            className="btn btn-outline-primary"
            href="https://near.social/#/mob.near/widget/AllWidgets"
          >
            All Widgets
          </a>
          <a
            className="btn btn-outline-primary"
            href="https://near.social/#/mob.near/widget/LastWidgets"
          >
            Latest
          </a>
        </div>
      </div>
      <div className="row mb-3">
        <div>
          <Widget src="mob.near/widget/Applications" />
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row mb-3">
        <h1>Examples</h1>
        <h3>Widget src="mob.near/widget/Profile"</h3>
        <Widget src="mob.near/widget/Profile" />
        <div className="row mb-3"></div>
        <h3>Commit Buttons</h3>
        <div>
          <ul>
            <li>
              <a href="https://github.com/NearSocial/viewer/blob/master/src/components/Commit.js">
                Commit.js of Near Social Viewer App
              </a>
            </li>
            <li>
              <a href="https://github.com/NearSocial/viewer/blob/master/src/vm/vm.js#L20">
                `Commit` imported to vm.js
              </a>
            </li>
            <li>
              <a href="https://github.com/NearSocial/viewer/blob/master/src/pages/EditorPage.js#L344-L360">
                `CommitButton` in EditorPage.js
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="mb-2">
          <h5>Project Page Widget Source</h5>
          <Widget
            src="gov.near/widget/MetadataEditor"
            props={{
              initialMetadata: project,
              onChange: (project) => State.update({ project }),
              options: {
                featuredWidget: {
                  label: "Example: mob.near/widget/Applications",
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
            View
          </a>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row mb-3">
        <h3>react-bootstrap</h3>
        <h4>Example Buttons</h4>
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
        <div className="mt-3">
          <h4>Example Alerts</h4>
          <div className="mb-3"></div>
          <div className="alert alert-warning rounded-4 mb-3">
            <div className="text">
              <div className="fw-bold">Sample Text</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
