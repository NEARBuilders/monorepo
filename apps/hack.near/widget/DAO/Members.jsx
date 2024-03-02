const widgetProvider = "frichard5.near";
const daoId = props.daoId || "rc-dao.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/policy`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const membersFormatter = (roles) => {
  let memberList = [];
  if (Array.isArray(roles.kind) && roles.kind.length) {
    memberList = roles.kind.map((m) => {
      return (
        <a href={`https://explorer.near.org/accounts/${m}`} target="_blank">
          {m}
        </a>
      );
    });
  } else if (roles.kind.length) {
    memberList = [roles.kind];
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "200px",
        overflow: "scroll",
      }}
    >
      {memberList}
    </div>
  );
};

const columns = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "kind",
    label: "Members",
    formatter: membersFormatter,
  },
];

const GenericTable = (
  <Widget
    src={`${widgetProvider}/widget/generic_table`}
    props={{
      title: `Members`,
      columns,
      data: state.roles,
    }}
  />
);

const fetchPolicy = (daos) => {
  const policy = fetch(apiUrl + `?daos=${daos}`, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  policy.body &&
    State.update({
      policy: policy.body.state.policy,
      roles: policy.body.state.policy.roles,
      config: policy.body.state.config,
    });
};

if (!state.policy || state.daoId != daoId) fetchPolicy([daoId]);

return <div style={{ marginTop: "23px" }}>{state.policy && GenericTable}</div>;
