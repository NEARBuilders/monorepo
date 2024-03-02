const orgId = props.orgId ?? "rc-dao.near";

const className = props.className ?? "profile-image d-inline-block";
const style = props.style ?? { width: "3em", height: "3em" };
const imageStyle = props.imageStyle ?? { objectFit: "cover" };
const imageClassName = props.imageClassName ?? "rounded w-100 h-100";
const thumbnail = props.thumbnail ?? "thumbnail";

const accountId = props.accountId ?? context.accountId;
let profileId = props.profileId ?? context.accountId;

State.init({
  profileId,
});

const profile = props.profile ?? Social.getr(`${profileId}/profile`);

if (profile === null) {
  return "";
}

if (profileId === context.accountId) {
}

const onChangeProfile = (profileId) => {
  State.update({
    profileId,
  });
};

return (
  <>
    <div className="d-flex flex-wrap justify-content-between m-2">
      <div className="m-2">
        <h2 className="mb-1">view badges</h2>
      </div>
      <div className="m-2">
        <a
          href={`#/near/widget/ProfilePage?accountId=every.near`}
          className="text-muted"
        >
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{ accountId: "rc-dao.sputnik-dao.near" }}
          />
        </a>
      </div>
    </div>
    <div className="m-3">
      <h5 className="mb-1">explore profiles</h5>
      <p className="mb-1">
        <i> ↳ input a NEAR accountId:</i>
      </p>
    </div>
    <div className="d-flex gap-3 m-3">
      <input
        value={state.profileId}
        onChange={(e) => onChangeProfile(e.target.value)}
        placeholder="<example>.near"
      />
    </div>
    <div className="bg-white shadow rounded overflow-hidden m-4">
      <div className="px-4 pb-4">
        <div className="d-md-flex justify-content-between">
          <div className="me-3 row align-items-center">
            <div className="col-auto">
              <Widget
                src="hack.near/widget/profile.human"
                props={{ accountId: state.profileId }}
              />
            </div>
          </div>
          <div className="col-auto m-3">
            <Widget
              src="hack.near/widget/gov.badge"
              props={{
                accountId: state.profileId,
                orgId: "rc-dao.near",
              }}
            />
          </div>
        </div>
        <div className="me-3 d-sm-flex gap-1 mt-3 flex-row align-items-center">
          <Widget
            src="hack.near/widget/connect.button"
            props={{ accountId: state.profileId }}
          />
          {state.profileId === context.accountId && (
            <Widget
              src="near/widget/DIG.Button"
              props={{
                href: "#/near/widget/ProfileEditor",
                label: "Edit Profile",
                variant: "outline-dark",
                size: "small",
              }}
            />
          )}
        </div>
      </div>
    </div>
    <div className="m-5">
      <h3 className="mb-3">network</h3>
      <div>
        <Widget
          src="hack.near/widget/connect.stats"
          props={{ accountId: state.profileId }}
        />
      </div>
      <hr />
      <Widget
        src="hack.near/widget/connections"
        props={{ accountId: state.profileId }}
      />
    </div>
  </>
);
