const $ = VM.require(`sdks.near/widget/Loader`);
const { Transaction } = $("@sdks/lens/queries#alpha");
const { TransactionRequests } = $("@sdks/lens/requests#alpha");
const { ApiHelper } = $("@sdks/lens/utils#alpha");

return {
  status: (Client, lensTransactionStatusRequest) => {
    return Client.graphql(Transaction.LENS_TRANSACTION_STATUS_QUERY, {
      lensTransactionStatusRequest: ApiHelper.clean(lensTransactionStatusRequest)
    }).then((payload) => {
      return payload.body.data || {};
    });
  },
  txIdToTxHash: (Client, txIdToTxHashRequest) => {
    return Client.graphql(Transaction.TXID_TO_TXHASH_QUERY, {
      for: txIdToTxHashRequest.for
    }).then((payload) => {
      return payload.body.data.result.txIdToTxHash || null;
    });
  },
};
