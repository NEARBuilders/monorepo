const item = props.item;

if (!item) {
  return "";
}

useEffect(() => {
  State.update({ hasLike: null });
}, [item]);

const likes = Social.index("like", item);

const dataLoading = likes === null;

const likesByUsers = {};

(likes || []).forEach((like) => {
  if (like.value.type === "like") {
    likesByUsers[like.accountId] = like;
  } else if (like.value.type === "unlike") {
    delete likesByUsers[like.accountId];
  }
});
if (state.hasLike === true) {
  likesByUsers[context.accountId] = {
    accountId: context.accountId,
  };
} else if (state.hasLike === false) {
  delete likesByUsers[context.accountId];
}

const accountsWithLikes = Object.keys(likesByUsers);
const likeCount = accountsWithLikes.length;
const hasLike = context.accountId && !!likesByUsers[context.accountId];

const heartSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="-2 -2 20 20"
    stroke="currentColor"
    strokeWidth="0.5"
    style={{ width: "1.25em" }}
  >
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
  </svg>
);

const heartFillSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "1.25em" }}
    fill="currentColor"
    viewBox="-2 -2 20 20"
    stroke="currentColor"
    strokeWidth="0.5"
  >
    <path
      fill-rule="evenodd"
      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
    />
  </svg>
);

const LikeButton = styled.div`
  line-height: 20px;
  min-height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: left;
  background: inherit;
  color: inherit;
  font-size: 16px;
  .icon {
    position: relative;
    &:before {
      margin: -8px;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      border-radius: 50%;
    }
  }

  .count {
    margin-left: 8px;
  }

  &:not([disabled]) {
    cursor: pointer;
  }

  &:not([disabled]):hover {
    opacity: 1 !important;
    color: red;

    .icon:before {
      background: rgba(255, 0, 0, 0.1);
    }
  }
  .liked {
    color: red;
  }

  .loading {
    @keyframes scaleAnimation {
     0%, 100% {
        transform: scale(1) rotate(0deg);
      }
      25% {
        transform: scale(1.2) rotate(-15deg);
      }
      50% {
        transform: scale(1) rotate(0deg);
      }
      75% {
        transform: scale(1.2) rotate(15deg);
      }
    }

    transform-origin: center;
    animation: scaleAnimation 1s ease-in-out infinite;
  }
`;

const likeClick = () => {
  if (state.loading || dataLoading || !context.accountId) {
    return;
  }
  State.update({
    loading: true,
  });
  const data = {
    index: {
      like: JSON.stringify({
        key: item,
        value: {
          type: hasLike ? "unlike" : "like",
        },
      }),
    },
  };

  if (!hasLike && props.notifyAccountId) {
    data.index.notify = JSON.stringify({
      key: props.notifyAccountId,
      value: {
        type: "like",
        item,
      },
    });
  }
  Social.set(data, {
    onCommit: () => State.update({ loading: false, hasLike: !hasLike }),
    onCancel: () => State.update({ loading: false }),
  });
};

const title = hasLike ? "Unlike" : "Like";

return (
  <div className="d-inline-flex align-items-center">
    <LikeButton
      disabled={state.loading || dataLoading || !context.accountId}
      title={title}
      onClick={likeClick}
    >
      <span
        className={`icon ${state.loading ? "loading " : ""}${
          hasLike ? "liked" : ""
        }`}
      >
        {hasLike ? heartFillSvg : heartSvg}
      </span>
      <span className={`count ${hasLike ? "liked" : ""}`}>
        <Widget
          loading={likeCount || ""}
          src="mob.near/widget/N.Overlay.Faces"
          props={{ accounts: likesByUsers, limit: 10 }}
        />
      </span>
    </LikeButton>
  </div>
);
