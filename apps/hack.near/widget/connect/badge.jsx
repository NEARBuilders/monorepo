const orgId = props.orgId ?? "freelancerdao.near";

const accountId = props.accountId;

if (!accountId) {
  return "";
}

const connectionData = Social.keys(
  `${orgId}/graph/connect/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const connected = Object.keys(connectionData || {}).length > 0;

const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.5em 1em;

  .image {
    display: block;
    height: 7em;
    margin: 0.5em;
  }
}`;

return (
  <Badge>
    {connected ? (
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: {
            ipfs_cid: "QmcxtybPoeXG1ypbDQDNe4U2c4cNFW4KeuQ5q42gZwnceV",
          },
          alt: "connected",
          className: "image",
          thumbnail,
        }}
      />
    ) : (
      <h5>none found</h5>
    )}
  </Badge>
);
