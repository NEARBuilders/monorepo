if (!context.accountId) {
  return (
    <Widget
      src="nearhorizon.near/widget/InfoSegment"
      props={{
        title: "Not logged in!",
        description: "Connect a NEAR account to create a new page.",
      }}
    />
  );
}

const daos = Near.view("sputnik-dao.near", "get_dao_list");

if (daos === null) {
  return "Loading...";
}

const groups = [
  {
    name: "council",
    slug: "council",
    kind: {
      Group: [context.accountId],
    },
    permissions: [
      "*:Finalize",
      "policy:AddProposal",
      "add_bounty:AddProposal",
      "bounty_done:AddProposal",
      "transfer:AddProposal",
      "vote:AddProposal",
      "remove_member_from_role:AddProposal",
      "add_member_to_role:AddProposal",
      "config:AddProposal",
      "call:AddProposal",
      "upgrade_remote:AddProposal",
      "upgrade_self:AddProposal",
      "set_vote_token:AddProposal",
      "policy:VoteApprove",
      "policy:VoteReject",
      "policy:VoteRemove",
      "add_bounty:VoteApprove",
      "add_bounty:VoteReject",
      "add_bounty:VoteRemove",
      "bounty_done:VoteApprove",
      "bounty_done:VoteReject",
      "bounty_done:VoteRemove",
      "transfer:VoteApprove",
      "transfer:VoteReject",
      "transfer:VoteRemove",
      "vote:VoteApprove",
      "vote:VoteReject",
      "vote:VoteRemove",
      "remove_member_from_role:VoteApprove",
      "remove_member_from_role:VoteReject",
      "remove_member_from_role:VoteRemove",
      "add_member_to_role:VoteApprove",
      "add_member_to_role:VoteReject",
      "add_member_to_role:VoteRemove",
      "call:VoteApprove",
      "call:VoteReject",
      "call:VoteRemove",
      "config:VoteApprove",
      "config:VoteReject",
      "config:VoteRemove",
      "set_vote_token:VoteApprove",
      "set_vote_token:VoteReject",
      "set_vote_token:VoteRemove",
      "upgrade_self:VoteApprove",
      "upgrade_self:VoteReject",
      "upgrade_self:VoteRemove",
      "upgrade_remote:VoteApprove",
      "upgrade_remote:VoteReject",
      "upgrade_remote:VoteRemove",
    ],
    vote_policy: {},
  },
  {
    name: "all",
    slug: "all",
    kind: "Everyone",
    permissions: [
      "policy:AddProposal",
      "add_bounty:AddProposal",
      "bounty_done:AddProposal",
      "transfer:AddProposal",
      "vote:AddProposal",
      "remove_member_from_role:AddProposal",
      "add_member_to_role:AddProposal",
      "config:AddProposal",
      "call:AddProposal",
      "upgrade_remote:AddProposal",
      "upgrade_self:AddProposal",
      "set_vote_token:AddProposal",
      "vote:VoteApprove",
      "vote:VoteReject",
      "vote:VoteRemove",
    ],
    vote_policy: {},
  },
];

State.init({
  name: "",
  nameError: "",
  description: "",
  descriptionError: "",
  tags: [],
  tagsError: "",
  isValid: false,
  isAvailable: true,
  args: {
    config: {
      name: "",
      purpose: "",
      metadata: "",
    },
    policy: {
      roles: groups,
      default_vote_policy: {
        weight_kind: "RoleWeight",
        quorum: "0",
        threshold: [1, 2],
      },
      proposal_bond: "100000000000000000000000",
      proposal_period: "604800000000000",
      bounty_bond: "100000000000000000000000",
      bounty_forgiveness_period: "604800000000000",
    },
    purpose: "",
    bond: "100000000000000000000000",
    vote_period: "604800000000000",
    grace_period: "86400000000000",
  },
});

