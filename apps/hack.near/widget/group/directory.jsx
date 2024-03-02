const creatorId = "hack.near";
const accountId = props.accountId ?? context.accountId;
const communityId = props.communityId ?? "everyone";

const widgets = {
  header: "hack.near/widget/page.navbar",
  card: "hack.near/widget/group.card",
  about: "hack.near/widget/page.sidebar",
  style: "hack.near/widget/NDC.StyledComponents",
  cta: "hack.near/widget/page.cta",
  create: "hack.near/widget/group.create",
  edit: "hack.near/widget/group.edit",
};

const groups = Social.get(`${creatorId}/thing/directory`);

if (!groups) {
  return "";
}

const groupArray = JSON.parse(groups);

const widget = {
  style: "hack.near/widget/NDC.StyledComponents",
};

const { isVerified } = props;

const isMember = Social.keys(
  `${accountId}/graph/${communityId}/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const Container = styled.div`
  padding: 30px 0;
  margin: 0;
`;

const ActivityContainer = styled.div`
  overflow-y: scroll;
`;

const Left = styled.div`
  padding: 20px;
  background: #f8f8f9;
  border-radius: 8px;
`;

const Center = styled.div``;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
        color: #fff;
        background: #4ba6ee;

        &:hover {
          background: #3b86cb;
        }

`;

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
  <>
    <div>
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
          <Widget
            src={widget.style}
            props={{
              Link: {
                text: "START",
                href: "https://shard.dog/nearweek",
                className: "primary dark bold-text large-text",
              },
            }}
          />
        ) : (
          <Toolbar>
            {isMember && Object.keys(isMember).length ? (
              <Widget
                src={widget.style}
                props={{
                  Button: {
                    text: "CREATE",
                    onClick: () => State.update({ showModal: true }),
                    className: "primary dark bold-text large-text",
                  },
                }}
              />
            ) : (
              <Widget
                src={widget.style}
                props={{
                  Button: {
                    text: "JOIN",
                    onClick: () =>
                      Social.set({
                        graph: { [communityId]: { [accountId]: "" } },
                      }),
                    className: "primary dark bold-text large-text",
                  },
                }}
              />
            )}
          </Toolbar>
        )}
      </Header>
      <Container className="d-flex row justify-content-between w-100">
        <Left className="col-lg mb-3">
          <H5>About</H5>
          <Widget src={widgets.about} />
        </Left>
        <Center className="col-lg-9 px-2 px-md-3 d-flex flex-column">
          <H5 className="m-2 mb-3">Groups</H5>
          <div className="d-flex flex-row flex-wrap">
            {groupArray.map((group, i) => (
              <Widget
                key={i}
                src={widgets.card}
                props={{
                  groupId: group,
                }}
              />
            ))}
          </div>
        </Center>
      </Container>
    </div>

    <>
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
            group: state.group,
            handleClose: () => State.update({ showModalEdit: false }),
          }}
        />
      )}
    </>
  </>
);
