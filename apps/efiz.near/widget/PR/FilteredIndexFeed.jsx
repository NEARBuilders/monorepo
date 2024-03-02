const filter = context.accountId && {
  ignore: Social.getr(`${context.accountId}/graph/hide`),
};

return (
  <Widget
    loading={props.loading}
    src="efiz.near/widget/PR.IndexFeed"
    props={{ filter, ...props }}
  />
);
