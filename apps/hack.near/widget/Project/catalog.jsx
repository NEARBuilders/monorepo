const curatorId = props.curatorId ?? "awesomebos.near";

const projects = Social.get(`${curatorId}/catalog/**`);

return projects;
