const post = props.value;

const Post = styled.div`
  border-bottom: 1px solid #eceef0;
  padding: 24px 0 12px;

  @media (max-width: 1200px) {
    padding: 12px 0 0;
  }
`;

if (post.type === "md") {
  return (
    <Post className="post" key={post.text}>
      {post.text}
    </Post>
  );
} else {
  return <div>{`post type: ${post.type} is not yet supported`}</div>;
}
