const { accountId, value, blockHeight } = props;

const overlayStyle = {
  maxWidth: "30em",
  zIndex: 1070,
  maxHeight: "24em",
  overflow: "hidden",
};

const { content, popup } =
  value.item.path === `${accountId}/post/main`
    ? {
        content: (
          <a
            className="fw-bold text-muted"
            href={`/mob.near/widget/MainPage.N.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`}
          >
            post
          </a>
        ),
        popup: (
          <Widget
            src="mob.near/widget/MainPage.N.Post"
            props={{
              accountId,
              blockHeight,
              hideComments: true,
            }}
          />
        ),
      }
    : value.item.path === `${accountId}/post/comment`
    ? {
        content: (
          <a
            className="fw-bold text-muted"
            href={`/mob.near/widget/MainPage.N.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`}
          >
            comment
          </a>
        ),
        popup: (
          <Widget
            src="mob.near/widget/MainPage.N.Comment.Full"
            props={{
              accountId,
              blockHeight,
            }}
          />
        ),
      }
    : { content: "item???" };

return (
  <Widget
    loading={props.loading}
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: (
        <>
          mentioned you in their
          <Widget
            loading={content}
            src="mob.near/widget/N.Common.OverlayTrigger"
            props={{
              overlayStyle,
              popup,
              children: content,
            }}
          />
        </>
      ),
      R:
        value.item.path === `${accountId}/post/main` ? (
          <a
            className="btn btn-outline-dark rounded-5"
            href={`/mob.near/widget/MainPage.N.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`}
          >
            View post
          </a>
        ) : value.item.path === `${accountId}/post/comment` ? (
          <a
            className="btn btn-outline-dark rounded-5"
            href={`/mob.near/widget/MainPage.N.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`}
          >
            View comment
          </a>
        ) : (
          ""
        ),
      ...props,
    }}
  />
);
