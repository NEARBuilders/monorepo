return (Store, status) => {
  const API = {
    name: "",
    instruction: "",
    responses: {},
    value: "",
    init: () => {
      Store.init({
        [API.name]: {
          ongoingRequest: {},
          responses: {},
        },
      });

      return API;
    },
    getRequest: () => {
      return status[API.name].ongoingRequest;
    },
    createRequest: (instruction, value, returnType) => {
      return {
        index: status[API.name].responses[instruction]
          ? Object.keys(status[API.name].responses[instruction]).length
          : 0,
        instruction,
        value,
        returnType: returnType || "object",
      };
    },
    request: (request) => {
      let newApi = status[API.name];
      newApi.ongoingRequest = request;

      Store.update({
        [API.name]: newApi,
      });

      return new Promise((resolve, reject) => {
        let newApi = status[API.name];

        if (request.index == 0) {
          newApi.responses[request.instruction] = {};
        }

        newApi.responses[request.instruction][request.index] = { resolve };
        Store.update({ [API.name]: newApi });
      });
    },
    setResponse: (response) => {
      let parsedResponse = API.parseResponse(response);
      API.notify(
        parsedResponse.instruction,
        parsedResponse.index,
        parsedResponse.result
      );

      let newApi = status[API.name];
      newApi.responses[parsedResponse.instruction][parsedResponse.index] =
        parsedResponse;

      Store.update({
        [API.name]: newApi,
      });
    },
    parseResponse: (response) => {
      return {
        ...response,
        result:
          response.returnType == "string"
            ? response.result
            : console.log(response.result),
      };
    },
    notify: (instruction, index, result) => {
      status[API.name].responses[instruction][index].resolve(result);
    },
  };

  return API.init();
};