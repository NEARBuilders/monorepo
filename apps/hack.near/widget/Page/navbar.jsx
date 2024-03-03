const accountId = props.accountId ?? context.accountId;
const groupId = props.groupId ?? "f8ad9d1a76259lmdpjnd74e69162a0a014";
const creatorId = props.creatorId ?? "hack.near";

const { isVerified } = props;

const isMember = Social.keys(
  `${creatorId}/graph/${groupId}/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const type = join ? "leave" : "join";

const handleJoin = () => {
  Social.set({
    graph: { [groupId]: { [accountId]: "" } },
    index: {
      graph: JSON.stringify({
        key: groupId,
        value: {
          type,
          accountId,
        },
      }),
      notify: JSON.stringify({
        key: creatorId,
        value: {
          type,
          accountId,
          message: "everyone is growing!",
        },
      }),
    },
  });
};

const Header = styled.div`
  background: black;

  .large-text {
  font-size: 19px;
  font-weight: 555;
}
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
      src="mob.near/widget/Image"
      props={{
        image: {
          url: "https://pbs.twimg.com/profile_images/1690850854457204736/KUXVTpZt_400x400.png",
        },
        alt: "Near Builders",
        style: {
          height: "42px",
          objectFit: "cover",
        },
      }}
    />
    {!context.accountId ? (
      <a href="https://shard.dog/nearweek" className="btn btn-success">
        news
      </a>
    ) : (
      <Toolbar>
        {isMember && Object.keys(isMember).length ? (
          <button
            onClick={() => State.update({ showModal: true })}
            className="btn btn-success"
          >
            create
          </button>
        ) : (
          <button onClick={handleJoin} className="btn btn-success">
            start
          </button>
        )}
      </Toolbar>
    )}
  </Header>
);
