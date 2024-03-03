/**
 * Serves a simple react app with react-trello, hooked up via near-social-bridge.
 *
 *
 * Props:
 *      gigsBoardUrl: app url for the bridged gigs app (default repository: https://github.com/near-everything/gigs-board)
 *      lanes: template for react-trello lanes, fully customizable, see https://github.com/rcdexta/react-trello/tree/master#usage
 *      onCardAdd: optional custom function called when a card is added
 *      onCardDelete: optional custom function called when a card is deleted
 *      onCardMoveAcrossLanes: optional custom function called when a card is moves across lanes
 *      loadCards: optional custom function called to load cards
 *
 * Note: Customize how lanes look via lanes prop, customize how cards look via a repository fork
 */
const gigsBoardUrl = props.gigsBoardUrl || "https://gigs-board.vercel.app";

// Define your template here:
const lanes = props.lanes || {
  lanes: [
    {
      currentPage: 1,
      id: "proposed",
      style: {
        border: 0,
        backgroundColor: "initial",
      },
      title: "Proposed",
      cards: [],
    },
    {
      currentPage: 1,
      id: "in-progress",
      style: {
        border: 0,
        backgroundColor: "initial",
      },
      title: "In Progress",
      disallowAddingCard: true,
      cards: [],
    },
    {
      currentPage: 1,
      id: "completed",
      style: {
        border: 0,
        backgroundColor: "initial",
      },
      title: "Completed",
      disallowAddingCard: true,
      cards: [],
    },
  ],
};

const requestHandler = (request, response, Utils) => {
  switch (request.type) {
    case "add-card":
      handleAddCard(request, response);
      break;
    case "delete-card":
      handleDeleteCard(request, response);
      break;
    case "move-card-across-lanes":
      handleMoveCardAcrossLanes(request, response, Utils);
      break;
    case "get-cards":
      handleGetCards(request, response, Utils);
      break;
  }
};

/**
 * Called when a new card is added: onCardAdd(card, laneId)
 * https://github.com/rcdexta/react-trello/tree/master#callbacks-and-handlers
 *
 * Pass a custom function via props.onCardAdd
 */
const handleAddCard = (request, response, Utils) => {
  const { payload } = request;
  if (payload) {
    if (props.onCardAdd) {
      props.onCardAdd(payload);
    } else {
      // add to everything, unassigned
      console.log(payload);
    }
  } else {
    response(request).send({ error: "payload not provided" });
  }
};

/**
 * Called when a card is deleted: onCardDelete(cardId, laneId)
 * https://github.com/rcdexta/react-trello/tree/master#callbacks-and-handlers
 *
 * Pass a custom function via props.onCardDelete
 */
const handleDeleteCard = (request, response) => {
  const { payload } = request;
  if (payload) {
    if (props.onCardDelete) {
      // TODO: What should happen when a card is deleted?
      props.onCardDelete(payload);
    } else {
      console.log(payload);
    }
  } else {
    response(request).send({ error: "payload not provided" });
  }
};

/**
 * Called when a card is moved across lanes: onCardMoveAcrossLanes(fromLaneId, toLaneId, cardId, index)
 * https://github.com/rcdexta/react-trello/tree/master#callbacks-and-handlers
 *
 * Pass a custom function via props.onCardMoveAcrossLanes
 */
const handleMoveCardAcrossLanes = (request, response, Utils) => {
  const { payload } = request;
  if (payload) {
    if (props.onCardMoveAcrossLanes) {
      Utils.promisify(() => {
        const resp = props.onCardMoveAcrossLanes(payload);
        response(request).send({ success: resp });
      });
    } else {
      console.log(payload);
    }
  } else {
    response(request).send({ error: "payload not provided" });
  }
};

/**
 * Called on load to populate data.
 *
 * Pass a custom function via props.loadCards
 */
const handleGetCards = (request, response, Utils) => {
  // We can put a data cache here
  Utils.promisify(() => {
    if (props.loadCards) {
      const cards = props.loadCards();
      response(request).send({ data: cards });
    } else {
      console.log("no function provided to load cards!");
      response(request).send({ data: [] });
    }
  });
};

return (
  <Widget
    src={"wendersonpires.near/widget/NearSocialBridgeCore"}
    props={{
      externalAppUrl: gigsBoardUrl,
      path,
      initialViewHeight: 1000,
      initialPayload: lanes,
      requestHandler,
    }}
  />
);
