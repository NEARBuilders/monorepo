const pPath = props.pPath;

function createRoom() {
  const chatroom = JSON.parse(Social.get(pPath) || "null");
  const [accountId, thing, chatId] = pPath.split("/");

  const feeds = chatroom.rooms;
  let data = {
    thing: {},
    index: {},
  };

  switch (state.chatType) {
    case "ALL": {
      feeds.push("every.near/thing/post");
    }
    case "HASHTAG":
      {
        const type = "efiz.near/type/feed";
        const newFeed = {
          sources: [
            {
              domain: "post",
              key: "main",
            },
          ],
          typeWhitelist: ["md"],
          hashtagWhitelist: [state.newHashtag],
        };
        data.thing[thingId] = {
          data: JSON.stringify(newFeed),
        };
        data.index.every = JSON.stringify({
          key: type,
          value: {
            thingId,
            type,
          },
        });
        feeds.push(`${context.accountId}/thing/${thingId}`);
      }
      const thingId = generateUID();
    case "PRIVATE": {
      const teamId = generateUID();
      const accounts = Object.keys(state.invites);
      const room = {
        sources: [
          {
            domain: "every",
            key: teamId,
          },
        ],
        typeWhitelist: ["md"],
        accountWhitelist: accounts,
      };
      const item = {
        type: "thing",
        path: `${context.accountId}/thing/${teamId}`,
      };
      data.thing[teamId] = {
        "": JSON.stringify(room),
        metadata: {
          name: "test",
          description: "test chatroom",
        },
      };
      data.graph[teamId] = state.accounts;

      const notifications = accounts.map((accountId) => {
        if (accountId !== context.accountId) {
          return {
            key: accountId,
            value: {
              type: "invite",
              item,
            },
          };
        }
      });

      if (notifications.length) {
        data.index.notify = JSON.stringify(
          notifications.length > 1 ? notifications : notifications[0]
        );
      }
    }
    case "CUSTOM": {
    }
  }
  chatroom.rooms = feeds;
  data.thing[chatId] = {
    "": JSON.stringify(chatroom),
  };

  Social.set(data, {
    onCommit: () => {},
    onCancel: () => {},
  });
}

function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

if (state.chatType) {
  function renderCreate() {
    switch (state.chatType) {
      case "ALL": {
        // Adds the every feed
        return <p>all</p>;
      }
      case "HASHTAG": {
        // Creates a hashtag feed
        return (
          <p>
            <input
              onChange={(e) => State.update({ newHashtag: e.target.value })}
              value={state.newHashtag}
              placeholder="hashtag"
            />
          </p>
        );
      }
      case "PRIVATE": {
        // Creates a team feed
        return <p>private</p>;
      }
      case "CUSTOM": {
        // Other creator
        return <p>custom</p>;
      }
    }
  }
  return (
    <>
      <button
        onClick={() =>
          State.update({
            chatType: null,
          })
        }
      >
        back
      </button>
      {renderCreate()}
      <button onClick={createRoom}>create</button>
    </>
  );
} else {
  const Wrapper = styled.div`
  border-radius: 12px;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  cursor: pointer;
  
  transform: translateY(0);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  a {
    color: #4498e0;
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      color: #4498e0cc;
  }
`;
  const TileGrid = ({ tiles }) => {
    return (
      <div className="container mt-5">
        <div className="row">
          {tiles.map((tile, index) => (
            <div key={index} className="col-md mb-4 ">
              <Wrapper
                className={"p-4 rounded text-center"}
                onClick={tile.onClick}
              >
                <div className="icon">
                  <i className={`bi ${tile.icon}`}></i>
                </div>
                <h5 className="title">{tile.title}</h5>
              </Wrapper>
            </div>
          ))}
        </div>
      </div>
    );
  };

  function setType(ct) {
    State.update({
      chatType: ct,
    });
  }

  const tiles = [
    { icon: "bi-box", title: "all", onClick: () => setType("ALL") },
    { icon: "bi-heart", title: "hashtag", onClick: () => setType("HASHTAG") },
    { icon: "bi-star", title: "private", onClick: () => setType("PRIVATE") },
    { icon: "bi-lightbulb", title: "custom", onClick: () => setType("CUSTOM") },
  ];

  return (
    <div>
      <TileGrid tiles={tiles} />
    </div>
  );
}
