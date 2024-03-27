const accountId = props.accountId ?? context.accountId;

const profileLayout = Social.getr(`${accountId}/profile`).profileLayout;

return profileLayout === "pixel" ? (
  <Widget src="app.near/widget/Profile.Pixel" props={props} />
) : (
  <Widget src="app.near/widget/Profile.Modern" props={props} />
);
