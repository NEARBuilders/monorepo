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
    <a href="https://www.near.org">
      <Widget
        src="mob.near/widget/Image"
        props={{
          className: "image",
          image: {
            url: "https://builders.mypinata.cloud/ipfs/QmXY7q9LeDDb6RuXTL7f1idv3ydjGcLqeHizFGjozbwxC9",
          },
          alt: "Built on NEAR",
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
