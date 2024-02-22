// Only works on Lens Testnet for now
const CREATE_PROFILE_MUTATION = `
    mutation CreateProfile($createProfileWithHandleRequest: CreateProfileWithHandleRequest!) {
      createProfileWithHandle(
        request: $createProfileWithHandleRequest
      ) {
        ... on RelaySuccess {
          txHash
        }
        ... on CreateProfileWithHandleErrorResult {
          reason
        }
      }
    }
`;

const PROFILE_REPORT_MUTATION = `mutation ReportProfile($reportProfileRequest: ReportProfileRequest!) {\n  reportProfile(request: $reportProfileRequest)\n}`;

const PROFILE_BLOCK_MUTATION = `mutation CreateBlockProfilesTypedData($options: TypedDataOptions, $blockProfileRequest: BlockRequest!) {\n  createBlockProfilesTypedData(options: $options, request: $blockProfileRequest) {\n    id\n    expiresAt\n    typedData {\n      value {\n        nonce\n        deadline\n        byProfileId\n        idsOfProfilesToSetBlockStatus\n        blockStatus\n        __typename\n      }\n      domain {\n        name\n        chainId\n        version\n        verifyingContract\n        __typename\n      }\n      types {\n        SetBlockStatus {\n          name\n          type\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}`;

return {
    CREATE_PROFILE_MUTATION,
    PROFILE_REPORT_MUTATION,
    PROFILE_BLOCK_MUTATION
};