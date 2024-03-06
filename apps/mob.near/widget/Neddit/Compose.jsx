if (!context.accountId) {
  return "";
}

const subneddit =
  !props.subneddit || props.subneddit === "all" ? "" : props.subneddit;

const draftKey = "neddit";
const draft = Storage.privateGet(draftKey);

if (draft === null) {
  return "";
}

const [initialText] = useState(draft);

const composeData = () => {
  const data = {
    post: {
      main: JSON.stringify(Object.assign({ subneddit }, state.content)),
    },
    index: {
      neddit: JSON.stringify([
        {
          key: subneddit,
          value: {
            type: "md",
          },
        },
        {
          key: "all",
          value: {
            type: "md",
          },
        },
      ]),
      subneddits: JSON.stringify({
        key: "all",
        value: {
          subneddit,
        },
      }),
    },
  };

  const item = {
    type: "social",
    path: `${context.accountId}/post/main`,
  };

  const notifications = state.extractMentionNotifications(
    state.content.text,
    item
  );

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
        value: item,
      }))
    );
  }

  return data;
};

State.init({
  onChange: ({ content }) => {
    State.update({ content });
    Storage.privateSet(draftKey, content.text || "");
  },
});

return (
  <>
    <div style={{ margin: "0 -12px" }}>
      <Widget
        src="mob.near/widget/MainPage.N.Common.Compose"
        props={{
          placeholder: subneddit
            ? `What's happening in n/${subneddit}?`
            : `Select a subneddit to post`,
          onChange: state.onChange,
          initialText,
          onHelper: ({ extractMentionNotifications, extractHashtags }) => {
            State.update({ extractMentionNotifications, extractHashtags });
          },
          composeButton: (onCompose) => (
            <CommitButton
              disabled={!state.content || !subneddit}
              force
              className="btn btn-primary rounded-5"
              data={composeData}
              onCommit={() => {
                onCompose();
              }}
            >
              Post <span className="d-none d-lg-inline">{subneddit}</span>
            </CommitButton>
          ),
        }}
      />
    </div>
    {state.content && (
      <Widget
        key="post-preview"
        src="mob.near/widget/Neddit.Post"
        props={{
          subneddit,
          accountId: context.accountId,
          content: state.content,
          blockHeight: "now",
        }}
      />
    )}
  </>
);
