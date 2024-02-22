const $ = VM.require("sdks.near/widget/Loader");
const { DaoSDK } = $("@sdks/sputnik");
DaoSDK || (DaoSDK = () => {});

const [daoId, setDaoId] = useState(null);
const [fetched, setFetched] = useState(false);
const [sdk, setSdk] = useState(null);

return (
  <div className="d-flex gap-4 flex-column w-100">
    <div style={{ width: "50%" }} className="d-flex gap-4 flex-column w-100">
      <div>
        <label>Enter your Dao ID</label>
        <input
          value={daoId}
          placeholder="name.sputnik-dao.near"
          onChange={(e) => {
            setFetched(false);
            setDaoId(e.target.value);
          }}
        />
      </div>
      <button
        onClick={() => {
          setSdk(DaoSDK(daoId));
          setFetched(true);
        }}
      >
        Fetch Dao details
      </button>
    </div>

    {fetched && sdk && (
      <div style={{ overflow: "scroll" }}>
        <p>ID: {daoId}</p>
        <p>Version : {sdk.getDaoVersion()}</p>
        <p>Policy: {JSON.stringify(sdk.getPolicy() ?? {})}</p>
        <p>Config: {JSON.stringify(sdk.getConfig() ?? {})}</p>
        <p>
          Proposal by ID :{" "}
          {JSON.stringify(sdk.getProposalById({ proposalId: 2 }) ?? {})}
        </p>
        <p>
          Last Proposal ID : {JSON.stringify(sdk.getLastProposalId() ?? {})}
        </p>
        <p>
          Proposals:{" "}
          {JSON.stringify(sdk.getProposals({ offset: 2, limit: 10 }) ?? {})}
        </p>
        <p>
          Members by group ID: "council":{" "}
          {JSON.stringify(
            sdk.getMembersByGroupId({ groupId: "council" }) ?? {}
          )}
        </p>
        <p>
          Groups and their members:{" "}
          {JSON.stringify(sdk.getGroupsAndMembers() ?? {})}
        </p>
      </div>
    )}
  </div>
);
