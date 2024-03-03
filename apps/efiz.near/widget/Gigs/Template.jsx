const isDev = props.isDev ?? false;
const gigsBoardUrl = isDev
  ? "https://b54103fcb629.ngrok.app" // place your own ngrok url here
  : "https://gigs-board.vercel.app"; // or your fork of gigs-board

const daoId = "liberty.sputnik-dao.near"; // DAO owner of the gigs board

const domain = props.domain;
const key = props.key;

/**
 * Scroll to the bottom of a "lane" and you'll see "Click to Add Card"
 * Calls this function with the payload
 */
function onCardAdd(payload) {
  console.log(JSON.stringify(payload));
  // Generate thingId (plain text for now, will integrate uuid.generate() into VM)
  const thingId = 12345;

  // Save the payload to SocialDB under thingId
  const data = {
    [context.accountId]: {
      thing: {
        [thingId]: JSON.stringify({
          // save the thing at key: uuid
          payload,
        }),
      },
      index: {
        [daoId]: JSON.stringify({
          // index thing's key at daomain
          key: thingId,
          value: {
            type: "every.near/type/problem", // What type should this be?
          },
        }),
      },
    },
  };
  // (below is referenced from https://near.org/near/widget/ComponentDetailsPage?src=nearhorizon.near/widget/Project.Form&tab=source)
  const deposit = Big(JSON.stringify(data).length * 16).mul(Big(10).pow(20));
  const transactions = [
    {
      // Social.set
      contractName: "social.near",
      methodName: "set",
      deposit,
      args: { data },
    },
    {
      // REPLACE WITH FUNCTION CALL TO DAO CONTRACT
      contractName: ownerId,
      methodName: "add_project",
      args: { account_id: state.accountId },
    },
  ];
  Near.call(transactions);
}

function onCardDelete(payload) {
  console.log(JSON.stringify(payload));
}

function onCardMoveAcrossLanes(payload) {
  console.log(JSON.stringify(payload));
  // function call proposal t
  return { preventDefault: true };
}

function loadCards() {
  const convertData = (inputData) => {
    const cards = [];
    inputData.forEach((item, index) => {
      const card = {
        id: item.articleId,
        title: item.articleId,
        laneId: index % 2 === 0 ? "proposed" : "in-progress",
        author: item.author,
        blockHeight: item.blockHeight,
        body: item.body,
        lastEditor: item.lastEditor,
        timeCreate: item.timeCreate,
        timeLastEdit: item.timeLastEdit,
        version: item.version,
      };
      cards.push(card);
    });
    return cards;
  };

  if (domain && key) {
    const gigs = Social.index(domain, key, {
      order: "desc",
    });
    gigs = gigs.filter((it) => it.value.type === "every.near/type/gig");
    return convertData(gigs);
  }
  // this should just get the ids from the DAO
  // Then Social.index(daoId, {key}) on each key to get each "gig" and it's history
  const addressForArticles = "ndcGigArticle";
  const authorsWhitelist = props.writersWhiteList ?? [
    "neardigitalcollective.near",
    "blaze.near",
    "jlw.near",
    "kazanderdad.near",
    "joep.near",
    "sarahkornfeld.near",
    "yuensid.near",
  ];
  const articleBlackList = [91092435, 91092174, 91051228, 91092223, 91051203];
  const authorForWidget = "neardigitalcollective.near";
  // ========== GET INDEX ARRAY FOR ARTICLES ==========
  const postsIndex = Social.index(addressForArticles, "main", {
    order: "desc",
  });
  // ========== GET ALL ARTICLES ==========
  const resultArticles =
    postsIndex &&
    postsIndex
      .reduce((acc, { accountId, blockHeight }) => {
        const postData = Social.get(
          `${accountId}/${addressForArticles}/main`,
          blockHeight
        );
        const postDataWithBlockHeight = {
          ...JSON.parse(postData),
          blockHeight,
        };
        return [...acc, postDataWithBlockHeight];
      }, [])
      .filter((article) =>
        authorsWhitelist.some((addr) => addr === article.author)
      )
      .filter((article) => !articleBlackList.includes(article.blockHeight));

  // ========== FILTER DUPLICATES ==========
  const filteredArticles =
    resultArticles.length &&
    resultArticles.reduce((acc, article) => {
      if (!acc.some(({ articleId }) => articleId === article.articleId)) {
        return [...acc, article];
      } else {
        return acc;
      }
    }, []);

  const getDateLastEdit = (timestamp) => {
    const date = new Date(Number(timestamp));
    const dateString = {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
    return dateString;
  };

  // Then convert into cards

  const data = convertData(filteredArticles);
  return data;
}

return (
  <Widget
    src={"efiz.near/widget/Gigs.Board"}
    props={{
      gigsBoardUrl,
      onCardAdd,
      onCardDelete,
      onCardMoveAcrossLanes,
      loadCards,
    }}
  />
);
