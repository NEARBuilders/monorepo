const SIGNED_AUTH_CHALLENGE_MUTATION = `
    mutation Authenticate($signedAuthChallengeRequest: SignedAuthChallenge!) {
      authenticate(request: $signedAuthChallengeRequest) {
        accessToken
        refreshToken
      }
    }
`;

const REFRESH_TOKEN_MUTATION = `
    mutation Refresh($refreshTokenRequest: RefreshRequest!) {
      refresh(request: $refreshTokenRequest) {
        accessToken
        refreshToken
      }
    }
`;

const REVOKE_AUTHENTICATION_MUTATION = `
    mutation RevokeAuthentication($revokeAuthenticationRequest: RevokeAuthenticationRequest!) {
      revokeAuthentication(request: $revokeAuthenticationRequest)
    }
`;

return {
    SIGNED_AUTH_CHALLENGE_MUTATION,
    REFRESH_TOKEN_MUTATION,
    REVOKE_AUTHENTICATION_MUTATION
};