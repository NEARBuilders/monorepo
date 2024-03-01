const { Components } = VM.require("buildhub.near/widget/components");
const { CreateDAO } = VM.require("hack.near/widget/CreateDAO");
const { EveryDAO } = VM.require("hack.near/widget/Every.DAO");
const { GetDAO } = VM.require("mob.near/widget/DAO.Proposals");
const { GetPermissions } = VM.require("sking.near/widget/DAO.Permissions");
const { SetPermissions } = VM.require("sking.near/widget/DAO.Permissions");
const { GrantPermissions } = VM.require("every.near/widget/Settings");
const { GetPolicy } = VM.require("mob.near/widget/DAO.Proposals");
const { SetPolicy } = VM.require("mob.near/widget/DAO.Proposals");
const { AddMember } = VM.require("hack.near/widget/DAO.Members");
const { RemoveMember } = VM.require("hack.near/widget/DAO.Members");
const { GetConfig } = VM.require("mob.near/widget/DAO.Proposals");
const { SetConfig } = VM.require("mob.near/widget/DAO.Proposals");
const { GetProposal } = VM.require("mob.near/widget/DAO.Proposals");
const { CreateProposal } = VM.require("mob.near/widget/DAO.Proposal");
const { Vote } = VM.require("mob.near/widget/DAO.Proposal");
const { GetBounty } = VM.require("sking.near/widget/DAO.Bounties");
const { ProposeBounty } = VM.require("sking.near/widget/DAO.Bounties");
const { ClaimBounty } = VM.require("sking.near/widget/DAO.Bounty");
const { GetFollowers } = VM.require("hack.near/widget/DAO.Page");
const { FollowDAO } = VM.require("hack.near/widget/DAO.Page");
const { GetGroups } = VM.require("devs.near/widget/every.group");
const { JoinGroup } = VM.require("devs.near/widget/every.group");
const { CreateGroup } = VM.require("devs.near/widget/every.group");

return {
  CreateDAO,
  GetDAO,
  EveryDAO,
  GetPermissions,
  SetPermissions,
  GrantPermissions,
  GetPolicy,
  SetPolicy,
  AddMember,
  RemoveMember,
  GetConfig,
  SetConfig,
  GetProposal,
  CreateProposal,
  Vote,
  GetBounty,
  ProposeBounty,
  ClaimBounty,
  GetFollowers,
  FollowDAO,
  GetGroups,
  JoinGroup,
  CreateGroup,
};
