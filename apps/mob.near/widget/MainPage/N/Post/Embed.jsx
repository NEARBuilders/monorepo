const Wrapper = styled.div`
  margin: 0 12px;
`;

return (
  <Wrapper>
    <Widget
      src="mob.near/widget/MainPage.N.Post"
      props={{
        ...props,
        noBorder: true,
        hideComments: true,
        truncateContent: true,
        noEmbed: true,
        hideButtons: true,
        hideMenu: true,
      }}
    />
  </Wrapper>
);
