return (
  <Widget
    src="mob.near/widget/MainPage.Feed"
    config={{
      redirectMap: {
        "mob.near/widget/TimeAgo": "gov.near/widget/TimeAgo",
        "mob.near/widget/LikeButton": {
          code: `return "No likes for you!"`,
        },
      },
      redirect: (src) => {
        if (src.startsWith("alice.near/")) {
          return src.replace("alice.near/", "bob.near/");
        }
        return null;
      },
    }}
    props={{}}
  />
);
