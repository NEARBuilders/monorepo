const accountId = props.accountId;

let hasToken = false;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url('https://i-am-human.app/static/media/ndc.31fdbbd1a8932f5986cf.png');
  background-size: cover;
`;

if (accountId) {
  const getFirstSBTToken = () => {
    const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
      account: `${accountId}`,
      issuer: "fractal.i-am-human.near",
    });
    return view?.[0]?.[1]?.[0];
  };
  hasToken = getFirstSBTToken() !== undefined;
}

if (hasToken) {
  return <span>✅</span>;
} else {
  return <></>;
}
