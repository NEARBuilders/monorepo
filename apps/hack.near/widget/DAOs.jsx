const accountId = props.accountId ?? context.accountId;
const contractId = props.contractId ?? "sputnik-dao.near";
const groupId = props.groupId ?? "council";
const daos = Near.view(contractId, "get_dao_list");

return (
  <>
    <div>
      <h3>DAOs:</h3>
      <div>
        {daos.map((dao, i) => (
          <a
            key={i}
            className="text-decoration-none"
            href={`#hack.near/widget/Groups?daoId=${dao}`}
          >
            <h4>{dao}</h4>
          </a>
        ))}
      </div>
    </div>
  </>
);
