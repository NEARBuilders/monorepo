const { generateUID } = VM.require("flowscience.near/widget/generateUID");
const jsonSchemaEASSchema = {
  schema: `${context.accountId}/jsonschema/${path}`,
  id: generateUID(),
  title: "JSON EAS Schema",
  description: "A JSON Schema for the EAS Schema Type",
  type: "object", // object or boolean
  properties: {
    uid: "",
    resolver: {
      resolverPath: "",
      resolverData: "",
    },
    revocable: True,
    fields: {},
  }, // description, type, and modifiers
  required: ["uid", "revocable", "fields"],
};

return { jsonSchemaEASSchema };
