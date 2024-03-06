return (
  <Widget
    src="mob.near/widget/MainPage.N.Post"
    props={{
      ...props,
      noBorder: true,
      commentsLimit: 30,
      subscribe: true,
      truncateContent: false,
    }}
  />
);
