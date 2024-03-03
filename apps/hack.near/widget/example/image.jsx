const accountId =
  "9be7f29f69c042f3d394b93755b820298abdd661ebb866c5d09fc8762929ba69";

const blockHeight = "96909218";

const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/main`, blockHeight) ?? "null");

return (
  <>
    <Widget
      src="mob.near/widget/Image"
      props={{
        image: content.image,
        className: "img-fluid rounded-3",
        style: { maxHeight: "100vh" },
      }}
    />
  </>
);
