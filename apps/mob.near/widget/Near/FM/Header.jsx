const accountId = props.accountId;
const isValidAccount =
  accountId && accountId.endsWith(".near") && accountId.split(".").length === 2;

const imgWrapperStyle = { height: "1em", width: "1em" };

return (
  <div className="text-center my-3">
    <h1>
      {isValidAccount ? (
        <>
          <Widget
            src="mob.near/widget/ProfileImage"
            loading={<div style={imgWrapperStyle} />}
            props={{
              fast: true,
              accountId,
              style: imgWrapperStyle,
              imageClassName: "rounded-circle w-100 h-100",
            }}
          />
          {accountId}.fm
        </>
      ) : (
        "near.fm"
      )}
    </h1>
    {isValidAccount ? (
      <div>Your personal premium URL shortener</div>
    ) : (
      <p>Shorten your long URLs</p>
    )}
  </div>
);
