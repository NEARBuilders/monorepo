const LENS_TRANSACTION_STATUS_QUERY = `
  fragment LensTransactionResult on LensTransactionResult {
    status
    txHash
    reason
    extraInfo
  }

  query LensTransactionStatus($lensTransactionStatusRequest: LensTransactionStatusRequest!) {
    result: lensTransactionStatus(request: $lensTransactionStatusRequest) {
      ...LensTransactionResult
    }
  }
`;

const TXID_TO_TXHASH_QUERY = `
  query TxIdToTxHash($for: TxId!) {
    result: txIdToTxHash(for: $for)
  }
`;

return {
    LENS_TRANSACTION_STATUS_QUERY,
    TXID_TO_TXHASH_QUERY
};