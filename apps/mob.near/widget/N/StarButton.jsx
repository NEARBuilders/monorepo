const item = props.item;

if (!item) {
  return "";
}

useEffect(() => {
  State.update({ hasStar: null });
}, [item]);

const stars = Social.index("star", item);

const dataLoading = stars === null;

const starsByUsers = {};

(stars || []).forEach((star) => {
  if (star.value.type === "star") {
    starsByUsers[star.accountId] = star;
  } else if (star.value.type === "unstar") {
    delete starsByUsers[star.accountId];
  }
});

if (state.hasStar === true) {
  starsByUsers[context.accountId] = {
    accountId: context.accountId,
  };
} else if (state.hasStar === false) {
  delete starsByUsers[context.accountId];
}

const accountsWithStars = Object.keys(starsByUsers);
const starCount = accountsWithStars.length;
const hasStar = context.accountId && !!starsByUsers[context.accountId];

const starSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0.5"
    viewBox="-2 -1 20 20"
    style={{ width: "1.25em" }}
  >
    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
  </svg>
);

const starFillSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0.5"
    viewBox="-2 -1 20 20"
    style={{ width: "1.25em" }}
  >
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
  </svg>
);

const StarButton = styled.div`
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
    color: #FFD700;

    .icon:before {
      background: rgba(255, 215, 0, 0.1);
    }
  }
  .stared {
    color: #FFD700;
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

const starClick = () => {
  if (state.loading || dataLoading || !context.accountId) {
    return;
  }
  State.update({
    loading: true,
  });
  const type = hasStar ? "unstar" : "star";
  const data = {
    index: {
      star: JSON.stringify({
        key: item,
        value: {
          type,
        },
      }),
    },
  };

  if (item.type === "social" && typeof item.path === "string") {
    const keys = item.path.split("/");
    if (keys.length > 0) {
      data.graph = {
        star: {},
      };
      let root = data.graph.star;
      keys.slice(0, -1).forEach((key) => {
        root = root[key] = {};
      });
      root[keys[keys.length - 1]] = hasStar ? null : "";
    }
  }

  if (!hasStar && props.notifyAccountId) {
    data.index.notify = JSON.stringify({
      key: props.notifyAccountId,
      value: {
        type,
        item,
      },
    });
  }
  Social.set(data, {
    onCommit: () => State.update({ loading: false, hasStar: !hasStar }),
    onCancel: () => State.update({ loading: false }),
  });
};

const title = hasStar
  ? props.titleUnstar ?? "Unstar"
  : props.titleStar ?? "Star";

const inner = (
  <div className="d-inline-flex align-items-center">
    <StarButton
      disabled={state.loading || dataLoading || !context.accountId}
      title={!props.tooltip ? title : undefined}
      onClick={starClick}
    >
      <span
        className={`icon ${state.loading ? "loading " : ""}${
          hasStar ? "stared" : ""
        }`}
      >
        {hasStar ? starFillSvg : starSvg}
      </span>
      {starCount > 0 && (
        <span className={`count ${hasStar ? "stared" : ""}`}>
          <Widget
            loading={starCount || ""}
            src="mob.near/widget/N.Overlay.Faces"
            props={{ accounts: starsByUsers, limit: 10 }}
          />
        </span>
      )}
    </StarButton>
  </div>
);

return props.tooltip ? (
  <OverlayTrigger
    placement={props.overlayPlacement ?? "auto"}
    overlay={<Tooltip>{title}</Tooltip>}
  >
    {inner}
  </OverlayTrigger>
) : (
  inner
);
