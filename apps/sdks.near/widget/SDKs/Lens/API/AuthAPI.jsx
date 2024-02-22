const $ = VM.require(`sdks.near/widget/Loader`);
const { Auth } = $("@sdks/lens/queries#alpha");
const { AuthMutations } = $("@sdks/lens/mutations#alpha");
const { Interfaces } = $("@sdks/lens/definitions#alpha");
const { ApiHelper } = $("@sdks/lens/utils#alpha");

return {
  profiles: (Client, profilesManagedRequest) => {
    return Client.graphql(Auth.PROFILES_MANAGED_QUERY, {
      profilesManagedRequest,
    }).then((payload) => payload.body.data.profilesManaged.items || []);
  },
  challenge: (Client, challengeRequest) => {
    return Client.graphql(Auth.CHALLENGE_QUERY, { challengeRequest }).then(
      (data) => {
        return data.body.data.challenge || Interfaces.AUTH_CHALLENGE_INTERFACE;
      }
    );
  },
  authenticate: (Client, signedAuthChallengeRequest) => {
    return Client.graphql(AuthMutations.SIGNED_AUTH_CHALLENGE_MUTATION, {
      signedAuthChallengeRequest,
    }).then((payload) => {
      return payload.body.data.authenticate || Interfaces.AUTH_INTERFACE;
    });
  },
  refresh: (Client, refreshTokenRequest) => {
    return Client.graphql(AuthMutations.REFRESH_TOKEN_MUTATION, { refreshTokenRequest }).then(
      (payload) => payload.body.data.refresh || Interfaces.AUTH_INTERFACE
    );
  },
  revoke: (Client, revokeAuthenticationRequest) => {
    return Client.graphql(AuthMutations.REVOKE_AUTHENTICATION_MUTATION, {
      revokeAuthenticationRequest,
    }).then((payload) => true);
  },
  list: (Client, approvedAuthenticationRequest) => {
    return Client.graphql(Auth.APPROVED_AUTHENTICATION_QUERY, {
      approvedAuthenticationRequest: ApiHelper.clean(approvedAuthenticationRequest),
    }).then((payload) => payload.body.data.approvedAuthentications.items || []);
  },
  verify: (Client, verifyRequest) => {
    return Client.graphql(Auth.VERIFY_TOKEN_QUERY, { verifyRequest }).then(
      (payload) => payload.body.data.verify == true
    );
  },
};
