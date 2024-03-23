if (!context.accountId) {
  return "";
}

const item = props.item;
const rootItem = props.rootItem;

if (!context.accountId) {
  return "";
}

const composeData = () => {
  const data = {
    post: {
      comment: JSON.stringify(Object.assign({ item, rootItem }, state.content)),
    },
    index: {
      comment: JSON.stringify({
        key: item,
        value: {
          type: "md",
        },
      }),
    },
  };

  const thisItem = {
    type: "social",
    path: `${context.accountId}/post/comment`,
  };

  const notifications = state.extractMentionNotifications(
    state.content.text,
    thisItem
  );

  if (props.notifyAccountId && props.notifyAccountId !== context.accountId) {
    notifications.push({
      key: props.notifyAccountId,
      value: {
        type: "comment",
        item,
      },
    });
  }

  if (notifications.length) {
    data.index.notify = JSON.stringify(
      notifications.length > 1 ? notifications : notifications[0]
    );
  }

  const hashtags = state.extractHashtags(state.content.text);

  if (hashtags.length) {
    data.index.hashtag = JSON.stringify(
      hashtags.map((hashtag) => ({
        key: hashtag,
        value: thisItem,
      }))
    );
  }

  return data;
};

State.init({
  onChange: ({ content }) => {
    State.update({ content });
  },
});

return (
  <>
    <Widget
      src="app.near/widget/Components.Common.Compose"
      props={{
        placeholder: "Reply",
        initialText: props.initialText,
        onChange: state.onChange,
        onHelper: ({ extractMentionNotifications, extractHashtags }) => {
          State.update({ extractMentionNotifications, extractHashtags });
        },
        composeButton: (onCompose) => (
          <CommitButton
            disabled={!state.content}
            force
            className="btn btn-primary rounded-3"
            style={{
              background: "var(--active-color)",
              fontFamily: "Pixelify Sans, InterVariable, sans-serif",
              border: "1px solid var(--active-color)",
            }}
            data={composeData}
            onCommit={() => {
              onCompose();
              props.onComment && props.onComment(state.content);
            }}
          >
            Comment
          </CommitButton>
        ),
      }}
    />
    {state.content && (
      <Widget
        src="app.near/widget/Components.Comment"
        props={{
          item,
          accountId: context.accountId,
          content: state.content,
          blockHeight: "now",
        }}
      />
    )}
  </>
);
