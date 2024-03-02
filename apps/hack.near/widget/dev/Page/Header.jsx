const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const defaultGuide = "hack.near/widget/DAO.Profile";

const guide = Social.get(`${daoId}/settings/dev/guide`);

if (guide === null) {
  return "Loading...";
}

State.init({
  guide: guide ?? defaultGuide,
});

const resetGuide = () => {
  state.guide = defaultGuide;
  State.update();
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #11181c;
  margin: 0;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
`;

const Item = styled.div``;

const Div = styled.div`
  position: relative;
  @media (hover: hover) {
    > .edit-link {
      display: none;
    }
  }
  &:hover {
    > .edit-link {
      display: inline;
    }
  }
`;

return (
  <div>
    <Wrapper>
      <Header>
        <H1>Guide for Builders</H1>

        <Header>
          <a className="btn btn-success" href={state.guide}>
            Start Here
          </a>
          <a
            className="btn btn-outline-primary"
            href="https://docs.near.org/discovery"
          >
            bOS Documentation
          </a>
        </Header>
        <Div>
          <h3>Featured Tutorial</h3>

          <div>
            <Widget
              src="miraclx.near/widget/Attribution"
              props={{
                dep: true,
                authors: [daoId],
              }}
            />
            {context.accountId && (
              <a
                key="edit"
                href={"#/hack.near/widget/dev.Guide.Editor"}
                className="edit-link position-absolute top-0 end-0 link-secondary me-2 mt-1"
              >
                <i class="bi bi-patch-plus" /> Make Changes
              </a>
            )}
          </div>
        </Div>
        <Items>
          <Item>
            <Widget
              src="adminalpha.near/widget/ComponentCard"
              props={{
                src: `${state.guide}`,
              }}
            />
          </Item>
        </Items>
      </Header>
    </Wrapper>
  </div>
);
