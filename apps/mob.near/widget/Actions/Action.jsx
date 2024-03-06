const {
  accessKeyContractId,
  accountId,
  action,
  actionIndex,
  argsAccountId,
  argsAmount,
  argsBalance,
  argsNewAccountId,
  argsNftContractId,
  argsNftTokenId,
  argsOwnerId,
  argsReceiverId,
  argsSenderId,
  argsTokenId,
  argsUtmCampaign,
  argsUtmContent,
  argsUtmMedium,
  argsUtmSource,
  argsUtmTerm,
  attachedGas,
  blockHash,
  blockHeight,
  blockTimestamp,
  contractHash,
  deposit,
  gasBurnt,
  gasPrice,
  methodName,
  predecessorId,
  publicKey,
  receiptId,
  receiptIndex,
  returnValueInt,
  signerId,
  signerPublicKey,
  status,
  tokensBurnt,
  time,
  id,
} =
  props.action ||
  JSON.parse(
    '{"accessKeyContractId":null,"accountId":"game.hot.tg","action":"FUNCTION_CALL","actionIndex":0,"argsAccountId":null,"argsAmount":null,"argsBalance":null,"argsNewAccountId":null,"argsNftContractId":null,"argsNftTokenId":null,"argsOwnerId":null,"argsReceiverId":null,"argsSenderId":null,"argsTokenId":null,"argsUtmCampaign":null,"argsUtmContent":null,"argsUtmMedium":null,"argsUtmSource":null,"argsUtmTerm":null,"attachedGas":"30000000000000","blockHash":"C3RNkAnqWi6X3PpXwNsh5TZ1MToYugRKHJcChnbBCvLf","blockHeight":"113244929","blockTimestamp":1708464954.472,"contractHash":null,"deposit":"0","gasBurnt":"4507882935951","gasPrice":"122987387","methodName":"claim","predecessorId":"mustaphajawu.tg","publicKey":null,"receiptId":"51huskn4Dnguj9qCETHs8XK6F3X2UMztZjtTqxkcyTf5","receiptIndex":195,"returnValueInt":null,"signerId":"relay.tg","signerPublicKey":"ed25519:EFHz7oUzsdvWVD1hxdtJ29g3jJteZ6ZAEfraZVX4qnbs","status":"SUCCESS","tokensBurnt":"450788293595100000000","time":"2024-02-20T21:35:54.472Z","id":"51huskn4Dnguj9qCETHs8XK6F3X2UMztZjtTqxkcyTf5:0"}'
  );

return (
  <div>
    <div>
      Time:{" "}
      <Widget
        loading="Xs"
        src="mob.near/widget/TimeAgoMs"
        props={{ timeMs: blockTimestamp * 1000 }}
      />{" "}
      ago
    </div>
    <div>Type: {action}</div>
    {methodName && <div>Method: {methodName}</div>}
    <div>Receipt: {receiptId}</div>
    <div className="text-nowrap">
      Predecessor:{" "}
      <Widget
        src="mob.near/widget/N.ProfileLine"
        props={{ accountId: predecessorId }}
      />
    </div>
  </div>
);
