const renderMention =
  props.renderMention ??
  props.onMention ??
  ((accountId) => (
    <span key={accountId} className="d-inline-flex" style={{ fontWeight: 500 }}>
      <Widget
        src="mob.near/widget/ProfileLine"
        props={{
          accountId: accountId.toLowerCase(),
          hideAccountId: true,
          tooltip: true,
        }}
      />
    </span>
  ));

const onHashtag = props.onHashtag;

const Wrapper = styled.div`
  word-break: break-word;
  p {
    white-space: pre-line;
  }
`;

return (
  <Wrapper>
    <Markdown
      text={props.text}
      onMention={renderMention}
      onHashtag={onHashtag}
    />
  </Wrapper>
);
