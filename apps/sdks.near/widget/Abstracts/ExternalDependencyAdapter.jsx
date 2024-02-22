const StatefulDependency = VM.require(
  "sdks.near/widget/Abstracts.StatefulDependency"
);

return (Store, status, name) => {
  const API = {
    ...StatefulDependency(Store, status, name),
    name: name,
    instruction: "",
    responses: {},
    value: "",
    init: () => {
        API.initDependency({
          ongoingRequest: {},
          responses: {},
        });

      return API;
    },
    getRequest: () => {
      return API.get("ongoingRequest");
    },
    createRequest: (instruction, value, returnType) => {
      return {
        index: API.get("responses")[instruction]
          ? Object.keys(API.get("responses")[instruction]).length
          : 0,
        instruction,
        value,
        returnType: returnType || "string",
      };
    },
    request: (request) => {
      API.set("ongoingRequest", request);

      return new Promise((resolve, reject) => {
        let responses = API.get("responses");

        if (request.index == 0) {
          responses[request.instruction] = {};
        }

        responses[request.instruction][request.index] = { resolve };
        API.set("responses", responses);
      });
    },
    setResponse: (response) => {
      let parsedResponse = API.parseResponse(response);
      API.notify(
        parsedResponse.instruction,
        parsedResponse.index,
        parsedResponse.result
      );

      let responses = API.get("responses");
      responses[parsedResponse.instruction][parsedResponse.index] =
        parsedResponse;

      API.set("responses", responses);
    },
    parseResponse: (response) => {
      return {
        ...response,
        result:
          response.returnType == "string" || response.returnType == "canvas"
            ? response.result
            : JSON.parse(response.result),
      };
    },
    notify: (instruction, index, result) =>
      API.get("responses")[instruction][index].resolve(result),
    isReady: () => API.get("ready"),
    setAsReady: () => API.set("ready", true),
  };

  return API.init();
};
