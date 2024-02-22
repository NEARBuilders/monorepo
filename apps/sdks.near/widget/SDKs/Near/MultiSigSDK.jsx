return (contractId) => {
  const MultisigSDK = {
    // VIEW METHODS
    getRequest: ({ requestId }) => {
      return Near.view(contractId, "get_request", {
        request_id: requestId
      });
    },
    getNumRequestsPk: ({ requestId }) => {
      return Near.view(contractId, "get_num_requests_pk");
    },
    listRequestIds: () => {
      return Near.view(contractId, "list_request_ids");
    },
    getConfirmations: ({ requestId }) => {
      return Near.view(contractId, "get_confirmations", {
        request_id: requestId
      });
    },
    getNumConfirmations: () => {
      return Near.view(contractId, "get_num_confirmations");
    },
    getRequestNonce: () => {
      return Near.view(contractId, "get_request_nonce");
    },

    // CALL METHODS
    addRequest: ({ receiverId, actions, deposit, gas }) => {
      return MultisigSDK.call({
        methodName: "add_request",
        args: {
          request: {
            receiver_id: receiverId,
            actions: actions
          }
        },
        deposit,
        gas
      });
    },
    addRequestAndConfirm: ({ receiverId, actions, deposit, gas }) => {
      return MultisigSDK.call({
        methodName: "add_request_and_confirm",
        args: {
          request: {
            receiver_id: receiverId,
            actions: actions
          }
        },
        deposit,
        gas
      });
    },
    deleteRequest: ({ requestId }) => {
      return Near.call(contractId, "delete_request", {
        request_id: requestId
      });
    },
    confirm: ({ requestId }) => {
      return Near.call(contractId, "confirm", { request_id: requestId });
    },

    // SPECIFIC ADD REQUESTS
    createTransferRequest: ({ receiverId, amount, deposit, gas }) => {
      return MultisigSDK.addRequest({
        receiver_id: receiverId,
        actions: [{ type: "Transfer", amount: amount }],
        deposit,
        gas
      });
    },
    createAccountRequest: ({ receiverId, amount, publicKey, deposit, gas }) => {
      return MultisigSDK.addRequest({
        receiver_id: receiverId,
        actions: [
          { type: "CreateAccount" },
          { type: "Transfer", amount: amount },
          { type: "AddKey", public_key: publicKey }
        ],
        deposit,
        gas
      });
    },
    createDeployContractRequest: ({ receiverId, code, deposit, gas }) => {
      return MultisigSDK.addRequest({
        receiver_id: receiverId,
        actions: [{ type: "DeployContract", code }],
        deposit,
        gas
      });
    },
    createAddKeyRequest: ({
      receiverId,
      publicKey,
      permission,
      deposit,
      gas
    }) => {
      return MultisigSDK.addRequest({
        receiver_id: receiverId,
        actions: [
          { type: "AddKey", public_key: publicKey, permission: permission }
        ],
        deposit,
        gas
      });
    },
    createDeleteKeyRequest: ({ receiverId, publicKey, deposit, gas }) => {
      return MultisigSDK.addRequest({
        receiver_id: receiverId,
        actions: [{ type: "DeleteKey", public_key: publicKey }],
        deposit,
        gas
      });
    },
    createFunctionCallRequest: ({
      receiverId,
      methodName,
      args,
      proposalDeposit,
      proposalGas,
      deposit,
      gas
    }) => {
      const proposal_args = Buffer.from(JSON.stringify(args), "utf-8").toString(
        "base64"
      );
      return MultisigSDK.addRequest({
        receiver_id: receiverId,
        actions: [
          {
            type: "FunctionCall",
            method_name: methodName,
            args: proposal_args,
            deposit: proposalDeposit,
            gas: proposalGas
          }
        ],
        deposit,
        gas
      });
    },
    createSetNumConfirmationsRequest: ({
      receiverId,
      numConfirmations,
      deposit,
      gas
    }) => {
      return MultisigSDK.addRequest({
        receiver_id: receiverId,
        actions: {
          SetNumConfirmations: {
            num_confirmations: numConfirmations
          }
        },
        deposit,
        gas
      });
    },
    createSetActiveRequestsLimitRequest: ({
      receiverId,
      activeRequestsLimit,
      deposit,
      gas
    }) => {
      return MultisigSDK.addRequest({
        receiver_id: receiverId,
        actions: {
          SetActiveRequestsLimit: {
            active_requests_limit: activeRequestsLimit
          }
        },
        deposit,
        gas
      });
    },
    // UTILS
    call: ({ methodName, args, deposit, gas }) => {
      return Near.call([
        {
          contractName: contractId,
          methodName,
          args,
          deposit,
          gas
        }
      ]);
    },
    decodeArgs: ({ args }) => {
      try {
        const args64 = args;
        const jsonArgs = JSON.parse(
          Buffer.from(args64, "base64").toString("utf-8")
        );
        return JSON.stringify(jsonArgs, undefined, 2);
      } catch {
        return "failed to deserialize";
      }
    }
  };
  return MultisigSDK;
};
