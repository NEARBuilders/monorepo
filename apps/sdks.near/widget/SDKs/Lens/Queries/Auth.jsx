const PROFILES_MANAGED_QUERY = `
    query profilesManaged($profilesManagedRequest: ProfilesManagedRequest!) {
      profilesManaged(request: $profilesManagedRequest) {
        items {
          id
          ownedBy {
            address
            chainId
          }
          handle {
            id
            fullHandle
          }
        }
      }
    }
`;

const CHALLENGE_QUERY = `
    query Challenge($challengeRequest: ChallengeRequest!) {
      challenge(request: $challengeRequest) {
        id
        text
      }
    }
`;

const APPROVED_AUTHENTICATION_QUERY = `query ApprovedAuthentications($approvedAuthenticationRequest: ApprovedAuthenticationRequest!) {\n  approvedAuthentications(request: $approvedAuthenticationRequest) {\n    items {\n      authorizationId\n      browser\n      os\n      origin\n      expiresAt\n      createdAt\n      updatedAt\n      __typename\n    }\n    pageInfo {\n      next\n      __typename\n    }\n    __typename\n  }\n}`;

const VERIFY_TOKEN_QUERY = `
    query Query($verifyRequest: VerifyRequest!) {
      verify(request: $verifyRequest)
    }
`;

return {
  PROFILES_MANAGED_QUERY,
  CHALLENGE_QUERY,
  APPROVED_AUTHENTICATION_QUERY,
  VERIFY_TOKEN_QUERY,
};
