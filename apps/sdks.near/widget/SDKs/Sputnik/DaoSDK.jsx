const filterFunction = (item, filterStatusArray, filterKindArray) => {
  const kind =
    typeof item.kind === "string" ? item.kind : Object.keys(item.kind)[0];
  if (filterStatusArray.length > 0 && filterKindArray.length > 0) {
    return (
      filterStatusArray.includes(item.status) && filterKindArray.includes(kind)
    );
  } else if (filterKindArray.length > 0) {
    return filterKindArray.includes(kind);
  } else if (filterStatusArray.length > 0) {
    return filterStatusArray.includes(item.status);
  }
  return true;
};

return (daoId, proposalId, factoryId) => {
  const DaoSDK = {
    getDaoVersion: () => {
      return Near.view(daoId, "version");
    },
    getPolicy: () => {
      return Near.view(daoId, "get_policy");
    },
    getConfig: () => {
      return Near.view(daoId, "get_config");
    },

    // PROPOSALS
    getProposalById: ({ proposalId }) => {
      return Near.view(daoId, "get_proposal", {
        id: parseInt(proposalId)
      });
    },
    getLastProposalId: () => {
      return Near.view(daoId, "get_last_proposal_id");
    },
    getProposals: ({ offset, limit }) => {
      return Near.view(daoId, "get_proposals", {
        from_index: offset,
        limit: limit
      });
    },
    // reverse: boolean, resPerPage: number, filterStatusArray:Array<string>, offset: number
    getFilteredProposalsByStatus: ({
      resPerPage,
      reverse,
      filterStatusArray,
      offset
    }) => {
      let newLastProposalId = offset ?? 0;
      let filteredProposals = [];
      const limit = 30;
      const lastProposalId = DaoSDK.getLastProposalId();
      if (reverse && !offset) {
        newLastProposalId = lastProposalId;
      }
      const promiseArray = [];
      while (
        (reverse && newLastProposalId > 0) ||
        (!reverse && newLastProposalId < lastProposalId)
      ) {
        promiseArray.push(
          Near.asyncView(daoId, "get_proposals", {
            from_index:
              newLastProposalId - limit > 0 ? newLastProposalId - limit : 0,
            limit: limit
          })
        );
        if (reverse) {
          newLastProposalId -= limit;
        } else {
          newLastProposalId += limit;
        }
      }
      return Promise.all(promiseArray).then((res) => {
        const proposals = [].concat(...res);
        filteredProposals = proposals.filter((item) =>
          filterStatusArray.includes(item.status)
        );
        const newArray = filteredProposals.slice(0, resPerPage);
        if (reverse) {
          newArray.reverse();
        }
        return {
          filteredProposals: newArray,
          totalLength: filteredProposals.length
        };
      });
    },
    // reverse: boolean, resPerPage: number, filterKindArray:Array<string>, offset: number
    getFilteredProposalsByKind: ({
      resPerPage,
      reverse,
      filterKindArray,
      offset
    }) => {
      let newLastProposalId = offset ?? 0;
      const limit = 30;
      const lastProposalId = DaoSDK.getLastProposalId();
      if (reverse && !offset) {
        newLastProposalId = lastProposalId;
      }
      const promiseArray = [];
      while (
        (reverse && newLastProposalId > 0) ||
        (!reverse && newLastProposalId < lastProposalId)
      ) {
        promiseArray.push(
          Near.asyncView(daoId, "get_proposals", {
            from_index:
              newLastProposalId - limit > 0 ? newLastProposalId - limit : 0,
            limit: limit
          })
        );
        if (reverse) {
          newLastProposalId -= limit;
        } else {
          newLastProposalId += limit;
        }
      }
      return Promise.all(promiseArray).then((res) => {
        const proposals = [].concat(...res);
        const filteredProposals = proposals.filter((item) => {
          const kind =
            typeof kind === "string" ? kind : Object.keys(item.kind)[0];
          return filterKindArray.includes(kind);
        });
        const newArray = filteredProposals.slice(0, resPerPage);
        if (reverse) {
          newArray.reverse();
        }
        return {
          filteredProposals: newArray,
          totalLength: filteredProposals.length
        };
      });
    },
    getFilteredProposalsByStatusAndkind: ({
      resPerPage,
      reverse,
      filterKindArray,
      filterStatusArray,
      offset
    }) => {
      let newLastProposalId = offset ?? 0;
      let filteredProposals = [];
      const lastProposalId = DaoSDK.getLastProposalId();
      const limit = 30;
      if (reverse && !offset) {
        newLastProposalId = lastProposalId;
      }
      const promiseArray = [];
      while (
        (reverse && newLastProposalId > 0) ||
        (!reverse && newLastProposalId < lastProposalId)
      ) {
        promiseArray.push(
          Near.asyncView(daoId, "get_proposals", {
            from_index:
              newLastProposalId - limit > 0 ? newLastProposalId - limit : 0,
            limit: limit
          })
        );
        if (reverse) {
          newLastProposalId -= limit;
        } else {
          newLastProposalId += limit;
        }
      }
      return Promise.all(promiseArray).then((res) => {
        const proposals = [].concat(...res);
        filteredProposals = proposals.filter((item) =>
          filterFunction(item, filterStatusArray, filterKindArray)
        );
        const newArray = filteredProposals.slice(0, resPerPage);
        if (reverse) {
          newArray.reverse();
        }
        return {
          filteredProposals: newArray,
          totalLength: filteredProposals.length
        };
      });
    },
    // ROLES + PERMISSIONS + PROPOSALS
    // returns array of members for a particular groupId
    getMembersByGroupId: ({ groupId }) => {
      const policy = DaoSDK.getPolicy(daoId);
      return Array.isArray(policy.roles)
        ? policy?.roles
            .filter((role) => role.name === groupId)
            .map((role) => {
              const group = role.kind.Group;
              return group;
            })?.[0]
        : [];
    },
    // return [{ members:{},permissions:{},name:"" }]
    getGroupsAndMembers: () => {
      const policy = DaoSDK.getPolicy(daoId);
      const data = [];
      if (Array.isArray(policy.roles)) {
        policy.roles.map((role) => {
          data.push({
            name: role.name,
            permissions: role.permissions,
            members: role.kind.Group
          });
        });
      }
      return data;
    },
    // returns a boolean indicating whether the user has the specified permission or not
    hasPermission: ({ accountId, kindName, actionType }) => {
      const isAllowed = false;
      const policy = DaoSDK.getPolicy(daoId);
      if (Array.isArray(policy.roles)) {
        const permissions = policy.roles.map((role) => {
          if (
            Array.isArray(role.kind.Group) &&
            role.kind.Group.includes(accountId)
          ) {
            return (
              role.permissions.includes(
                `${DaoSDK.proposalKinds[
                  kindName
                ].toString()}:${actionType.toString()}`
              ) ||
              role.permissions.includes(
                `${DaoSDK.proposalKinds[kindName].toString()}:*`
              ) ||
              role.permissions.includes(`*:${actionType.toString()}`) ||
              role.permissions.includes("*:*")
            );
          }
        });
        isAllowed = permissions.some((element) => element === true);
      }
      return isAllowed;
    },
    getVotersAndThresholdForProposalKind: ({ kindName }) => {
      const policy = DaoSDK.getPolicy(daoId);
      let eligibleVotersArray = [];
      let thresholdVoteCount = 0;
      if (Array.isArray(policy.roles)) {
        policy.roles.forEach((role) => {
          const isRoleAllowedToVote =
            role.permissions.includes(
              `${DaoSDK.proposalKinds[kindName]}:VoteApprove`
            ) ||
            role.permissions.includes(
              `${DaoSDK.proposalKinds[kindName]}:VoteReject`
            ) ||
            role.permissions.includes(`${DaoSDK.proposalKinds[kindName]}:*`) ||
            role.permissions.includes(`*:VoteApprove`) ||
            role.permissions.includes(`*:VoteReject`) ||
            role.permissions.includes("*:*");
          if (isRoleAllowedToVote) {
            const threshold = (role.vote_policy &&
              role.vote_policy[DaoSDK.proposalKinds[kindName]]?.threshold) ||
              policy["default_vote_policy"]?.threshold || [0, 0];
            for (const account of role.kind.Group) {
              if (!eligibleVotersArray.includes(account)) {
                eligibleVotersArray.push(account);
              }
            }
            const eligibleVotersLength = role.kind.Group
              ? role.kind.Group.length
              : 0;
            if (eligibleVoters === 0) {
              return;
            }
            const votesNeeded =
              Math.floor((threshold[0] / threshold[1]) * eligibleVotersLength) +
              1;
            thresholdVoteCount += votesNeeded;
          }
        });
      }
      return { eligibleVotersArray, thresholdVoteCount };
    },
    calculateVoteCountByType: ({ votes }) => {
      let totalVotes = {
        approve: 0,
        reject: 0,
        spam: 0,
        total: 0
      };
      for (const vote of Object.values(votes)) {
        if (vote === "Approve") {
          totalVotes.approve++;
        } else if (vote === "Reject") {
          totalVotes.reject++;
        } else if (vote === "Spam") {
          totalVotes.spam++;
        }
      }
      totalVotes.total =
        totalVotes.approve + totalVotes.reject + totalVotes.spam;
      return totalVotes;
    },
    getProposalExpirationTime: ({ submissionTime }) => {
      const policy = DaoSDK.getPolicy();
      const proposalPeriod = policy.proposal_period;
      let expirationTime = Big(submissionTime).add(Big(proposalPeriod));
      return expirationTime;
    },
    getCommentsByProposalId: ({ proposalId }) => {
      return Social.index("comment", {
        type: "dao_proposal_comment",
        path: `${daoId}/proposal/main`,
        proposal_id: proposalId + "-beta"
      });
    },
    // returns user/accountId status about membership of specified roles within a DAO or has an active proposal for membership within a defined search range
    checkIsMemberOrPending: ({ accountId, rolesToCheck, searchRange }) => {
      if (!accountId) {
        return false;
      }
      if (!Array.isArray(rolesToCheck)) {
        rolesToCheck = ["council"];
      }
      const range = searchRange ?? 100;

      const lastProposalId = DaoSDK.getLastProposalId();

      const policy = DaoSDK.getPolicy();
      const isDaoMember = false;
      const lastProposals =
        DaoSDK.getProposals({
          offset: lastProposalId - range,
          limit: range
        }) || [];

      const alreadyMadeAProposal =
        lastProposals.filter((proposal) => {
          return (
            proposal.proposer === accountId &&
            proposal.status === "InProgress" &&
            Object.keys(proposal.kind ?? {})?.[0] === "AddMemberToRole"
          );
        }).length > 0;

      if (Array.isArray(policy.roles)) {
        policy.roles
          .filter((role) => rolesToCheck.includes(role.name))
          .map((role) => {
            if (Array.isArray(role.kind.Group) && !isDaoMember) {
              isDaoMember = role.kind.Group.includes(accountId);
            }
          });
      }
      return { isDaoMember, alreadyMadeAProposal };
    },

    // BOUNTIES
    getBountyById: ({ bountyId }) => {
      return Near.view(daoId, "get_bounty", {
        id: bountyId
      });
    },
    getBountyNoOfClaims: ({ bountyId }) => {
      return Near.view(daoId, "get_bounty_number_of_claims", {
        id: bountyId
      });
    },
    getBountyClaimsByAccountId: ({ accountId }) => {
      return Near.view(daoId, "get_bounty_claims", {
        account_id: accountId
      });
    },

    // UTILS
    call: ({ methodName, args, deposit, gas, additionalCalls }) => {
      const calls = [
        {
          contractName: daoId,
          methodName,
          args,
          deposit: deposit,
          gas: gas
        }
      ];
      if (Array.isArray(additionalCalls)) {
        calls = calls.concat(additionalCalls);
      }
      return Near.call(calls);
    },
    voteActions: {
      VoteApprove: "VoteApprove",
      VoteReject: "VoteReject",
      VoteRemove: "VoteRemove"
    },
    proposalKinds: {
      ChangeConfig: "config",
      ChangePolicy: "policy",
      AddMemberToRole: "add_member_to_role",
      RemoveMemberFromRole: "remove_member_from_role",
      FunctionCall: "call",
      UpgradeSelf: "upgrade_self",
      UpgradeRemote: "upgrade_remote",
      Transfer: "transfer",
      SetStakingContract: "set_vote_token",
      AddBounty: "add_bounty",
      BountyDone: "bounty_done",
      Vote: "vote",
      FactoryInfoUpdate: "factory_info_update",
      ChangePolicyAddOrUpdateRole: "policy_add_or_update_role",
      ChangePolicyRemoveRole: "policy_remove_role",
      ChangePolicyUpdateDefaultVotePolicy: "policy_update_default_vote_policy",
      ChangePolicyUpdateParameters: "policy_update_parameters",
      Text: "Text"
    },
    decodeArgs: ({ args }) => {
      try {
        const args64 = args;
        const jsonArgs = JSON.parse(
          Buffer.from(args64, "base64").toString("utf-8")
        );
        return JSON.stringify(jsonArgs, undefined, 2);
      } catch {
        return "failed to deserialize";
      }
    },

    // PROPOSALS
    addProposal: ({ proposal, deposit, gas, additionalCalls }) => {
      const policy = DaoSDK.getPolicy();
      if (!policy) {
        return;
      }
      const minDeposit = Big(policy?.proposal_bond);
      // make sure that the deposit is more/equal than bond amount
      const finalDeposit = Big(deposit).gt(minDeposit)
        ? Big(deposit)
        : minDeposit;

      return DaoSDK.call({
        methodName: "add_proposal",
        args: {
          proposal: proposal
        },
        deposit: finalDeposit.toFixed(),
        gas,
        additionalCalls
      });
    },
    createDao: ({ daoName, args, deposit, gas, additionalCalls }) => {
      const daoArgs = Buffer.from(JSON.stringify(args), "utf-8").toString(
        "base64"
      );
      const calls = [
        {
          contractName: "sputnik-dao.near",
          methodName: "create",
          args: {
            name: daoName,
            args: daoArgs
          },
          deposit,
          gas
        }
      ];
      if (Array.isArray(additionalCalls)) {
        calls = calls.concat(additionalCalls);
      }
      return Near.call(calls);
    },

    // SPECIFIC PROPOSALS
    createAddMemberProposal: ({
      description,
      memberId,
      roleId,
      gas,
      deposit,
      additionalCalls
    }) => {
      return DaoSDK.addProposal({
        proposal: {
          description: description,
          kind: {
            AddMemberToRole: {
              member_id: memberId,
              role: roleId
            }
          }
        },
        deposit,
        gas,
        additionalCalls
      });
    },
    createRemoveMemberProposal: ({
      description,
      memberId,
      roleId,
      gas,
      deposit,
      additionalCalls
    }) => {
      return DaoSDK.addProposal({
        proposal: {
          description: description,
          kind: {
            RemoveMemberFromRole: {
              member_id: memberId,
              role: roleId
            }
          }
        },
        deposit,
        gas,
        additionalCalls
      });
    },
    createPollProposal: ({ description, gas, deposit, additionalCalls }) => {
      return DaoSDK.addProposal({
        proposal: {
          description: description,
          kind: "Vote"
        },
        deposit,
        gas,
        additionalCalls
      });
    },
    createTransferProposal: ({
      description,
      tokenId,
      receiverId,
      amount,
      gas,
      deposit,
      additionalCalls
    }) => {
      return DaoSDK.addProposal({
        proposal: {
          description: description,
          kind: {
            Transfer: {
              token_id: tokenId,
              receiver_id: receiverId,
              amount
            }
          }
        },
        deposit,
        gas,
        additionalCalls
      });
    },
    createBountyProposal: ({
      description,
      bounty,
      gas,
      deposit,
      additionalCalls
    }) => {
      return DaoSDK.addProposal({
        proposal: {
          description: description,
          kind: {
            AddBounty: {
              bounty
            }
          }
        },
        deposit,
        gas,
        additionalCalls
      });
    },
    createSubmitBountyProposal: ({
      description,
      bounty,
      receiverId,
      gas,
      deposit,
      additionalCalls
    }) => {
      return DaoSDK.addProposal({
        proposal: {
          description: description,
          kind: {
            BountyDone: {
              receiver_id: receiverId,
              bounty_id: JSON.parse(bounty.id)
            }
          }
        },
        deposit,
        gas,
        additionalCalls
      });
    },
    createFunctionCallProposal: ({
      description,
      methodName,
      receiverId,
      args,
      proposalGas,
      proposalDeposit,
      gas,
      deposit,
      additionalCalls
    }) => {
      const proposal_args = Buffer.from(JSON.stringify(args), "utf-8").toString(
        "base64"
      );
      return DaoSDK.addProposal({
        proposal: {
          description: description,
          kind: {
            FunctionCall: {
              receiver_id: receiverId,
              actions: [
                {
                  method_name: methodName,
                  args: proposal_args,
                  deposit: proposalDeposit,
                  gas: proposalGas
                }
              ]
            }
          }
        },
        deposit,
        gas,
        additionalCalls
      });
    },

    // VOTE
    actProposal: ({ proposalId, action, deposit, gas, additionalCalls }) => {
      return DaoSDK.call({
        methodName: "act_proposal",
        args: {
          id: proposalId,
          action
        },
        deposit,
        gas,
        additionalCalls
      });
    },

    // SPECIFIC VOTE TXN
    approveProposal: ({ proposalId, deposit, gas, additionalCalls }) => {
      return DaoSDK.actProposal({
        proposalId,
        action: DaoSDK.voteActions.VoteApprove,
        deposit,
        gas,
        additionalCalls
      });
    },
    rejectProposal: ({ proposalId, deposit, gas, additionalCalls }) => {
      return DaoSDK.actProposal({
        proposalId,
        action: DaoSDK.voteActions.VoteReject,
        deposit,
        gas,
        additionalCalls
      });
    },
    removeProposal: ({ proposalId, deposit, gas, additionalCalls }) => {
      return DaoSDK.actProposal({
        id: proposalId,
        action: DaoSDK.voteActions.VoteRemove,
        deposit,
        gas,
        additionalCalls
      });
    },

    // BOUNTIES
    claimBounty: ({ bounty, gas, deposit, additionalCalls }) => {
      return DaoSDK.call({
        methodName: "bounty_claim",
        args: {
          id: JSON.parse(bounty.id),
          deadline: bounty.max_deadline
        },
        deposit,
        gas,
        additionalCalls
      });
    },
    unclaimBounty: ({ bounty, gas, deposit, additionalCalls }) => {
      return DaoSDK.call({
        methodName: "bounty_giveup",
        args: {
          id: JSON.parse(bounty.id)
        },
        deposit,
        gas,
        additionalCalls
      });
    }
  };
  return DaoSDK;
};
