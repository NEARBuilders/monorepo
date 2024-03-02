const accountId = props.accountId ?? context.accountId;

let widgetName;

const daoId = props.daoId ?? "build.sputnik-dao.near";
const proposalId = props.proposalId;

let proposal = props.proposal && JSON.parse(JSON.stringify(props.proposal));

if (!proposal && proposalId && daoId) {
  let new_proposal = Near.view(daoId, "get_proposal", {
    id: Number(proposalId),
  });
  if (new_proposal) {
    proposal = new_proposal;
  } else if (new_proposal === null) {
    return "Loading...";
  } else {
    return "Proposal not found, check console for details.";
  }
} else if (!proposal) {
  return "Please provide a proposal or proposalId.";
}

const proposalKinds = {
  FunctionCall: "call",
};

const actionTypes = {
  AddProposal: "AddProposal",
  VoteApprove: "VoteApprove",
  VoteReject: "VoteReject",
  VoteRemove: "VoteRemove",
};

// -- Get all the roles from the DAO policy
let roles = Near.view(daoId, "get_policy");
roles = roles === null ? [] : roles.roles;

const isUserAllowedTo = (user, kind, action) => {
  // -- Filter the user roles
  const userRoles = [];
  for (const role of roles) {
    if (role.kind === "Everyone") {
      userRoles.push(role);
      continue;
    }
    if (!role.kind.Group) continue;
    if (accountId && role.kind.Group && role.kind.Group.includes(accountId)) {
      userRoles.push(role);
    }
  }

  // -- Check if the user is allowed to perform the action
  let allowed = false;

  userRoles
    .filter(({ permissions }) => {
      const allowedRole =
        permissions.includes(`${kind.toString()}:${action.toString()}`) ||
        permissions.includes(`${kind.toString()}:*`) ||
        permissions.includes(`*:${action.toString()}`) ||
        permissions.includes("*:*");
      allowed = allowed || allowedRole;
      return allowedRole;
    })
    .map((role) => role.name);

  return allowed;
};

const canPropose = isUserAllowedTo(
  accountId,
  proposalKinds.FunctionCall,
  actionTypes.AddProposal
);
const canVote = isUserAllowedTo(
  accountId,
  proposalKinds.FunctionCall,
  actionTypes.VoteApprove
);

proposal.type =
  typeof proposal.kind === "string"
    ? proposal.kind
    : Object.keys(proposal.kind)[0];
proposal.type = proposal.type.replace(/([A-Z])/g, " $1").trim(); // Add spaces between camelCase

proposal.status = proposal.status.replace(/([A-Z])/g, " $1").trim(); // Add spaces between camelCase

// ==============================
// Styled Components
// ==============================

const statusColor =
  proposal.status === "Approved"
    ? "#28a930"
    : proposal.status === "In Progress"
    ? "#58a1ff"
    : proposal.status === "Failed"
    ? "#dc3545"
    : "#6c757d";

const statusBackgroundColor =
  proposal.status === "Approved"
    ? "#ecf7ef"
    : proposal.status === "Failed" || proposal.status === "Rejected"
    ? "#fdf4f4"
    : "#fff";

const Card = styled.div`
  background-color: ${statusBackgroundColor};

`;

const Wrapper = styled.div`
  background-color: ${statusBackgroundColor};
  margin: 23px auto;
  max-width: 888px;
  border-radius: 16px;
  padding: 19px;
  display: flex;
  flex-direction: column;
  gap: 23px;

  p {
    line-height: 1.4;
    font-weight: 400;
    font-size: 15px;
    color: #868682;
    margin: 0;
  }

  h3 {
    font-weight: 600;
    font-size: 29px;
    color: #1b1b18;
  }

  h5 {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
    color: #6c757d;
  }

  .status {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    color: ${statusColor};
  }
`;

const MarkdownContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 24px;
  background-color: #f8f9fa;
  color: #1b1b18;
  border-radius: 14px;
  max-height: 700px;
  overflow-y: auto;
  color: #333;
  line-height: 1.6;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

  h1 {
    font-size: 2em;
    color: #111;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.3em;
    margin-bottom: 1em;
  }

  h2 {
    font-size: 1.5em;
    color: #222;
    margin-bottom: 0.75em;
  }

  h3 {
    font-size: 1.3em;
    color: #333;
    margin-bottom: 0.6em;
  }

  h4 {
    font-size: 1.2em;
    color: #444;
    margin-bottom: 0.5em;
  }

  h5 {
    font-size: 1.1em;
    color: #555;
    margin-bottom: 0.4em;
  }

  p {
    font-size: 1em;
    margin-bottom: 1em;
  }

  a {
    color: #0645ad;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

function deepSortObject(obj) {
  if (typeof obj !== "object" || obj === null) {
    // Return non-object values as is
    return obj;
  }

  if (Array.isArray(obj)) {
    // If the input is an array, recursively sort each element
    return obj.map(deepSortObject).sort();
  }

  const sortedObject = {};
  const sortedKeys = Object.keys(obj).sort((keyA, keyB) => {
    // Compare keys in a case-insensitive manner
    return keyA.toLowerCase().localeCompare(keyB.toLowerCase());
  });

  for (const key of sortedKeys) {
    sortedObject[key] = deepSortObject(obj[key]);
  }

  return sortedObject;
}

const proposal_type =
  typeof proposal.kind === "string"
    ? proposal.kind
    : Object.keys(proposal.kind)[0];

const actions = proposal.kind.FunctionCall.actions;

if (!actions || actions.length === 0) {
  return null;
}

const details = actions.map(({ args }) => {
  const selectedArgs = JSON.parse(Buffer.from(args, "base64").toString("utf8"));

  widgetName = Object.keys(selectedArgs.data[daoId].widget)[0];

  if (!widgetName) {
    return "";
  }

  const newCode = selectedArgs.data[daoId].widget[widgetName][""];

  if (!newCode) {
    return "";
  }

  const baseCode = Social.get(`${daoId}/widget/${widgetName}`);

  if (!baseCode) {
    return "";
  }
});

const proposalURL = `/#/sking.near/widget/DAO.Page?daoId=${daoId}&tab=proposal&proposalId=${proposal.id}`;
return (
  <Wrapper>
    <div className="row justify-content-between align-items-center text-muted">
      <div className="col-auto mb-1">
        <h4>
          proposal{" "}
          <a
            className="text-muted"
            href={proposalURL}
            target="_blank"
            rel="noreferrer"
          >
            #{proposal.id}
          </a>
        </h4>
      </div>
      <div className="col-auto mb-1">
        <Widget
          src="hack.near/widget/dev.profile.line"
          props={{ accountId: proposal.proposer }}
        />
      </div>
    </div>
    <div className="mb-2 justify-content-between align-items-center">
      <Widget
        src="hack.near/widget/widget.inline"
        props={{
          widgetPath: `${daoId}/widget/${widgetName}`,
        }}
      />
    </div>
    {canVote && (
      <div className="me-1">
        <Widget
          src="hack.near/widget/dev.proposal.vote"
          props={{
            daoId: daoId,
            proposal: proposal,
            isAllowedToVote: [
              isAllowedToVoteYes,
              isAllowedToVoteNo,
              isAllowedToVoteRemove,
            ],
          }}
        />
      </div>
    )}
    <div className="row justify-content-between">
      <div className="mb-3">
        <Widget
          src="hack.near/widget/dev.proposal.comments"
          props={{
            daoId: daoId,
            proposal: proposal,
          }}
        />
      </div>
      <div className="col-auto m-2">
        <button
          className="btn btn-sm btn-outline-secondary border-0"
          data-bs-toggle="collapse"
          data-bs-target={`.details`}
          aria-expanded="false"
          aria-controls={"details"}
        >
          <i className="bi bi-arrows-expand me-1"></i> see proposed changes
        </button>
      </div>
    </div>
    <div className="collapse details">
      <Widget
        src="hack.near/widget/widget.compare"
        props={{
          updatedWidget: `${proposal.proposer}/widget/${widgetName}`,
          widgetPath: `${daoId}/widget/${widgetName}`,
          ...props,
        }}
      />
    </div>
  </Wrapper>
);
