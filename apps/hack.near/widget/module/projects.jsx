const projects = VM.require("hack.near/widget/data.projects") || [];

const Children = props.children;

return <Children projects={projects} />;
