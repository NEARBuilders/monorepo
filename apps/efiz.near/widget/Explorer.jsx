const accountId = props.accountId ?? context.accountId;

State.init({
  path: accountId,
});

const parts = state.path.split("/");

let edges = [];
let value = {};

if (parts.length === 1) {
  parts.push("**");

  value = Social.get(parts.join("/"), "final");
  edges = Object.keys(value);
  value = JSON.stringify(value, undefined, 2);
} else if (parts.length === 2) {
  // it is an accountId and a "standard"
  // should have the option to click * or **
  parts.push("**");

  value = Social.get(parts.join("/"), "final");
  edges = Object.keys(value);
  value = JSON.stringify(value, undefined, 2);
} else if (parts.length > 2) {
  value = Social.get(parts.join("/"), "final");
  const standard = parts[1];
  // These are types, and so follow
  switch (standard) {
    case "index":
      value = JSON.parse(value);
      edges = ["hi"];
      value = JSON.stringify(value, undefined, 2);
      // if you go to an index, then it shows all the data
      break;
    case "post":
      //   value = Social.get(parts.slice(0, 3).join("/"), "final");
      const value = Social.index("post", parts[2], {
        limit: 10,
        order: "desc",
        accountId: parts[0],
      });
      value = JSON.stringify(value, undefined, 2);
      console.log(value);
      // we want a special view for this
      break;
    //   if (parts.length === 3) {
    //     const value = Social.index("post", parts[2], {
    //       limit: 10,
    //       order: "desc",
    //       accountId: undefined,
    //     });
    //     console.log("hello");
    //     console.log(value);
    //     // value[parts[4]];
    //   } else {
    //     // edges = Object.keys(value);
    //   }
    // default:
    //   value = Social.get(parts.join("/"), "final");
    //   edges = Object.keys(value);
    //   break;
  }
  // anything after this, check for a type and go from there.
}

const text = `
\`\`\`json
${value}
\`\`\`
`;

const Button = styled.button`
  text-transform: lowercase !important;
`;

const renderThings = () => {
  return <Markdown text={text} />;
};

function back() {
  const parts = state.path.split("/");
  parts.pop();

  State.update({
    path: parts.join("/"),
  });
}

function navigate(word) {
  const parts = state.path.split("/");
  parts.push(word);

  State.update({
    path: parts.join("/"),
  });
}

return (
  <div>
    <div>
      <input type="text" value={state.path} placeholder={state.path} />
      {parts.length > 2 ? <Button onClick={() => back()}>back</Button> : null}
      {edges?.map((it) => (
        <Button onClick={() => navigate(it)}>{it}</Button>
      ))}
    </div>
    {renderThings()}
  </div>
);