if (!state.accountsWithPermissionsIsFetched) {
  Near.asyncView(
    "social.near",
    "debug_get_permissions",
    { account_id: context.accountId },
    "final",
    false
  ).then((data) =>
    State.update({
      accountsWithPermissions: data
        .map(([info]) => info)
        .filter((info) => "AccountId" in info)
        .map(({ AccountId }) => AccountId),
      accountsWithPermissionsIsFetched: true,
    })
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 3em;
  padding-bottom: 3em;
`;

const Header = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 2em;
  line-height: 1.4em;
  text-align: center;
  color: #000000;
`;

const SubHeader = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 0.95em;
  line-height: 1.25em;
  text-align: center;
  color: #101828;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 60%;
  gap: 1em;
`;

const FormHeader = styled.h3`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px 0.5em;
  border-bottom: 1px solid #eceef0;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.25em;
  color: #000000;
  width: 100%;
`;

const FormFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const slideDown = styled.keyframes`
  from {
    height: 0;
  }
  to {
    height: var(--radix-collapsible-content-height);
  }
`;

const slideUp = styled.keyframes`
  from {
    height: var(--radix-collapsible-content-height);
  }
  to {
    height: 0;
  }
`;

const Hidable = styled("Collapsible.Content")`
  overflow: hidden;

  &[data-state="open"] {
    animation: ${slideDown} 0.3s ease-in-out;
  }

  &[data-state="closed"] {
    animation: ${slideUp} 0.3s ease-in-out;
  }
`;

const Label = styled.label`
  align-items: flex-start;
  justify-content: flex-start;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1.25em;
  color: #344054;
`;

const onChangeName = (name) => {
  State.update({
    name,
  });
};

const checkValidity = (name) => {
  if (name.length > 2) {
    return State.update({ isValid: true });
  }
};

const validName = checkValidity(state.name);

const daoId = state.name + ".sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

const deposit = policy.proposal_bond;

const checkAvailability = (daos) => {
  if (daos.indexOf(daoId) !== -1) {
    return State.update({ isAvailable: false });
  }
};

const availableName = checkAvailability(daos);

const dao_args = Buffer.from(JSON.stringify(state.args), "utf-8").toString(
  "base64"
);

const handleCreate = () => {
  Near.call([
    {
      contractName: "sputnik-dao.near",
      methodName: "create",
      args: {
        name: state.name,
        args: dao_args,
      },
      deposit: "7000000000000000000000000",
      gas: "2350000000000000",
    },
  ]);
};

const pageData = {
  data: {
    logo: {
      ipfs_cid: "bafkreibe7xxkxhryvhonkwltubgfus6mfpinzaxwwfooi63w5etmrd7mcm",
    },
    background: {
      ipfs_cid: "bafkreifz7ipx5e3pb7dfy7lxb7qd5tjzxkosb4c5a5n7fytovvpg75g7u4",
    },
    name: "Welcome Home",
    description: {
      content:
        "An International realty platform empowering marginalized communities to own real world assets one piece at a time.",
    },
    tabs: [
      {
        title: "Overview",
        route: "efiz.near/widget/overview",
      },
      {
        defaultActive: "false",
        route: "efiz.near/thing/welcome-home.feed",
        title: "Social",
      },
      {
        route: "efiz.near/widget/every.event",
        title: "Events",
      },
    ],
  },
  template: {
    src: "efiz.near/widget/gigs-board.entity.community.header",
  },
  type: "efiz.near/type/community",
};

return (
  <Container>
    <Header>page maker</Header>
    <Form>
      <FormHeader>input details below</FormHeader>
      <Label>name</Label>
      <input
        label="name"
        placeholder="example"
        type="text"
        value={state.name}
        onChange={(e) => onChangeName(e.target.value)}
      ></input>
      {validName ? (
        <div>
          {availableName ? (
            <p className="text-secondary">occupied</p>
          ) : (
            <p className="text-success">available</p>
          )}
        </div>
      ) : (
        <div>
          {state.name ? (
            <p className="text-secondary">not enough characters</p>
          ) : (
            ""
          )}
        </div>
      )}
      {validName && (
        <>
          <Widget
            src="hack.near/widget/form.select"
            props={{
              label: "tags",
              placeholder: "dev",
              options: [
                { name: "dev" },
                { name: "edu" },
                { name: "art" },
                { name: "sci" },
                { name: "gov" },
              ],
              value: state.tags,
              onChange: (tags) =>
                State.update({
                  tags: tags.map(({ name }) => ({
                    name: name.trim().replaceAll(/\s+/g, "-"),
                  })),
                }),
            }}
          />
          <Widget
            src="hack.near/widget/form.text.area"
            props={{
              label: "description",
              placeholder: "about",
              value: state.description,
              onChange: (description) => State.update({ description }),
              validate: () => {
                if (state.description.length > 500) {
                  State.update({
                    descriptionError:
                      "Description must be less than 500 characters",
                  });
                  return;
                }

                State.update({ descriptionError: "" });
              },
              error: state.descriptionError,
            }}
          />
        </>
      )}
      {validName && (
        <FormFooter>
          <Widget
            src="nearhorizon.near/widget/Buttons.Green"
            props={{
              onClick: () => {
                const data = {
                  [context.accountId]: {
                    page: {
                      template: {
                        src: "efiz.near/widget/gigs-board.entity.community.header",
                      },
                      type: "efiz.near/type/community",
                      name: state.name,
                      ...(state.description
                        ? { description: state.description }
                        : {}),
                      ...(state.tags.length
                        ? {
                            tags: state.tags.reduce(
                              (acc, { name }) =>
                                Object.assign(acc, { [name]: "" }),
                              {}
                            ),
                          }
                        : {}),
                    },
                  },
                };
                const transactions = [
                  {
                    contractName: "social.near",
                    methodName: "set",
                    deposit,
                    args: { data },
                  },
                  {
                    contractName: "sputnik-dao.near",
                    methodName: "create",
                    args: {
                      name: state.name,
                      args: dao_args,
                    },
                    deposit: "7000000000000000000000000",
                    gas: "235000000000000",
                  },
                ];
                Near.call(transactions);
              },
              text: (
                <>
                  <svg
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.875 16.5V12.75M2.875 5.25V1.5M1 3.375H4.75M1 14.625H4.75M9.25 2.25L7.94937 5.63165C7.73786 6.18157 7.6321 6.45653 7.46765 6.68781C7.32189 6.8928 7.1428 7.07189 6.93781 7.21765C6.70653 7.3821 6.43157 7.48786 5.88165 7.69937L2.5 9L5.88165 10.3006C6.43157 10.5121 6.70653 10.6179 6.93781 10.7824C7.1428 10.9281 7.32189 11.1072 7.46765 11.3122C7.6321 11.5435 7.73786 11.8184 7.94937 12.3684L9.25 15.75L10.5506 12.3684C10.7621 11.8184 10.8679 11.5435 11.0324 11.3122C11.1781 11.1072 11.3572 10.9281 11.5622 10.7824C11.7935 10.6179 12.0684 10.5121 12.6184 10.3006L16 9L12.6184 7.69937C12.0684 7.48786 11.7935 7.3821 11.5622 7.21765C11.3572 7.07189 11.1781 6.8928 11.0324 6.68781C10.8679 6.45653 10.7621 6.18157 10.5506 5.63165L9.25 2.25Z"
                      stroke="#11181C"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  create
                </>
              ),
            }}
          />
        </FormFooter>
      )}
    </Form>
  </Container>
);
