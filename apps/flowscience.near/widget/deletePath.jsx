const { Button } = VM.require("buildhub.near/widget/components");

State.init({
  path: props.path,
});

const value = Social.get(state.path, "final");

const text = `
\`\`\`json
${JSON.stringify(value, undefined, 2)}
\`\`\`
`;

const handleDelete = () => {
  // Assuming state.path is "flowscience.near/attestation/*"
  // Prepare the data to indicate deletion. Here, we use null as an example.
  const dataToDelete = { [state.path]: null };

  Social.set(dataToDelete, {
    onCommit: () => {
      console.log(`${state.path} data deleted successfully.`);
      // Additional logic to handle post-delete UI updates
    },
    onCancel: () => {
      console.log("Delete action cancelled.");
    },
    // You might not need 'force' if you're deleting. But if you're overwriting data,
    // and you want to ensure the overwrite happens, you might consider it.
    // force: true,
  });
};

return (
  <div>
    <div className="d-flex align-items-center">
      <input
        type="text"
        className="form-control me-2" // Bootstrap classes for input styling and margin
        value={state.path}
        placeholder="self.social.near/profile/**"
      />
      <Button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </Button>
    </div>
    <Markdown text={text} />
  </div>
);
