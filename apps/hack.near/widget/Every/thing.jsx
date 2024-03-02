const accountId = props.accountId ?? context.accountId ?? "every.near";
const thingId = props.thingId ?? "f8ad9d1a76259lmdpjnd74e69162a0a014";
const creatorId = props.creatorId ?? "devs.near";

const widgets = {
  thing: "hack.near/widget/thing.card",
  create: "hack.near/widget/thing.create",
  edit: "hack.near/widget/thing.edit",
};

const things = Social.index("every", "thing", { limit: 10 });

if (!things) {
  return "";
}

const isMember = Social.keys(`${accountId}/graph/${thingId}`, undefined, {
  values_only: true,
});

const type = join ? "leave" : "join";

const handleJoin = () => {
  Social.set({
    graph: { [thingId]: { [accountId]: "" } },
    index: {
      graph: JSON.stringify({
        key: thingId,
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
          message: "new connection!",
        },
      }),
    },
  });
};

const Container = styled.div`
  padding: 23px 0;
  margin: 0;

  .top-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .bell-icon {
    font-size: 23px;
    color: #fff;
    margin-left: 5px;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
  }

  .bell-icon:hover {
    color: #fff;
  }

  .bell-icon .bi-bell {
    display: inline;
  }

  .bell-icon .bi-bell-fill {
    display: none;
  }

  .bell-icon:hover .bi-bell {
    display: none;
  }

  .bell-icon:hover .bi-bell-fill {
    display: inline;
  }
`;

const Header = styled.div`
  background: black;

  .large-text {
    font-size: 19px;
    font-weight: 555;
  }
`;

const Navbar = styled.div`
  margin-left: 20px;
  @media only screen and (max-width: 1061px) {
    margin: 10px 0 0 0;
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
`;

const ThingCard = styled.div`
  flex-basis: calc(33.33% - 20px);
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;

  @media (hover: none) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const { Feed } = VM.require("efiz.near/widget/Module.Feed");
Feed = Feed || (() => <></>);

return (
  <>
    <Container>
      <Header className="d-flex p-3 px-4 align-items-center rounded justify-content-between">
        <a href="/near/widget/ProfilePage?accountId=devs.near">
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
        </a>
        <div className="ms-auto me-0 me-md-2 d-flex align-items-center">
          <div className="top-right">
            <a
              href={`/hack.near/widget/thing.index?thingId=${thingId}`}
              className="bell-icon"
            >
              <i className="bi bi-bell"></i>
              <i className="bi bi-bell-fill"></i>
            </a>
          </div>
        </div>
        <Navbar>
          {true ? (
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
        </Navbar>
      </Header>
      <Center className="px-2 px-md-3 d-flex flex-column justify-content-between w-100">
        <h4 className="mb-1 mt-5">Discover Things</h4>
        <div className="row">
          <Feed
            index={{
              action: "every",
              key: "thing",
              options: {
                limit: 10,
                order: "desc",
                accountId: undefined,
              },
            }}
            Item={(p) => {
              return (
                <Widget
                  key={p}
                  src={widgets.thing}
                  props={{
                    creatorId: p.accountId,
                    thingId: p.value.id,
                  }}
                />
              );
            }}
            Layout={Grid}
          />
        </div>
      </Center>
    </Container>
    {state.showModal && (
      <Widget
        src={widgets.create}
        props={{
          handleClose: () => State.update({ showModal: false }),
        }}
      />
    )}
    {state.showModalEdit && (
      <Widget
        src={widgets.edit}
        props={{
          thing: state.thing,
          handleClose: () => State.update({ showModalEdit: false }),
        }}
      />
    )}
  </>
);
