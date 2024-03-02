const thingId = props.thingId || "one";
const template = props.template || "hack.near/widget/community.page";
const thing = JSON.parse(
  Social.get(`james.near/thing/page/${thingId}`) || "null"
);
// return <p>{JSON.stringify(thing)}</p>;

return <Widget src={template} props={thing} />;
