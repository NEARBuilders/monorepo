const accountId = props.accountId ?? context.accountId;

const item = props.item ?? "mob.near/widget/N.StarButton";

if (!item) {
  return "";
}

useEffect(() => {
  State.update({ hasVote: null });
}, [item]);

const votes = Social.index("vote", item);

const dataLoading = votes === null;

const votesByUsers = {};

(votes || []).forEach((vote) => {
  if (vote.value.type === "vote") {
    votesByUsers[vote.accountId] = vote;
  } else if (vote.value.type === "unvote") {
    delete votesByUsers[vote.accountId];
  }
});

if (state.hasVote === true) {
  votesByUsers[context.accountId] = {
    accountId: context.accountId,
  };
} else if (state.hasVote === false) {
  delete votesByUsers[context.accountId];
}

const accountsWithVotes = Object.keys(votesByUsers);
const voteCount = accountsWithVotes.length;
const hasVote = context.accountId && !!votesByUsers[context.accountId];

const voteSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0.5"
    viewBox="-2 -1 20 20"
    style={{ width: "1.888em" }}
  >
    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
  </svg>
);

const voteFillSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0.5"
    viewBox="-2 -1 20 20"
    style={{ width: "1.888em" }}
  >
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
  </svg>
);

const VoteButton = styled.div`
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
  .upvoted {
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

const voteClick = () => {
  if (state.loading || dataLoading || !context.accountId) {
    return;
  }
  State.update({
    loading: true,
  });
  const type = hasVote ? "unvote" : "vote";
  const data = {
    index: {
      vote: JSON.stringify({
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
        vote: {},
      };
      let root = data.graph.vote;
      keys.slice(0, -1).forEach((key) => {
        root = root[key] = {};
      });
      root[keys[keys.length - 1]] = hasVote ? null : "";
    }
  }

  if (!hasVote && props.notifyAccountId) {
    data.index.notify = JSON.stringify({
      key: props.notifyAccountId,
      value: {
        type,
        item,
      },
    });
  }
  Social.set(data, {
    onCommit: () => State.update({ loading: false, hasVote: !hasVote }),
    onCancel: () => State.update({ loading: false }),
  });
};

const title = hasVote
  ? props.titleUnvote ?? "Unvote"
  : props.titleVote ?? "Vote";

const inner = (
  <div className="d-inline-flex align-items-center">
    <VoteButton
      disabled={state.loading || dataLoading || !context.accountId}
      title={!props.tooltip ? title : undefined}
      onClick={voteClick}
    >
      <span
        className={`icon ${state.loading ? "loading " : ""}${
          hasVote ? "upvoted" : ""
        }`}
      >
        {hasVote ? voteFillSvg : voteSvg}
      </span>
      {voteCount > 0 && (
        <span className={`count ${hasVote ? "upvoted" : ""}`}>
          <Widget
            loading={voteCount || ""}
            src="mob.near/widget/N.Overlay.Faces"
            props={{ accounts: votesByUsers, limit: 10 }}
          />
        </span>
      )}
    </VoteButton>
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
