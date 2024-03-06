const { Header } = VM.require("${config/account}/widget/components.Header") || {
  Header: () => <></>,
};

const { MarkdownView } = VM.require("${config/account}/widget/md-view") || {
  MarkdownView: () => <></>,
};

const mdPath = props.mdPath;

if (!mdPath) {
  return <p>No Markdown path configured</p>;
}

return (
  <div>
    <Header>{props.name}</Header>
    <MarkdownView path={mdPath} />
  </div>
);
