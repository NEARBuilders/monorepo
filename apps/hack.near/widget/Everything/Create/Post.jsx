// Repository: https://github.com/near-everything/idea-creator
const externalAppUrl = "https://post-creator.vercel.app";

/**
 * Initial Path (optional but recommended)
 */
const path = props.path;
/**
 * Initial view height (optional but recommended)
 */
const initialViewHeight = 500;
const initialPayload = {};

/**
 * Request Handlers - Backend.
 *
 * - request: payload sent by External App
 *
 * - response: method to send the answer back to the External App
 *
 * - utils: Utils features like
 *      - promisify: (caller, resolve, reject)
 *      There's no Promisse for some features yet, So this is util for when you need to get cached data using DiscoveryAPI, e.g:
 *      utils.promisify(() => Social.getr(`${context.accountId}/profile`), (res) => console.log(res), (err) => console.log(err))
 *
 * @param {{type: string, payload: {}}} request request with payload sent by External App
 * @param {(request) => {send: () => void}} response send the answer back to the External App
 * @param {{promisify:(caller: () => void, resolve: (data) => void, reject: (error) => void)}} utils Utils features like
 */
const requestHandler = (request, response, Utils) => {
  switch (request.type) {
    case "create-thing":
      handleCreatePost(request, response);
      break;
  }
};

const handleCreatePost = (request, response) => {
  const { payload } = request;
  if (payload) {
    asyncFetch("https://monkfish-app-ginhc.ondigitalocean.app/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Everything": "simple",
      },
      body: JSON.stringify({
        query:
          "mutation createPost($title: String, $description: String) { posts { create(name: $title) { entities { id } } appendContentToDescription(value: $description) { entities { id   } } } }",
        variables: payload,
      }),
    }).then((res) => {
      if (res.body.errors) {
        response(request).send(res.body.errors);
      } else {
        Social.set(
          {
            thing: {
              main: JSON.stringify({
                thingId: res.body.data.posts.create.entities[0].id,
              }),
            },
            index: {
              abc: JSON.stringify({
                key: "main",
                value: {
                  type: "hack.near/type/Post",
                },
              }),
            },
          },
          {
            force: true,
            onCommit: () => {
              response(request).send({ success: true });
            },
            onCancel: () => {
              response(request).send({ error: "the action was canceled" });
            },
          }
        );
        response(request).send(res.body.data);
      }
    });
    return;
  }
  // Error
  response(request).send({
    error: "content must be provided",
  });
};

return (
  <Widget
    src={"wendersonpires.near/widget/NearSocialBridgeCore"}
    props={{
      externalAppUrl,
      path,
      initialViewHeight,
      initialPayload,
      requestHandler,
    }}
  />
);
