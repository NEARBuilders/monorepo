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

const content = (state.text || state.image.cid || state.image.url) && {
  type: "md",
  text: state.text,
  image: state.image.url
    ? { url: state.image.url }
    : state.image.cid
      ? { ipfs_cid: state.image.cid }
      : undefined,
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

const [markdownEditor, setMarkdownEditor] = useState(false);
const [gifSearch, setGifSearch] = useState(false);

const TextareaWrapper = styled.div`
  display: grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  align-items: stretch;

  textarea {
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
  }

  textarea::placeholder {
    padding-top: 4px;
    font-size: 20px;
  }

  textarea:focus::placeholder {
    font-size: inherit;
    padding-top: 0px;
  }

  &::after,
  textarea,
  iframe {
    width: 100%;
    padding: 8px 0;
    min-width: 1em;
    height: unset;
    min-height: 3em;
    font: inherit;
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: 0px solid #eee;
    grid-area: 1 / 1;
    overflow: hidden;
    outline: none;
  }

  iframe {
    padding: 0;
  }

  textarea:focus,
  textarea:not(:empty) {
    border-bottom: 1px solid var(--stroke);
    min-height: 5em;
  }

  &::after {
    content: attr(data-value) " ";
    visibility: hidden;
    white-space: pre-wrap;
  }
  &.markdown-editor::after {
    padding-top: 66px;
    font-family: monospace;
    font-size: 14px;
  }
`;

const Wrapper = styled.div`
  border: 1px solid var(--stroke);
  margin: 1rem;
  border-radius: 1rem;
  background: var(--bg1);
  line-height: normal;
  display: flex;
  padding: 12px 12px 6px;

  .left {
    min-width: 40px;
    margin-right: 12px;
  }
  .right {
    margin-top: -4px;
    flex-grow: 1;
    min-width: 0;

    textarea {
      color: var(--color);
    }
  }

  .up-buttons {
    margin-top: 6px;
    margin-left: -12px;
  }
`;

const embedCss = `
.rc-md-editor {
  border: 0;
}
.rc-md-editor .editor-container>.section {
  border: 0;
}
.rc-md-editor .editor-container .sec-md .input {
  overflow-y: auto;
  padding: 8px 0 !important;
  line-height: normal;
}
`;

const gifSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "1em", verticalAlign: "-0.125em" }}
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
    <text
      x="8"
      y="11"
      text-anchor="middle"
      font-size="7"
      stroke="currentColor"
      strokeWidth="0.5"
    >
      GIF
    </text>
  </svg>
);

const gifSearchWidget = useMemo(
  () =>
    gifSearch ? (
      <Widget
        src="mob.near/widget/N.GifSearch"
        props={{
          onHide: () => setGifSearch(false),
          onSelect: (gif) => {
            State.update({
              image: { url: gif.url },
            });
            setGifSearch(false);
          },
        }}
      />
    ) : undefined,
  [gifSearch],
);

return (
  <Wrapper>
    <div className="left">
      <Widget
        loading=""
        src="mob.near/widget/MainPage.N.Post.Left"
        props={{ accountId: context.accountId }}
      />
    </div>
    <div className="right">
      <TextareaWrapper
        className={markdownEditor ? "markdown-editor" : ""}
        data-value={state.text || ""}
      >
        {markdownEditor ? (
          <Widget
            key={`markdown-editor-${markdownEditor}`}
            src="mob.near/widget/MarkdownEditorIframe"
            props={{
              initialText: state.text,
              onChange,
              embedCss,
            }}
          />
        ) : (
          <textarea
            key="textarea"
            value={state.text || ""}
            onInput={(event) => onChange(event.target.value)}
            onKeyUp={(event) => {
              if (event.key === "Escape") {
                State.update({ showAccountAutocomplete: false });
              }
            }}
            placeholder={props.placeholder ?? "What's happening?"}
          />
        )}
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
      <div className="up-buttons d-flex flex-row">
        <div className="flex-grow-1 d-flex">
          <IpfsImageUpload
            image={state.image}
            className="btn btn-outline-secondary border-0 rounded-3"
          />
          <button
            className="btn btn-outline-secondary border-0 rounded-3"
            onClick={() =>
              setMarkdownEditor(markdownEditor ? false : Date.now())
            }
          >
            <i className="bi bi-code-square" />
          </button>
          <button
            className="btn btn-outline-secondary border-0 rounded-3"
            onClick={() => setGifSearch(!gifSearch)}
          >
            {gifSvg}
          </button>
        </div>
        <div>{props.composeButton && props.composeButton(onCompose)}</div>
      </div>
    </div>
    {gifSearchWidget}
  </Wrapper>
);
