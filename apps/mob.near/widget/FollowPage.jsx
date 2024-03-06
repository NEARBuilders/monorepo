const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
`;

return (
  <Wrapper>
    <Widget
      src="mob.near/widget/ProfileLarge"
      props={{ accountId, profile, link: true }}
    />

    <Widget
      src="mob.near/widget/FollowTabs"
      props={{ accountId, tab: props.tab }}
    />
  </Wrapper>
);
