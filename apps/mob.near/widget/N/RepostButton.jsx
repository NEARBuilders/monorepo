const item = props.item;
const indexKey = props.indexKey ?? "main";
const groupId = props.groupId;

if (!item) {
  return "";
}

const reposts = Social.index("repost", item);

const dataLoading = reposts === null;

const repostsByUsers = Object.fromEntries(
  (reposts || [])
    .filter((repost) => repost.value.type === "repost")
    .map((repost) => [repost.accountId, repost])
);

if (state.hasRepost === true) {
  repostsByUsers[context.accountId] = {
    accountId: context.accountId,
  };
}

const accountsWithReposts = Object.keys(repostsByUsers);
const repostCount = accountsWithReposts.length;
const hasRepost = context.accountId && !!repostsByUsers[context.accountId];

const RepostButton = styled.div`
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
    color: rgb(0, 184, 124);

    .icon:before {
      background: rgb(0, 184, 124, 0.1);
    }
  }

  .clicked {
    color: rgb(0, 184, 124);
  }
`;

const repostClick = (indexKey) => {
  if (state.loading) {
    return;
  }
  indexKey = indexKey ?? "main";
  State.update({
    loading: true,
  });
  const reposts = [
    {
      key: indexKey,
      value: {
        type: "repost",
        item,
      },
    },
  ];
  if (!hasRepost) {
    reposts.push({
      key: item,
      value: {
        type: "repost",
      },
    });
  }
  const data = {
    index: {
      repost: JSON.stringify(reposts),
    },
  };

  if (!hasRepost && props.notifyAccountId) {
    data.index.notify = JSON.stringify({
      key: props.notifyAccountId,
      value: {
        type: "repost",
        item,
      },
    });
  }
  Social.set(data, {
    onCommit: () => State.update({ loading: false, hasRepost: true }),
    onCancel: () => State.update({ loading: false }),
  });
};

const title = "Repost";

const repostSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "1.25em" }}
    fill="currentColor"
    viewBox="0 1 24 24"
    stroke="currentColor"
    strokeWidth="0.75"
  >
    <path
      fill-rule="evenodd"
      d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
      transform="rotate(180, 12, 12), translate(0, 4)"
    />
    <path
      fill-rule="evenodd"
      d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
      transform="translate(0, 4)"
    />
  </svg>
);

const quoteSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "1.25em" }}
    fill="currentColor"
    viewBox="-2 -2 20 20"
  >
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
  </svg>
);

const Loading = (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

return (
  <div
    className="d-inline-flex align-items-center"
    // style={props.debug ? { display: "block", height: "300px" } : {}}
  >
    <span>
      <RepostButton
        disabled={
          props.disabled || state.loading || dataLoading || !context.accountId
        }
        data-bs-toggle="dropdown"
        aria-expanded="false"
        title={title}
      >
        <span className={`icon ${hasRepost ? " clicked" : ""}`}>
          {repostSvg}
        </span>
        <span className={`count ${hasRepost ? "clicked" : ""}`}>
          <Widget
            loading={repostCount || ""}
            src="mob.near/widget/N.Overlay.Faces"
            props={{ accounts: repostsByUsers, limit: 10 }}
          />
        </span>
      </RepostButton>
      <ul className="dropdown-menu">
        <li>
          <button className="dropdown-item" onClick={() => repostClick("main")}>
            {state.loading && Loading} {repostSvg} Repost
          </button>
        </li>
        {groupId && (
          <li>
            <button
              className="dropdown-item"
              disabled={props.disableGroupRepost}
              onClick={() => repostClick(indexKey)}
            >
              {repostSvg} Repost to the group
            </button>
          </li>
        )}
        <li>
          <button className="dropdown-item" disabled={true}>
            {quoteSvg} Quote
          </button>
        </li>
      </ul>
    </span>
  </div>
);
