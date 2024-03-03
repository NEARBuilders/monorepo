const accountId = props.accountId ?? context.accountId;
const groupId = props.groupId ?? "526fb256e74eelmf0nw3n5909bc189c13d";
const creatorId = props.creatorId ?? "devs.near";

if (!props.accountId || !context.accountId) {
  return "";
}

const o = Social.keys(`${creatorId}/graph/${groupId}/${accountId}`, undefined, {
  values_only: true,
});

return o && Object.keys(o).length ? (
  <span className="badge bg-secondary fw-light">Member</span>
) : (
  ""
);
