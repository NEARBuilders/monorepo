const accountId = props.accountId;
if (!accountId) {
  return "";
}
const actionWidgetSrc =
  props.actionWidgetSrc || "mob.near/widget/Actions.Action";
const [actions, setActions] = useState(false);

const Limit = 50;

const actionsFilter = useMemo(
  () =>
    [
      "account_id",
      "args_account_id",
      "args_new_account_id",
      "args_nft_contract_id",
      "args_owner_id",
      "args_receiver_id",
      "args_sender_id",
      "predecessor_id",
      "signer_id",
    ].map((key) => ({
      [key]: accountId,
      status: "SUCCESS",
    })),
  [accountId]
);

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

function processAction(action) {
  action = Object.fromEntries(
    Object.entries(action).map(([k, v]) => [toCamel(k), v])
  );
  action.time = new Date(action.blockTimestamp * 1000);
  action.id = `${action.receiptId}:${action.actionIndex}`;
  return action;
}

const processActions = (newActions) => {
  newActions = newActions.flatMap(processAction);
  newActions.reverse();

  setActions((prevActions) =>
    [
      ...newActions.filter(
        (event) =>
          !prevActions ||
          prevActions.length === 0 ||
          event.time.getTime() > prevActions[0].time.getTime()
      ),
      ...(prevActions || []),
    ].slice(0, Limit)
  );
};

function connect() {
  console.log("Triggered connect");
  const ws = new WebSocket("wss://actions.near.stream/ws");
  let shouldReconnect = true;

  const stop = () => {
    shouldReconnect = false;
    ws.close();
  };

  ws.onopen = () => {
    console.log(`Connection to WS has been established`);
    ws.send(
      JSON.stringify({
        secret: `near-social-actions-${new Date().getTime()}}`,
        filter: actionsFilter,
        fetch_past_actions: Limit,
      })
    );
  };
  ws.onclose = () => {
    console.log(`WS Connection has been closed`);
    if (shouldReconnect) {
      connect();
    }
  };
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    processActions(data.actions);
  };
  ws.onerror = (err) => {
    console.log("WebSocket error", err);
  };

  return { ws, stop };
}

useEffect(() => {
  setActions(false);
  const { ws, stop } = connect();

  return () => {
    // shutdown
    console.log("Shutdown");
    stop();
  };
}, [accountId]);

const Wrapper = styled.div`
.header {
  margin-bottom: 1em;
}
.action {
  margin-bottom: 1em;
  overflow: hidden;
}
`;

const renderAction = (action) => {
  return <Widget src={actionWidgetSrc} props={{ action }} />;
};

return (
  <Wrapper>
    <div className="header">
      Actions of
      <Widget src="mob.near/widget/N.ProfileLine" props={{ accountId }} />
    </div>
    <div className="actions">
      {actions
        ? actions.map((action) => (
            <div key={action.id} className="action">
              {renderAction(action)}
            </div>
          ))
        : "Loading"}
    </div>
  </Wrapper>
);
