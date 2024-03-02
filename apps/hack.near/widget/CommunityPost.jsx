const hashtag = props.hashtag ?? "builders";
const autocompleteEnabled = props.autocompleteEnabled ?? true;

if (state.image === undefined) {
  State.init({
    image: {},
    text: props.initialText || "",
  });

  if (props.onHelper) {
    const extractMentions = (text) => {
      const mentionRegex =
        /@((?:(?:[a-z\d]+[-_])*[a-z\d]+\.)*(?:[a-z\d]+[-_])*[a-z\d]+)/gi;
      mentionRegex.lastIndex = 0;
      const accountIds = new Set();
      for (const match of text.matchAll(mentionRegex)) {
        if (
          !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
          !/[/\w`]/.test(match.input.charAt(match.index + match[0].length)) &&
          match[1].length >= 2 &&
          match[1].length <= 64
        ) {
          accountIds.add(match[1].toLowerCase());
        }
      }
      return [...accountIds];
    };

    const extractHashtags = (text) => {
      const hashtagRegex = /#(\w+)/gi;
      hashtagRegex.lastIndex = 0;
      const hashtags = new Set();
      for (const match of text.matchAll(hashtagRegex)) {
        if (
          !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
          !/[/\w`]/.test(match.input.charAt(match.index + match[0].length))
        ) {
          hashtags.add(match[1].toLowerCase());
        }
      }
      return [...hashtags];
    };

    const extractMentionNotifications = (text, item) =>
      extractMentions(text || "")
        .filter((accountId) => accountId !== context.accountId)
        .map((accountId) => ({
          key: accountId,
          value: {
            type: "mention",
            item,
          },
        }));

    props.onHelper({
      extractHashtags,
      extractMentions,
      extractTagNotifications: extractMentionNotifications,
      extractMentionNotifications,
    });
  }
}

const content = (state.text || state.image.cid) && {
  type: "md",
  text: state.text + `#${hashtag}`,
  image: state.image.cid ? { ipfs_cid: state.image.cid } : undefined,
};

if (content && props.extraContent) {
  Object.assign(content, props.extraContent);
}

function autoCompleteAccountId(id) {
  let text = state.text.replace(/[\s]{0,1}@[^\s]*$/, "");
  text = `${text} @${id}`.trim() + " ";
  State.update({ text, showAccountAutocomplete: false });
}

const onChange = (text) => {
  const showAccountAutocomplete = /@[\w][^\s]*$/.test(text);
  State.update({ text, showAccountAutocomplete });
};

const jContent = JSON.stringify(content);
if (props.onChange && jContent !== state.jContent) {
  State.update({
    jContent,
  });
  props.onChange({ content });
}

const onCompose = () => {
  State.update({
    image: {},
    text: "",
  });
};

const TextareaWrapper = styled.div`
  display: grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  align-items: stretch;

  &::after,
  textarea {
    width: 100%;
    min-width: 1em;
    height: unset;
    min-height: 5em;
    font: inherit;
    padding: var(--padding) var(--padding) calc(40px + (var(--padding) * 2)) calc(40px + (var(--padding) * 2));
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: none;
    grid-area: 1 / 1;
    overflow: hidden;
    outline: none;
  }

  &::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
  }
`;

return (
  <div className="text-bg-light rounded-4">
    <TextareaWrapper className="p-3" data-value={state.text || `#${hashtag}`}>
      <textarea
        value={state.text || `#${hashtag}`}
        onInput={(event) => onChange(event.target.value)}
        onKeyUp={(event) => {
          if (event.key === "Escape") {
            State.update({ showAccountAutocomplete: false });
          }
        }}
        placeholder={props.placeholder ?? "#community"}
      />
      {autocompleteEnabled && state.showAccountAutocomplete && (
        <div className="pt-1 w-100 overflow-hidden">
          <Widget
            src="mob.near/widget/AccountAutocomplete"
            props={{
              term: state.text.split("@").pop(),
              onSelect: autoCompleteAccountId,
              onClose: () => State.update({ showAccountAutocomplete: false }),
            }}
          />
        </div>
      )}
    </TextareaWrapper>
    <div className="d-flex flex-row p-2 border-top">
      <div className="flex-grow-1">
        <IpfsImageUpload
          image={state.image}
          className="btn btn-outline-secondary border-0 rounded-3"
        />
      </div>
      <div>{props.composeButton && props.composeButton(onCompose)}</div>
    </div>
  </div>
);
