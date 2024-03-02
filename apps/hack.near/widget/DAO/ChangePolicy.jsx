const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "meta.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "Loading...";
}

const deposit = policy.proposal_bond;

const groups = policy.roles
  .filter((role) => role.kind.Group)
  .map((role) => ({
    name: role.name,
    members: role.kind.Group,
  }));

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "reconfigure policy",
          kind: {
            ChangePolicy: {
              policy: {
                roles: [
                  {
                    name: "all",
                    kind: "Everyone",
                    permissions: ["call:AddProposal"],
                    vote_policy: {},
                  },
                  {
                    name: "council",
                    kind: {
                      Group: ["hack.near"],
                    },
                    permissions: [
                      "add_member_to_role:AddProposal",
                      "bounty_done:VoteApprove",
                      "add_bounty:VoteReject",
                      "add_bounty:AddProposal",
                      "config:VoteReject",
                      "add_bounty:VoteApprove",
                      "remove_member_from_role:VoteReject",
                      "policy:VoteRemove",
                      "transfer:VoteRemove",
                      "vote:VoteApprove",
                      "upgrade_self:VoteApprove",
                      "call:VoteRemove",
                      "upgrade_self:AddProposal",
                      "upgrade_remote:AddProposal",
                      "upgrade_remote:VoteReject",
                      "upgrade_remote:VoteApprove",
                      "vote:AddProposal",
                      "add_member_to_role:VoteReject",
                      "bounty_done:VoteReject",
                      "call:AddProposal",
                      "upgrade_self:VoteRemove",
                      "add_bounty:VoteRemove",
                      "remove_member_from_role:VoteRemove",
                      "config:VoteRemove",
                      "call:VoteApprove",
                      "add_member_to_role:VoteRemove",
                      "policy:AddProposal",
                      "add_member_to_role:VoteApprove",
                      "policy:VoteApprove",
                      "transfer:VoteApprove",
                      "config:AddProposal",
                      "*:Finalize",
                      "remove_member_from_role:VoteApprove",
                      "set_vote_token:VoteReject",
                      "bounty_done:AddProposal",
                      "set_vote_token:AddProposal",
                      "policy:VoteReject",
                      "set_vote_token:VoteRemove",
                      "remove_member_from_role:AddProposal",
                      "transfer:VoteReject",
                      "transfer:AddProposal",
                      "call:VoteReject",
                      "upgrade_remote:VoteRemove",
                      "upgrade_self:VoteReject",
                      "vote:VoteReject",
                      "bounty_done:VoteRemove",
                      "vote:VoteRemove",
                      "set_vote_token:VoteApprove",
                      "config:VoteApprove",
                    ],
                    vote_policy: {
                      add_member_to_role: {
                        quorum: "0",
                        threshold: [1, 2],
                        weight_kind: "RoleWeight",
                      },
                      remove_member_from_role: {
                        quorum: "0",
                        threshold: [1, 2],
                        weight_kind: "RoleWeight",
                      },
                      call: {
                        quorum: "0",
                        threshold: [1, 2],
                        weight_kind: "RoleWeight",
                      },
                      transfer: {
                        quorum: "0",
                        threshold: [1, 2],
                        weight_kind: "RoleWeight",
                      },
                      set_vote_token: {
                        quorum: "0",
                        threshold: [1, 2],
                        weight_kind: "RoleWeight",
                      },
                      policy: {
                        quorum: "0",
                        threshold: [1, 2],
                        weight_kind: "RoleWeight",
                      },
                      config: {
                        quorum: "0",
                        threshold: [1, 2],
                        weight_kind: "RoleWeight",
                      },
                      upgrade_self: {
                        quorum: "0",
                        threshold: [1, 2],
                        weight_kind: "RoleWeight",
                      },
                      upgrade_remote: {
                        quorum: "0",
                        threshold: [1, 2],
                        weight_kind: "RoleWeight",
                      },
                      add_bounty: {
                        quorum: "0",
                        threshold: [1, 2],
                        weight_kind: "RoleWeight",
                      },
                      bounty_done: {
                        quorum: "0",
                        threshold: [1, 2],
                        weight_kind: "RoleWeight",
                      },
                      vote: {
                        quorum: "0",
                        threshold: [1, 2],
                        weight_kind: "RoleWeight",
                      },
                    },
                  },
                  {
                    name: "community",
                    kind: {
                      Group: ["infinity.near"],
                    },
                    permissions: [],
                    vote_policy: {
                      add_member_to_role: {
                        quorum: "0",
                        threshold: [69, 100],
                        weight_kind: "RoleWeight",
                      },
                      remove_member_from_role: {
                        quorum: "0",
                        threshold: [69, 100],
                        weight_kind: "RoleWeight",
                      },
                      call: {
                        quorum: "0",
                        threshold: [69, 100],
                        weight_kind: "RoleWeight",
                      },
                      transfer: {
                        quorum: "0",
                        threshold: [69, 100],
                        weight_kind: "RoleWeight",
                      },
                      set_vote_token: {
                        quorum: "0",
                        threshold: [69, 100],
                        weight_kind: "RoleWeight",
                      },
                      policy: {
                        quorum: "0",
                        threshold: [69, 100],
                        weight_kind: "RoleWeight",
                      },
                      config: {
                        quorum: "0",
                        threshold: [69, 100],
                        weight_kind: "RoleWeight",
                      },
                      upgrade_self: {
                        quorum: "0",
                        threshold: [69, 100],
                        weight_kind: "RoleWeight",
                      },
                      upgrade_remote: {
                        quorum: "0",
                        threshold: [69, 100],
                        weight_kind: "RoleWeight",
                      },
                      add_bounty: {
                        quorum: "0",
                        threshold: [69, 100],
                        weight_kind: "RoleWeight",
                      },
                      bounty_done: {
                        quorum: "0",
                        threshold: [69, 100],
                        weight_kind: "RoleWeight",
                      },
                      vote: {
                        quorum: "0",
                        threshold: [69, 100],
                        weight_kind: "RoleWeight",
                      },
                    },
                  },
                ],
                default_vote_policy: {
                  quorum: "0",
                  threshold: [1, 2],
                  weight_kind: "RoleWeight",
                },
                proposal_bond: "100000000000000000000000",
                proposal_period: "604800000000000",
                bounty_bond: "100000000000000000000000",
                bounty_forgiveness_period: "604800000000000",
              },
            },
          },
        },
      },
      gas: 300000000000000,
      deposit: deposit,
    },
  ]);
};

return (
  <div>
    <button
      disabled={!daoId}
      className="btn btn-outline-success"
      onClick={handleProposal}
    >
      Propose Changes
    </button>
  </div>
);
