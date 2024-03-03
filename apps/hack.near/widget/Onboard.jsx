const daoId = props.daoId;

if (!daoId) {
  return (
    <div className="mt-3">
      <Widget src="hack.near/widget/Cyborgs" />
    </div>
  );
}

return <></>;
