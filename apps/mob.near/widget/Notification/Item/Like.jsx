const { accountId, value } = props;

const overlayStyle = {
  maxWidth: "30em",
  zIndex: 1070,
  maxHeight: "24em",
  overflow: "hidden",
};

const { content, popup } =
  value.item.path === `${context.accountId}/post/main`
    ? {
        content: (
          <a
            className="fw-bold text-muted"
            href={`/mob.near/widget/MainPage.N.Post.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
          >
            post
          </a>
        ),
        popup: (
          <Widget
            src="mob.near/widget/MainPage.N.Post"
            props={{
              accountId: context.accountId,
              blockHeight: value.item.blockHeight,
              hideComments: true,
            }}
          />
        ),
      }
    : value.item.path === `${context.accountId}/post/comment`
    ? {
        content: (
          <a
            className="fw-bold text-muted"
            href={`/mob.near/widget/MainPage.N.Comment.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
          >
            comment
          </a>
        ),
        popup: (
          <Widget
            src="mob.near/widget/MainPage.N.Comment.Full"
            props={{
              accountId: context.accountId,
              blockHeight: value.item.blockHeight,
            }}
          />
        ),
      }
    : value.item.path === `${context.accountId}/post/insta`
    ? {
        content: (
          <a
            className="fw-bold text-muted"
            href={`/mob.near/widget/Insta.Post.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
          >
            insta
          </a>
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
          liked your
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
        value.item.path === `${context.accountId}/post/main` ? (
          <a
            className="btn btn-outline-dark rounded-5"
            href={`/mob.near/widget/MainPage.N.Post.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
          >
            View post
          </a>
        ) : value.item.path === `${context.accountId}/post/comment` ? (
          <a
            className="btn btn-outline-dark rounded-5"
            href={`/mob.near/widget/MainPage.N.Comment.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
          >
            View comment
          </a>
        ) : value.item.path === `${context.accountId}/post/insta` ? (
          <a
            className="btn btn-outline-dark rounded-5"
            href={`/mob.near/widget/Insta.Post.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
          >
            View insta
          </a>
        ) : (
          ""
        ),
      ...props,
    }}
  />
);
