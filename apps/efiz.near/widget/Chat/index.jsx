// TODO //
// create feed modal (or add existing)
// add search for filtering left side rooms
const chatroom = JSON.parse(Social.get("efiz.near/thing/chat") || "null");
const feeds = chatroom.rooms;
// [
// {
//   name: "all",
//   data: {
//     sources: [
//       {
//         domain: "post",
//         key: "main",
//       },
//     ],
//     typeWhitelist: ["md"],
//   },
// },
//   {
//     name: "#nyc",
//     data: {
//       sources: [
//         {
//           domain: "post",
//           key: "main",
//         },
//       ],
//       typeWhitelist: ["md"],
//       hashtagWhitelist: ["nyc"],
//     },
//   },
//   {
//     name: "nyc vibes",
//     data: {
//       sources: [
//         {
//           domain: "post",
//           key: "main",
//         },
//       ],
//       typeWhitelist: ["md"],
//       hashtagWhitelist: ["nyc", "proofofvibes"],
//       composeTemplate: "proofofvibes.near/widget/Vibes.Feed.Post.create",
//       postTemplate: "proofofvibes.near/widget/Vibes.Feed.View.main",
//     },
//   },
// ];

State.init({
  selectedRoom: feeds[0],
  rooms: feeds,
  newFeed: {},
});

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const LeftPanel = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f1f1f1;
`;

const ProfileContainer = styled.div`
  /* Add your styles for the profile container here */
`;

const CreateButton = styled.button`
  /* Add your styles for the create button here */
`;

const ChatRoomList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ChatRoomItem = styled.li`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: ${(props) =>
    props.isSelected ? "#f5f5f5" : "transparent"};

  &:last-child {
    border-bottom: none;
  }
`;

const RightPanel = styled.div`
  flex: 3;
  background-color: #ffffff;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 40px;
  background-color: #f1f1f1;
`;

const Content = styled.div`
  /* Add your styles for the content here */
`;

const handleRoomSelect = (roomId) => {
  State.update({ selectedRoom: roomId });
};

const handleOnChange = (val) => {
  State.update({ newFeed: val });
};

return (
  <Container>
    <LeftPanel>
      <Header>
        <Widget
          src="nui.sking.near/widget/Layout.Modal"
          props={{
            open: state.modalOpen,
            onOpenChange: (open) => {
              State.update({
                ...state,
                modalOpen: open,
              });
            },
            toggle: (
              <Widget
                src="nearui.near/widget/Input.Button"
                props={{
                  children: <i className="bi bi-pencil-square"></i>,
                  variant: "icon rounded",
                  size: "md",
                }}
              />
            ),
            content: (
              <div className="p-4 bg-white rounded">
                <Widget
                  src="efiz.near/widget/Chat.create"
                  props={{ pPath: "efiz.near/thing/chat" }}
                />
              </div>
            ),
          }}
        />
      </Header>

      <ChatRoomList>
        {feeds.map((room) => (
          <ChatRoomItem
            key={room}
            onClick={() => handleRoomSelect(room)}
            isSelected={state.selectedRoom === room}
          >
            {room.name}
          </ChatRoomItem>
        ))}
      </ChatRoomList>
    </LeftPanel>
    <RightPanel>
      <Header>
        <h2>{state.selectedRoom.name}</h2>
      </Header>
      <Content>
        {state.selectedRoom ? (
          <div>
            {/**
            <Widget
              src="efiz.near/widget/every.feed.view"
              props={{ data: state.selectedRoom.data }}
            />
            */}
          </div>
        ) : (
          <div></div>
        )}
      </Content>
    </RightPanel>
  </Container>
);
