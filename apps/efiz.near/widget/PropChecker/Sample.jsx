const { typeToEmptyData, MissingPropsWarning } = VM.require(
  "devs.near/widget/everything.sdk"
);

const typeDef = {
  properties: {
    name: {
      type: "string",
    },
  },
};

State.init(typeToEmptyData(typeDef));

return (
  <>
    <MissingPropsWarning
      props={props}
      typeDef={typeDef}
      WarningElement={({ missingProps }) => (
        <p>This is a custom element: {JSON.stringify(missingProps)}</p>
      )}
    />
    <MissingPropsWarning props={props} typeDef={typeDef} />
    <p>{JSON.stringify(state)}</p>
  </>
);
