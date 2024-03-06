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
    border-bottom: 1px solid #eee;
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

const MarkdownEditor = `
  html {
    background: #000000;
  }
  
  * {
    border: none !important;
  }

  .rc-md-editor {
    background: #3c3d43;
    border-top: 1px solid #3c3d43 !important; 
    border-radius: 8px;
  }

  .editor-container {
    background: #3c3d43;
  }
  
  .drop-wrap {
    
    border-radius: 0.5rem !important;
  }

  .header-list {
    display: flex;
    align-items: center;
  }

  textarea {
    background: #000000 !important;
    color: #fff !important;

    font-family: sans-serif !important;
    font-size: 1rem;

    border: 1px solid #3c3d43 !important;
    border-top: 0 !important;
    border-radius: 0 0 8px 8px;
  }

  .rc-md-navigation {
    background: #000000 !important;
    border: 1px solid #3c3d43 !important;
    border-top: 0 !important;
    border-bottom: 0 !important;
    border-radius: 8px 8px 0 0;
  
    i {
      color: #cdd0d5;
    }
  }

  .editor-container {
    border-radius: 0 0 8px 8px;
  }

  .rc-md-editor .editor-container .sec-md .input {
    overflow-y: auto;
    padding: 8px !important;
    line-height: normal;
    border-radius: 0 0 8px 8px;
  }
`;

const Label = styled.label`
  color: var(--label-color, #fff);

  /* Body/16px */
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 27.2px */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

function TextEditor({ value, label, onChange, maxWidth }) {
  return (
    <Container>
      <Label>{label}</Label>
      <TextareaWrapper
        className="markdown-editor"
        data-value={value || ""}
        style={{ maxWidth: maxWidth ? maxWidth : "550px" }}
      >
        <Widget
          src="mob.near/widget/MarkdownEditorIframe"
          props={{
            initialText: value,
            embedCss: props.EditorCSS || MarkdownEditor,
            onChange,
          }}
        />
      </TextareaWrapper>
    </Container>
  );
}

return { TextEditor };
