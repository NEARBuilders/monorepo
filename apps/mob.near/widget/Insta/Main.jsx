const Wrapper = styled.div`
  > div {
    display: flex;
    flex-wrap: wrap; 
  }
`;

return (
  <Wrapper>
    <Widget
      src="mob.near/widget/Image.Feed"
      props={{
        headerElement: (
          <Widget src="mob.near/widget/Insta.Compose" props={{}} />
        ),
      }}
    />
  </Wrapper>
);
