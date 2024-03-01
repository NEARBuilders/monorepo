const { id, doc, by } = props;

const final_id = "a67a3a51-d70b-b5ac-a105-372b60c375fa";

const final_by = "flowscience.near";

if (final_id !== "??replace_with_id??") {
  id = final_id;
}

if (final_by !== "??replace_with_account??") {
  by = final_by;
}

const project = Social.get(`${by}/thing/project/${id}/**`);
const docs = Social.get(`${by}/document/${id}/*/title`);

if (project === null || docs === null) return <></>;
if (project === undefined) return <>Project not found</>;

State.init({
  doc: props.doc,
  data: null,
});

if (state.doc) {
  State.update({
    data: Social.get(`${by}/document/${id}/${state.doc}/**`),
  });
} else {
  State.update({
    doc: Object.keys(docs || {})?.[0],
  });
}

const goTo = ({ doc }) => {
  doc && State.update({ doc: doc });
};

const href = ({ doc }) => {
  return `#/createit.near/widget/p?id=${id}&by=${by}&doc=${doc}`;
};

const unflattenDocuments = (inputObject) => {
  if (!inputObject) {
    return inputObject;
  }
  const result = {};
  Object.keys(inputObject).forEach((key) => {
    const keys = key.split(".");
    let currentLevel = result;

    keys.forEach((k, i) => {
      if (i === keys.length - 1) {
        if (currentLevel[k] && Object.keys(currentLevel[k] || {}).length > 0) {
          Object.assign(currentLevel[k], inputObject[key]);
        } else {
          currentLevel[k] = inputObject[key];
        }
        currentLevel[k].path = key;
      } else {
        currentLevel[k] = currentLevel[k] || {};
        currentLevel[k].children = currentLevel[k].children || {};
        currentLevel = currentLevel[k].children;
      }
    });
  });

  return result;
};

return (
  <Widget
    src={
      project.template.src || "createit.near/widget/templates.project.doc"
    }
    props={{
      project: project.data,
      theme: project.template.theme,
      documents: docs,
      folders: unflattenDocuments(docs),
      activeDocument: state.doc,
      activeDocumentData: state.data,
      goTo,
      href,
    }}
  />
);
