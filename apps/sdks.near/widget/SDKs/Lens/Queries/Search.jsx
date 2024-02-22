const PROFILE_SEARCH_QUERY = `query SearchProfiles($profileSearchRequest: ProfileSearchRequest!) {  searchProfiles(request: $profileSearchRequest) {    items {      ...ProfileFields      __typename    }    pageInfo {      next      __typename    }    __typename  }}fragment ProfileFields on Profile {  id  handle {    ...HandleInfoFields    __typename  }  ownedBy {    ...NetworkAddressFields    __typename  }  signless  sponsor  createdAt  stats {    ...ProfileStatsFields    __typename  }  operations {    ...ProfileOperationsFields    __typename  }  interests  invitedBy {    id    handle {      ...HandleInfoFields      __typename    }    ownedBy {      ...NetworkAddressFields      __typename    }    metadata {      ...ProfileMetadataFields      __typename    }    __typename  }  invitesLeft  onchainIdentity {    proofOfHumanity    ens {      name      __typename    }    sybilDotOrg {      verified      source {        twitter {          handle          __typename        }        __typename      }      __typename    }    worldcoin {      isHuman      __typename    }    __typename  }  followNftAddress {    ...NetworkAddressFields    __typename  }  metadata {    ...ProfileMetadataFields    __typename  }  followModule {    ...FollowModuleFields    __typename  }  __typename}fragment HandleInfoFields on HandleInfo {  fullHandle  localName  suggestedFormatted {    localName    __typename  }  linkedTo {    nftTokenId    __typename  }  __typename}fragment NetworkAddressFields on NetworkAddress {  address  chainId  __typename}fragment ProfileStatsFields on ProfileStats {  id  followers  following  comments  posts  mirrors  quotes  __typename}fragment ProfileOperationsFields on ProfileOperations {  id  isBlockedByMe {    value    __typename  }  isFollowedByMe {    value    __typename  }  isFollowingMe {    value    __typename  }  __typename}fragment ProfileMetadataFields on ProfileMetadata {  displayName  bio  rawURI  picture {    ... on ImageSet {      ...ImageSetFields      __typename    }    ... on NftImage {      image {        ...ImageSetFields        __typename      }      __typename    }    __typename  }  coverPicture {    ...ImageSetFields    __typename  }  attributes {    ...MetadataAttributeFields    __typename  }  __typename}fragment ImageSetFields on ImageSet {  optimized {    uri    __typename  }  raw {    uri    __typename  }  __typename}fragment MetadataAttributeFields on MetadataAttribute {  type  key  value  __typename}fragment FollowModuleFields on FollowModule {  ... on FeeFollowModuleSettings {    type    amount {      ...AmountFields      __typename    }    recipient    __typename  }  ... on RevertFollowModuleSettings {    type    __typename  }  ... on UnknownFollowModuleSettings {    type    __typename  }  __typename}fragment AmountFields on Amount {  asset {    ...Erc20Fields    __typename  }  value  __typename}fragment Erc20Fields on Asset {  ... on Erc20 {    name    symbol    decimals    contract {      ...NetworkAddressFields      __typename    }    __typename  }  __typename}`;

const PUBLICATION_SEARCH_QUERY = `
  query SearchPublications($publicationSearchRequest: PublicationSearchRequest!) {
    result: searchPublications(request: $publicationSearchRequest) {
      items {
        ... on Post {
          id
          publishedOn {
            id
            __typename
          }
          isHidden
          isEncrypted
          
          txHash
          by {
            id
            __typename
            handle {
                fullHandle
                localName
                __typename
                suggestedFormatted {
                    localName
                    __typename
                }
                linkedTo {
                    nftTokenId
                    __typename
                }
            }
            ownedBy {
                address
                chainId
                __typename
            }
          }
          stats {
            id
            comments
            mirrors
            quotes
            reactions
            countOpenActions
            bookmarks
            __typename
          }
          operations {
            isNotInterested
            hasBookmarked
            hasActed {
                value
                __typename
            }
            hasReacted
            canComment
            hasMirrored
            hasQuoted
            __typename
          }
          
          metadata {
            ... on ArticleMetadataV3 {
                id
                rawURI
                locale
                tags
                contentWarning
                hideFromFeed
                appId
                marketplace {
                    description
                    externalURL
                    name
                    attributes {
                        displayType
                        traitType
                        value
                    }
                    image {
                        optimized {
                            uri
                        }
                        raw {
                            uri
                        }
                    }
                    animationUrl
                }
                attributes {
                    type
                    key
                    value
                }
                content
                title
                attachments {
                    ... on PublicationMetadataMediaImage {
                        image {
                            optimized {
                                uri
                            }
                            raw {
                                uri
                            }
                        }
                        attributes {
                            type
                            key
                            value
                        }
                    }
                }
            }
            ... on TextOnlyMetadataV3 {
                id
                rawURI
                locale
                tags
                contentWarning
                hideFromFeed
                appId
                marketplace {
                    description
                    externalURL
                    name
                    attributes {
                        displayType
                        traitType
                        value
                    }
                    image {
                        optimized {
                            uri
                        }
                        raw {
                            uri
                        }
                    }
                    animationUrl
                }
                attributes {
                    type
                    key
                    value
                }
                content
            }
          }
          
        }
      }
      pageInfo {
        next
      }
    }
  }
`;

return {
    PROFILE_SEARCH_QUERY,
    PUBLICATION_SEARCH_QUERY
};