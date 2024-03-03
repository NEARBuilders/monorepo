const quests = Near.view("test1.questverse.near", "quests");

if (!quests) {
  return "";
}

const tag = props.tag ?? "build";

const data = Social.keys(`*/graph/context/*/quest/*/tags/${tag}`, "final");

if (!data) {
  return "Loading...";
}

function extractThings(data) {
  const uniqueKeys = new Set();
  const things = [];

  Object.keys(data).forEach((curatorId) => {
    const context = data[curatorId]?.graph?.context;

    if (context) {
      Object.keys(context).forEach((creatorId) => {
        const thingData = context[creatorId]?.quest;

        if (thingData) {
          Object.keys(thingData).forEach((thingId) => {
            const tags = thingData[thingId]?.tags;

            if (tags) {
              const key = `${curatorId}-${creatorId}-${thingId}`;

              if (!uniqueKeys.has(key)) {
                uniqueKeys.add(key);

                things.push(
                  <div key={key}>
                    <Widget
                      src="hack.near/widget/quest.card"
                      props={{ questId: thingId }}
                    />
                  </div>
                );
              }
            }
          });
        }
      });
    }
  });

  return things;
}

const Header = styled.div`
  background: black;
`;

const Container = styled.div`
  padding: 30px 0;
  margin: 0;
`;

const Toolbar = styled.div`
  margin-left: 20px;
  @media only screen and (max-width: 1061px) {
    margin: 10px 0 0 0;
  }
`;

return (
  <>
    <p>{JSON.stringify(data)}</p>
    <div>
      <Header className="d-flex p-3 px-4 align-items-center rounded justify-content-between">
        <h3 className="mt-2" style={{ fontFamily: "Courier", color: "white" }}>
          <b>QuestVerse</b>
        </h3>

        {!isVerified ? (
          <Widget
            src="hack.near/widget/n.style"
            props={{
              Link: {
                text: "Get Verified",
                href: "https://i-am-human.app/",
              },
            }}
          />
        ) : (
          <Toolbar>
            <Widget src="hack.near/widget/start" />
          </Toolbar>
        )}
      </Header>
      <Container className="d-flex row justify-content-between w-100">
        <h2 style={{ fontFamily: "Courier" }}>
          <b>Discover</b>
        </h2>
        <div>
          <Widget
            src="hack.near/widget/every.tag"
            props={{
              tag,
              namespace: "quest",
              url: "/hack.near/widget/quests",
            }}
          />
        </div>
        {tag === "*" ? (
          <div>
            {quests.map((quest) => (
              <div className="m-2">
                <Widget
                  src="hack.near/widget/quest.card"
                  props={{
                    questId: quest.quest_id,
                    url: "/hack.near/widget/quests",
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="m-2">{extractThings(data)}</div>
        )}
      </Container>
    </div>
  </>
);
