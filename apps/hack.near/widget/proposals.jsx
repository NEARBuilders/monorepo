const widgetProvider = "frichard5.near";
const daoId = props.daoId || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/proposals/${daoId}`;
const apiPolicyUrl = `https://api.pikespeak.ai/daos/policy/${daoId}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const forgeUrl = (apiUrl, params) =>
  apiUrl +
  Object.keys(params).reduce(
    (paramString, p) => paramString + `${p}=${params[p]}&`,
    "?"
  );

const ProposalContainer = styled.div`
  margin-top: 40px;
  min-height: 100px;
`;

const ProposalFilters = styled.div`
  display: flex;
`;

const NoProposal = styled.div`
  text-align: center;
  margin-top: 100px;
`;

const resPerPage = 10;

State.init({
  offset: 0,
  lastProposalFetch: [],
  proposals: [],
  isLoading: false,
  type: "all",
  daoId: daoId,
  status: "all",
});

const columns = [
  {
    id: "submission_time",
    label: "Submission time",
  },
  {
    id: "proposal_id",
    label: "Proposal Id",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "proposal_type",
    label: "type",
  },
];

const nextPage = () => {
  State.update({ offset: state.offset + resPerPage });
};

const previousPage = () => {
  State.update({ offset: state.offset - resPerPage });
};

const GenericTable = (
  <Widget
    src={`${widgetProvider}/widget/generic_table`}
    props={{
      title: `${daoId} proposals`,
      columns,
      data: state.proposals,
      nextPage,
      previousPage,
      offset: state.offset,
      resPerPage,
    }}
  />
);

const fetchPolicy = () => {
  const policy = asyncFetch(apiPolicyUrl, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  }).then(({ err, body, ok }) => {
    if (ok) {
      State.update({
        council: body.state.policy.roles.find((r) => r.name === "Council").kind,
      });
    }
  });
};

const fetchProposal = (params) => {
  const proposals = asyncFetch(forgeUrl(apiUrl, params), {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  }).then(({ err, body, ok }) => {
    if (ok) {
      const allProposals = [...state.proposals, ...body];
      State.update({
        lastProposalFetch: body,
        proposals: allProposals,
        isLoading: false,
      });
    }
  });
};

if (!state.proposals.length) {
  fetchProposal({
    limit: resPerPage,
    offset: state.offset,
    proposal_type: state.type,
    status: state.status,
  });
  fetchPolicy();
}
if (state.daoId != daoId) {
  State.update({ proposals: [], daoId, offset: 0 });
}

const fetchMore = () => {
  if (!state.isLoading) {
    State.update({ offset: state.offset + resPerPage, isLoading: true });
    fetchProposal({
      limit: resPerPage,
      offset: state.offset,
      proposal_type: state.type,
      status: state.status,
    });
  }
};

const ProposalCards = [];

state.proposals.forEach((proposal) => {
  ProposalCards.push(
    <Widget
      src={`${widgetProvider}/widget/NDC-proposal-card`}
      props={{
        proposal,
        council: state.council,
      }}
    />
  );
});

const selectType = (e) => {
  State.update({ type: e.target.value, proposals: [], offset: 0 });
  fetchProposal({
    limit: resPerPage,
    offset: 0,
    proposal_type: e.target.value,
    status: state.status,
  });
};

const typeOptions = [
  "All",
  "Transfer",
  "Vote",
  "FunctionCall",
  "AddBounty",
  "BountyDone",
  "AddMemberToRole",
  "RemoveMemberFromRole",
  "ChangeConfig",
  "ChangePolicy",
  "ChangePolicyUpdateParameters",
  "ChangePolicyUpdateDefaultVotePolicy",
  "ChangePolicyRemoveRole",
  "ChangePolicyAddOrUpdateRole",
  "FactoryInfoUpdate",
  "SetStakingContract",
  "UpgradeRemote",
  "UpgradeSelf",
].map((t) => {
  return {
    value: t,
    label: t,
  };
});
const SelectType = (
  <Widget
    src={`${widgetProvider}/widget/NDC-select`}
    props={{
      options: typeOptions,
      selectedOption: state.type,
      onChange: selectType,
      label: "Type",
      id: "proposal-type-selector",
    }}
  />
);

const selectStatus = (e) => {
  State.update({ status: e.target.value, proposals: [], offset: 0 });
  fetchProposal({
    limit: resPerPage,
    offset: 0,
    proposal_type: state.type,
    status: e.target.value,
  });
};

const statusOptions = [
  "All",
  "Rejected",
  "InProgress",
  "Expired",
  "Approved",
].map((t) => {
  return {
    value: t,
    label: t,
  };
});

const SelectStatus = (
  <Widget
    src={`${widgetProvider}/widget/NDC-select`}
    props={{
      options: statusOptions,
      selectedOption: state.status,
      onChange: selectStatus,
      label: "Status",
      id: "proposal-type-selector",
    }}
  />
);

const ProposalInfiniteScroll = (
  <Widget
    src={`${widgetProvider}/widget/proposals_scroll`}
    props={{
      cards: ProposalCards,
      fetchMore: fetchMore,
      hasMore: state.lastProposalFetch.length === resPerPage,
    }}
  />
);

return (
  <ProposalContainer>
    <ProposalFilters>
      {SelectType}
      {SelectStatus}
    </ProposalFilters>
    {state.proposals.length ? (
      ProposalInfiniteScroll
    ) : (
      <NoProposal>No proposal found.</NoProposal>
    )}
  </ProposalContainer>
);
