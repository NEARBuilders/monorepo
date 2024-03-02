const { isVerified } = props;

const widget = {
  styledComponents: "hack.near/widget/n.style",
};

const Header = styled.div`
  background: black;
`;

const Toolbar = styled.div`
  margin-left: 20px;
  @media only screen and (max-width: 1061px) {
    margin: 10px 0 0 0;
  }
`;

return (
  <Header className="d-flex p-3 px-4 align-items-center rounded justify-content-between">
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        accountId: "build.sputnik-dao.near",
      }}
    />
    {!isVerified ? (
      <Widget
        src={widget.styledComponents}
        props={{
          Link: {
            text: "Get Verified",
            href: "https://i-am-human.app",
          },
        }}
      />
    ) : (
      <Toolbar>
        <Widget src="hack.near/widget/start" />
      </Toolbar>
    )}
  </Header>
);
