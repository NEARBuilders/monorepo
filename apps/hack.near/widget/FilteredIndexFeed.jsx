// Widget based on mob.near/widget/FilteredIndexFeed

const filter = context.accountId && {
  ignore: Social.getr(`${context.accountId}/graph/hide`),
};

return <Widget src="hack.near/widget/IndexFeed" props={{ filter, ...props }} />;
