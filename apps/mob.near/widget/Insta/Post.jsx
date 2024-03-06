const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const postType = props.postType || "insta";
const path = `${accountId}/post/${postType}`;
const content =
  props.content ?? JSON.parse(Social.get(path, blockHeight) ?? "null");
if (!content.image) {
  return <></>;
}
const subscribe = !!props.subscribe;
const raw = !!props.raw;
const hideLink = !!props.hideLink;

const Wrapper = styled.div`
  @media (min-width: 576px) {
    max-width: 288px;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    opacity: 0;
    padding: 0.5em;
    box-shadow: inset 0 0 5em 4em #fff;
    transition: opacity 0.5s;
  }

  &:hover {
    .info {
      opacity: 1;
    }
  }
`;

const imageStyle = props.imageStyle ?? {
  objectFit: "cover",
};
const imageClassName = props.imageClassName ?? "w-100 h-100";

return (
  <Wrapper className="ratio ratio-1x1">
    <Widget
      src="mob.near/widget/Image"
      props={{
        image: content.image,
        style: imageStyle,
        className: imageClassName,
      }}
    />
    <div className="info">
      <div className="text-end position-relative flex-grow-1">
        {!hideLink && (
          <a
            href={`#/mob.near/widget/MainPage.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`}
            className="link-dark stretched-link"
            target="_blank"
          >
            <i className="fs-3 bi bi-link-45deg" />
          </a>
        )}
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <Widget
            src="mob.near/widget/LikeButton"
            props={{
              item: {
                type: "social",
                path,
                blockHeight,
              },
              notifyAccountId: accountId,
            }}
          />
        </div>
        <div>
          <a
            href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
            target="_blank"
          >
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                accountId,
                tooltip: true,
                imageStyle: {
                  objectFit: "cover",
                  boxShadow: "0 0 0.5em #333",
                },
              }}
            />
          </a>
        </div>
      </div>
    </div>
  </Wrapper>
);
