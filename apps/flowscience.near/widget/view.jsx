State.init({
  path: props.path,
});

const value = Social.get(state.path, "final");

const text = `
\`\`\`json
${JSON.stringify(value, undefined, 2)}
\`\`\`
`;

return (
  <div>
    <div>
      <input
        type="text"
        value={state.path}
        placeholder="self.social.near/profile/**"
      />
    </div>
    <Markdown text={text} />
  </div>
);
