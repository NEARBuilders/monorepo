const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const defaultProject = "hack.near/widget/DAO.Profile";

const project = Social.get(`${accountId}/settings/dev/project`);

if (project === null) {
  return "Loading...";
}

State.init({
  project: project ?? defaultProject,
});

const resetProject = () => {
  state.project = defaultProject;
  State.update();
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 48px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

return (
  <Wrapper>
    <Header>
      <Widget src="hack.near/widget/dev.Page.Header" />
    </Header>
    <div>
      <h4>Edit Your Portfolio</h4>
      <input type="text" value={state.project} placeholder={defaultProject} />
      <CommitButton
        className="btn btn-outline-success ms-2 mt-3"
        disabled={state.project === defaultProject}
        data={{ settings: { dev: { project: state.project } } }}
      >
        Save
      </CommitButton>
      {state.project !== defaultProject && (
        <button
          className="btn btn-outline-secondary ms-2 mt-3"
          onClick={resetProject}
        >
          Reset
        </button>
      )}
      {state.project !== defaultProject && (
        <button
          className="btn btn-outline-primary ms-2 mt-3"
          onClick={handleProposal}
        >
          Propose to Be Featured
        </button>
      )}
    </div>
    <Widget src={state.project} props={{ accountId, daoId }} />
  </Wrapper>
);
