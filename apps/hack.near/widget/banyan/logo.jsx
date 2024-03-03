const authors = props.authors;

const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.5em 1em;

  .image {
    display: block;
    height: 2em;
    margin: 0.5em;
  }

  .attribution {
    display: block;
    height: 2em;
    margin: 0.3em;
  }
}`;

return (
  <Badge>
    <a href="https://www.banyan.gg">
      <Widget
        src="mob.near/widget/Image"
        props={{
          className: "image",
          image: {
            ipfs_cid: "QmYcKcQCU3etVQnkCrvn5jcHD2EVcG9WAmwgf445uXuBzL",
          },
          alt: "Banyan",
        }}
      />
    </a>
    {authors && (
      <div className="attribution">
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ dep: true, authors }}
        />
      </div>
    )}
  </Badge>
);
