// FORKED FROM bozon.near/widget/WidgetHistory.History
// TODO: add acknowledgements

/*
---props---

widgetPath: string,
count(count: number)?: function,

*/

if (typeof props.path !== "string") return "send {path} as string in props";

State.init({
  selectedTab: "render",
  selectedBlockHeight: null,
});

const historyBlocksRequest = Social.keys(`${props.path}`, "final", {
  return_type: "History",
});

if (historyBlocksRequest === null) return "loading...";

const [widgetAccountId, _, widgetName] = props.path.split("/");

let blocksChanges = historyBlocksRequest[widgetAccountId]?.[_]?.[widgetName];

if (props.count) props.count(blocksChanges.length);

if (blocksChanges) blocksChanges = blocksChanges?.sort((a, b) => b - a);

if (!state.selectedBlockHeight) state.selectedBlockHeight = blocksChanges[0];

function getDatastringFromBlockHeight(blockHeight) {
  const block = Near.block(blockHeight);
  const date = new Date(block.header.timestamp_nanosec / 1e6);
  return date.toDateString() + " " + date.toLocaleTimeString();
}

const renderBlockChangesLink = (blockHeight) => {
  return (
    <div>
      <button
        className={`list-group-item list-group-item-action ${
          state.selectedBlockHeight != blockHeight ? "" : "list-group-item-info"
        }`}
        onClick={() => {
          State.update({ selectedBlockHeight: blockHeight });
        }}
      >
        #{blockHeight} * {getDatastringFromBlockHeight(blockHeight)}
      </button>
    </div>
  );
};

function blockHeightToWidgetCode(blockHeight) {
  const index = blocksChanges.findIndex((el) => el == blockHeight);
  return (
    <div class="mb-3">
      <Widget
        key={blockHeight}
        src={`bozon.near/widget/WidgetHistory.CodeHistoryCard`}
        props={{
          pathToWidget: props.widgetPath,
          currentBlockHeight: blockHeight,
          prevBlockHeight: blocksChanges[index + 1],
        }}
      />
    </div>
  );
}

function blockHeightToWidgetRender(blockHeight) {
  const index = blocksChanges.findIndex((el) => el == blockHeight);

  // TODO: Clean this up
  const thing = JSON.parse(Social.get(props.path, blockHeight));
  const thingType = thing.type;
  const type = JSON.parse(Social.get(thingType, blockHeight) || "null");
  if (type === null) {
    console.log(`edge case: thing ${path} had an invalid type: ${thingType}`);
  }

  return <Widget src={type?.widgets?.view} props={{ data: thing.data }} />;
  //   <Widget
  //       style={{ minHeight: "200px" }}
  //       key={blockHeight}
  //       src={`bozon.near/widget/WidgetHistory.RenderCode`}
  //       props={{
  //         pathToWidget: type?.widgets?.view,
  //         currentBlockHeight: blockHeight,
  //         prevBlockHeight: blocksChanges[index + 1],
  //         data: thing.data,
  //       }}
  //     />
}

//styles forked from calebjacob.near/widget/Activity
const Tabs = styled.div`
  display: flex;
  padding: 0 12px;
  height: 48px;
  border-bottom: 1px solid #ECEEF0;
`;

const TabsButton = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;

  &:hover {
    color: #11181C;
  }

  &::after {
    content: '';
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 12px;
    right: 12px;
    height: 3px;
    background: #0091FF;
  }
`;

return (
  <div>
    {!blocksChanges ? (
      <div>incorrent widget path</div>
    ) : (
      <div>
        <div div class="card mb-3">
          <h3 class="card-header">{blocksChanges.length} Commits</h3>

          <div class="list-group">
            {blocksChanges
              .slice(0, 5)
              .map((height) => renderBlockChangesLink(height))}

            <div class="collapse" id="collapseExample">
              {blocksChanges
                .slice(5)
                .map((height) => renderBlockChangesLink(height))}
            </div>

            {blocksChanges.length > 5 && (
              <button
                class="list-group-item active"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Show all
              </button>
            )}
          </div>
        </div>

        <Tabs>
          <TabsButton
            type="button"
            onClick={() =>
              State.update({
                selectedTab: "code",
              })
            }
            selected={state.selectedTab == "code"}
          >
            Code
          </TabsButton>

          <TabsButton
            type="button"
            onClick={() =>
              State.update({
                selectedTab: "render",
              })
            }
            selected={state.selectedTab == "render"}
          >
            Render
          </TabsButton>
        </Tabs>

        {state.selectedTab == "code" && (
          <div>{blockHeightToWidgetCode(state.selectedBlockHeight)}</div>
        )}

        {state.selectedTab == "render" && (
          <div>{blockHeightToWidgetRender(state.selectedBlockHeight)}</div>
        )}
      </div>
    )}
  </div>
);
