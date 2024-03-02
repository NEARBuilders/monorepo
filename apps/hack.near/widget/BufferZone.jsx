const function_call_args = JSON.stringify({
  token_id: "2498",
  receiver_id: "0xedward.near",
});

const args = Buffer.from(function_call_args, "utf-8").toString("base64");
console.log(args);
return <>{args}</>;
