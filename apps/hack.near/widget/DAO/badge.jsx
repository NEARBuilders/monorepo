const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: top;
  width: 100%;

  .image {
    display: block;
    height: 8em;
  }
}`;

return (
  <Badge>
    <a href="https://map.near.social">
      <Widget
        src="mob.near/widget/Image"
        props={{
          className: "image",
          image: {
            ipfs_cid: "QmarYAFy72CK8XFqM5iAB3mwZMTtWj76d2p8uNwCPdAraK",
          },
          alt: "Voter",
        }}
      />
    </a>
  </Badge>
);
