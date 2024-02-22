const PUBLICATION_QUERY = `query Publication($publicationRequest: PublicationRequest!) {  publication(request: $publicationRequest) {    ... on Post {      ...PostFields      __typename    }    ... on Comment {      ...CommentFields      __typename    }    ... on Mirror {      ...MirrorFields      __typename    }    ... on Quote {      ...QuoteFields      __typename    }    __typename  }}fragment PostFields on Post {  id  publishedOn {    id    __typename  }  isHidden  isEncrypted  momoka {    proof    __typename  }  txHash  createdAt  by {    ...PublicationProfileFields    __typename  }  stats {    ...PublicationStatsFields    __typename  }  operations {    ...PublicationOperationFields    __typename  }  metadata {    ...AnyPublicationMetadataFields    __typename  }  openActionModules {    ...OpenActionModulesFields    __typename  }  profilesMentioned {    snapshotHandleMentioned {      ...HandleInfoFields      __typename    }    __typename  }  __typename}fragment PublicationProfileFields on Profile {  id  handle {    ...HandleInfoFields    __typename  }  ownedBy {    ...NetworkAddressFields    __typename  }  metadata {    ...ProfileMetadataFields    __typename  }  __typename}fragment HandleInfoFields on HandleInfo {  fullHandle  localName  suggestedFormatted {    localName    __typename  }  linkedTo {    nftTokenId    __typename  }  __typename}fragment NetworkAddressFields on NetworkAddress {  address  chainId  __typename}fragment ProfileMetadataFields on ProfileMetadata {  displayName  bio  rawURI  picture {    ... on ImageSet {      ...ImageSetFields      __typename    }    ... on NftImage {      image {        ...ImageSetFields        __typename      }      __typename    }    __typename  }  coverPicture {    ...ImageSetFields    __typename  }  attributes {    ...MetadataAttributeFields    __typename  }  __typename}fragment ImageSetFields on ImageSet {  optimized {    uri    __typename  }  raw {    uri    __typename  }  __typename}fragment MetadataAttributeFields on MetadataAttribute {  type  key  value  __typename}fragment PublicationStatsFields on PublicationStats {  id  comments  mirrors  quotes  reactions(request: {type: UPVOTE})  countOpenActions  bookmarks  __typename}fragment PublicationOperationFields on PublicationOperations {  isNotInterested  hasBookmarked  hasActed {    value    __typename  }  hasReacted(request: {type: UPVOTE})  canComment  canMirror  hasMirrored  hasQuoted  __typename}fragment AnyPublicationMetadataFields on PublicationMetadata {  ... on VideoMetadataV3 {    ...VideoMetadataV3Fields    __typename  }  ... on ArticleMetadataV3 {    ...ArticleMetadataV3Fields    __typename  }  ... on AudioMetadataV3 {    ...AudioMetadataV3Fields    __typename  }  ... on EmbedMetadataV3 {    ...EmbedMetadataV3Fields    __typename  }  ... on ImageMetadataV3 {    ...ImageMetadataV3Fields    __typename  }  ... on LinkMetadataV3 {    ...LinkMetadataV3Fields    __typename  }  ... on LiveStreamMetadataV3 {    ...LiveStreamMetadataV3Fields    __typename  }  ... on MintMetadataV3 {    ...MintMetadataV3Fields    __typename  }  ... on TextOnlyMetadataV3 {    ...TextOnlyMetadataV3Fields    __typename  }  __typename}fragment VideoMetadataV3Fields on VideoMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  asset {    ...PublicationMetadataMediaVideoFields    __typename  }  attachments {    ...PublicationMetadataMediaFields    __typename  }  title  content  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment PublicationMetadataMediaVideoFields on PublicationMetadataMediaVideo {  video {    optimized {      uri      __typename    }    __typename  }  cover {    ...EncryptableImageSetFields    __typename  }  license  __typename}fragment EncryptableImageSetFields on EncryptableImageSet {  optimized {    uri    __typename  }  __typename}fragment PublicationMetadataMediaFields on PublicationMetadataMedia {  ... on PublicationMetadataMediaVideo {    ...PublicationMetadataMediaVideoFields    __typename  }  ... on PublicationMetadataMediaImage {    ...PublicationMetadataMediaImageFields    __typename  }  ... on PublicationMetadataMediaAudio {    ...PublicationMetadataMediaAudioFields    __typename  }  __typename}fragment PublicationMetadataMediaImageFields on PublicationMetadataMediaImage {  image {    ...EncryptableImageSetFields    __typename  }  __typename}fragment PublicationMetadataMediaAudioFields on PublicationMetadataMediaAudio {  artist  audio {    optimized {      uri      __typename    }    __typename  }  cover {    ...EncryptableImageSetFields    __typename  }  license  __typename}fragment PublicationMetadataLitEncryptionFields on PublicationMetadataLitEncryption {  encryptionKey  accessCondition {    criteria {      ... on SecondTierCondition {        ...SecondTierConditionFields        __typename      }      ... on ThirdTierCondition {        ...ThirdTierConditionFields        __typename      }      __typename    }    __typename  }  __typename}fragment SecondTierConditionFields on SecondTierCondition {  ... on AndCondition {    ...AndConditionFields    __typename  }  ... on OrCondition {    ...OrConditionFields    __typename  }  __typename}fragment AndConditionFields on AndCondition {  criteria {    ... on ThirdTierCondition {      ...ThirdTierConditionFields      __typename    }    __typename  }  __typename}fragment ThirdTierConditionFields on ThirdTierCondition {  ... on AdvancedContractCondition {    ...AdvancedContractConditionFields    __typename  }  ... on CollectCondition {    ...CollectConditionFields    __typename  }  ... on EoaOwnershipCondition {    ...EoaOwnershipConditionFields    __typename  }  ... on Erc20OwnershipCondition {    ...Erc20OwnershipConditionFields    __typename  }  ... on FollowCondition {    ...FollowConditionFields    __typename  }  ... on NftOwnershipCondition {    ...NftOwnershipConditionFields    __typename  }  ... on ProfileOwnershipCondition {    ...ProfileOwnershipConditionFields    __typename  }  __typename}fragment AdvancedContractConditionFields on AdvancedContractCondition {  contract {    ...NetworkAddressFields    __typename  }  __typename}fragment CollectConditionFields on CollectCondition {  publicationId  thisPublication  __typename}fragment EoaOwnershipConditionFields on EoaOwnershipCondition {  address  __typename}fragment Erc20OwnershipConditionFields on Erc20OwnershipCondition {  amount {    ...AmountFields    __typename  }  condition  __typename}fragment AmountFields on Amount {  asset {    ...Erc20Fields    __typename  }  value  __typename}fragment Erc20Fields on Asset {  ... on Erc20 {    name    symbol    decimals    contract {      ...NetworkAddressFields      __typename    }    __typename  }  __typename}fragment FollowConditionFields on FollowCondition {  follow  __typename}fragment NftOwnershipConditionFields on NftOwnershipCondition {  contract {    ...NetworkAddressFields    __typename  }  contractType  tokenIds  __typename}fragment ProfileOwnershipConditionFields on ProfileOwnershipCondition {  profileId  __typename}fragment OrConditionFields on OrCondition {  criteria {    ... on ThirdTierCondition {      ...ThirdTierConditionFields      __typename    }    __typename  }  __typename}fragment ArticleMetadataV3Fields on ArticleMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  title  content  attachments {    ...PublicationMetadataMediaFields    __typename  }  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment AudioMetadataV3Fields on AudioMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  asset {    ...PublicationMetadataMediaAudioFields    __typename  }  attachments {    ...PublicationMetadataMediaFields    __typename  }  title  content  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment EmbedMetadataV3Fields on EmbedMetadataV3 {  id  __typename}fragment ImageMetadataV3Fields on ImageMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  attachments {    ...PublicationMetadataMediaFields    __typename  }  asset {    ...PublicationMetadataMediaImageFields    __typename  }  title  content  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment LinkMetadataV3Fields on LinkMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  attachments {    ...PublicationMetadataMediaFields    __typename  }  content  sharingLink  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment LiveStreamMetadataV3Fields on LiveStreamMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  playbackURL  liveURL  title  content  attachments {    ...PublicationMetadataMediaFields    __typename  }  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment MintMetadataV3Fields on MintMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  mintLink  attachments {    ...PublicationMetadataMediaFields    __typename  }  content  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment TextOnlyMetadataV3Fields on TextOnlyMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  content  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment OpenActionModulesFields on OpenActionModule {  ... on SimpleCollectOpenActionSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    collectLimit    followerOnly    recipient    referralFee    endsAt    __typename  }  ... on MultirecipientFeeCollectOpenActionSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    collectLimit    referralFee    followerOnly    endsAt    recipients {      recipient      split      __typename    }    __typename  }  ... on LegacyFreeCollectModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    collectNft    followerOnly    __typename  }  ... on LegacyFeeCollectModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    followerOnly    recipient    referralFee    __typename  }  ... on LegacyLimitedFeeCollectModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    collectLimit    followerOnly    recipient    referralFee    __typename  }  ... on LegacyLimitedTimedFeeCollectModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    collectLimit    followerOnly    recipient    referralFee    endTimestamp    __typename  }  ... on LegacyRevertCollectModuleSettings {    type    __typename  }  ... on LegacyTimedFeeCollectModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    followerOnly    recipient    referralFee    endTimestamp    __typename  }  ... on LegacyMultirecipientFeeCollectModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    collectLimit    referralFee    followerOnly    endsAt    recipients {      recipient      split      __typename    }    __typename  }  ... on LegacySimpleCollectModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    collectLimit    followerOnly    recipient    referralFee    endsAt    __typename  }  ... on LegacyERC4626FeeCollectModuleSettings {    type    __typename  }  ... on LegacyAaveFeeCollectModuleSettings {    type    __typename  }  ... on UnknownOpenActionModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    initializeResultData    initializeCalldata    openActionModuleReturnData    __typename  }  __typename}fragment CommentFields on Comment {  ...CommentBaseFields  commentOn {    ... on Post {      ...PostFields      __typename    }    ... on Comment {      ...CommentBaseFields      __typename    }    ... on Quote {      ...QuoteBaseFields      __typename    }    __typename  }  __typename}fragment CommentBaseFields on Comment {  id  publishedOn {    id    __typename  }  isHidden  isEncrypted  momoka {    proof    __typename  }  txHash  createdAt  by {    ...PublicationProfileFields    __typename  }  stats {    ...PublicationStatsFields    __typename  }  operations {    ...PublicationOperationFields    __typename  }  metadata {    ...AnyPublicationMetadataFields    __typename  }  openActionModules {    ...OpenActionModulesFields    __typename  }  root {    ... on Post {      ...PostFields      __typename    }    ... on Quote {      ...QuoteBaseFields      __typename    }    __typename  }  profilesMentioned {    snapshotHandleMentioned {      ...HandleInfoFields      __typename    }    __typename  }  __typename}fragment QuoteBaseFields on Quote {  id  publishedOn {    id    __typename  }  isHidden  isEncrypted  momoka {    proof    __typename  }  txHash  createdAt  by {    ...PublicationProfileFields    __typename  }  stats {    ...PublicationStatsFields    __typename  }  operations {    ...PublicationOperationFields    __typename  }  metadata {    ...AnyPublicationMetadataFields    __typename  }  openActionModules {    ...OpenActionModulesFields    __typename  }  profilesMentioned {    snapshotHandleMentioned {      ...HandleInfoFields      __typename    }    __typename  }  __typename}fragment MirrorFields on Mirror {  id  publishedOn {    id    __typename  }  isHidden  momoka {    proof    __typename  }  txHash  createdAt  by {    ...PublicationProfileFields    __typename  }  mirrorOn {    ... on Post {      ...PostFields      __typename    }    ... on Comment {      ...CommentFields      __typename    }    ... on Quote {      ...QuoteFields      __typename    }    __typename  }  __typename}fragment QuoteFields on Quote {  ...QuoteBaseFields  quoteOn {    ... on Post {      ...PostFields      __typename    }    ... on Comment {      ...CommentBaseFields      __typename    }    ... on Quote {      ...QuoteBaseFields      __typename    }    __typename  }  __typename}`;

const PUBLICATIONS_QUERY = `query Publications($publicationsRequest: PublicationsRequest!) {  publications(request: $publicationsRequest) {    items {      ... on Post {        ...PostFields        __typename      }      ... on Comment {        ...CommentFields        __typename      }      ... on Mirror {        ...MirrorFields        __typename      }      ... on Quote {        ...QuoteFields        __typename      }      __typename    }    pageInfo {      next      __typename    }    __typename  }}fragment PostFields on Post {  id  publishedOn {    id    __typename  }  isHidden  isEncrypted  momoka {    proof    __typename  }  txHash  createdAt  by {    ...PublicationProfileFields    __typename  }  stats {    ...PublicationStatsFields    __typename  }  operations {    ...PublicationOperationFields    __typename  }  metadata {    ...AnyPublicationMetadataFields    __typename  }  openActionModules {    ...OpenActionModulesFields    __typename  }  profilesMentioned {    snapshotHandleMentioned {      ...HandleInfoFields      __typename    }    __typename  }  __typename}fragment PublicationProfileFields on Profile {  id  handle {    ...HandleInfoFields    __typename  }  ownedBy {    ...NetworkAddressFields    __typename  }  metadata {    ...ProfileMetadataFields    __typename  }  __typename}fragment HandleInfoFields on HandleInfo {  fullHandle  localName  suggestedFormatted {    localName    __typename  }  linkedTo {    nftTokenId    __typename  }  __typename}fragment NetworkAddressFields on NetworkAddress {  address  chainId  __typename}fragment ProfileMetadataFields on ProfileMetadata {  displayName  bio  rawURI  picture {    ... on ImageSet {      ...ImageSetFields      __typename    }    ... on NftImage {      image {        ...ImageSetFields        __typename      }      __typename    }    __typename  }  coverPicture {    ...ImageSetFields    __typename  }  attributes {    ...MetadataAttributeFields    __typename  }  __typename}fragment ImageSetFields on ImageSet {  optimized {    uri    __typename  }  raw {    uri    __typename  }  __typename}fragment MetadataAttributeFields on MetadataAttribute {  type  key  value  __typename}fragment PublicationStatsFields on PublicationStats {  id  comments  mirrors  quotes  reactions(request: {type: UPVOTE})  countOpenActions  bookmarks  __typename}fragment PublicationOperationFields on PublicationOperations {  isNotInterested  hasBookmarked  hasActed {    value    __typename  }  hasReacted(request: {type: UPVOTE})  canComment  canMirror  hasMirrored  hasQuoted  __typename}fragment AnyPublicationMetadataFields on PublicationMetadata {  ... on VideoMetadataV3 {    ...VideoMetadataV3Fields    __typename  }  ... on ArticleMetadataV3 {    ...ArticleMetadataV3Fields    __typename  }  ... on AudioMetadataV3 {    ...AudioMetadataV3Fields    __typename  }  ... on EmbedMetadataV3 {    ...EmbedMetadataV3Fields    __typename  }  ... on ImageMetadataV3 {    ...ImageMetadataV3Fields    __typename  }  ... on LinkMetadataV3 {    ...LinkMetadataV3Fields    __typename  }  ... on LiveStreamMetadataV3 {    ...LiveStreamMetadataV3Fields    __typename  }  ... on MintMetadataV3 {    ...MintMetadataV3Fields    __typename  }  ... on TextOnlyMetadataV3 {    ...TextOnlyMetadataV3Fields    __typename  }  __typename}fragment VideoMetadataV3Fields on VideoMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  asset {    ...PublicationMetadataMediaVideoFields    __typename  }  attachments {    ...PublicationMetadataMediaFields    __typename  }  title  content  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment PublicationMetadataMediaVideoFields on PublicationMetadataMediaVideo {  video {    optimized {      uri      __typename    }    __typename  }  cover {    ...EncryptableImageSetFields    __typename  }  license  __typename}fragment EncryptableImageSetFields on EncryptableImageSet {  optimized {    uri    __typename  }  __typename}fragment PublicationMetadataMediaFields on PublicationMetadataMedia {  ... on PublicationMetadataMediaVideo {    ...PublicationMetadataMediaVideoFields    __typename  }  ... on PublicationMetadataMediaImage {    ...PublicationMetadataMediaImageFields    __typename  }  ... on PublicationMetadataMediaAudio {    ...PublicationMetadataMediaAudioFields    __typename  }  __typename}fragment PublicationMetadataMediaImageFields on PublicationMetadataMediaImage {  image {    ...EncryptableImageSetFields    __typename  }  __typename}fragment PublicationMetadataMediaAudioFields on PublicationMetadataMediaAudio {  artist  audio {    optimized {      uri      __typename    }    __typename  }  cover {    ...EncryptableImageSetFields    __typename  }  license  __typename}fragment PublicationMetadataLitEncryptionFields on PublicationMetadataLitEncryption {  encryptionKey  accessCondition {    criteria {      ... on SecondTierCondition {        ...SecondTierConditionFields        __typename      }      ... on ThirdTierCondition {        ...ThirdTierConditionFields        __typename      }      __typename    }    __typename  }  __typename}fragment SecondTierConditionFields on SecondTierCondition {  ... on AndCondition {    ...AndConditionFields    __typename  }  ... on OrCondition {    ...OrConditionFields    __typename  }  __typename}fragment AndConditionFields on AndCondition {  criteria {    ... on ThirdTierCondition {      ...ThirdTierConditionFields      __typename    }    __typename  }  __typename}fragment ThirdTierConditionFields on ThirdTierCondition {  ... on AdvancedContractCondition {    ...AdvancedContractConditionFields    __typename  }  ... on CollectCondition {    ...CollectConditionFields    __typename  }  ... on EoaOwnershipCondition {    ...EoaOwnershipConditionFields    __typename  }  ... on Erc20OwnershipCondition {    ...Erc20OwnershipConditionFields    __typename  }  ... on FollowCondition {    ...FollowConditionFields    __typename  }  ... on NftOwnershipCondition {    ...NftOwnershipConditionFields    __typename  }  ... on ProfileOwnershipCondition {    ...ProfileOwnershipConditionFields    __typename  }  __typename}fragment AdvancedContractConditionFields on AdvancedContractCondition {  contract {    ...NetworkAddressFields    __typename  }  __typename}fragment CollectConditionFields on CollectCondition {  publicationId  thisPublication  __typename}fragment EoaOwnershipConditionFields on EoaOwnershipCondition {  address  __typename}fragment Erc20OwnershipConditionFields on Erc20OwnershipCondition {  amount {    ...AmountFields    __typename  }  condition  __typename}fragment AmountFields on Amount {  asset {    ...Erc20Fields    __typename  }  value  __typename}fragment Erc20Fields on Asset {  ... on Erc20 {    name    symbol    decimals    contract {      ...NetworkAddressFields      __typename    }    __typename  }  __typename}fragment FollowConditionFields on FollowCondition {  follow  __typename}fragment NftOwnershipConditionFields on NftOwnershipCondition {  contract {    ...NetworkAddressFields    __typename  }  contractType  tokenIds  __typename}fragment ProfileOwnershipConditionFields on ProfileOwnershipCondition {  profileId  __typename}fragment OrConditionFields on OrCondition {  criteria {    ... on ThirdTierCondition {      ...ThirdTierConditionFields      __typename    }    __typename  }  __typename}fragment ArticleMetadataV3Fields on ArticleMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  title  content  attachments {    ...PublicationMetadataMediaFields    __typename  }  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment AudioMetadataV3Fields on AudioMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  asset {    ...PublicationMetadataMediaAudioFields    __typename  }  attachments {    ...PublicationMetadataMediaFields    __typename  }  title  content  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment EmbedMetadataV3Fields on EmbedMetadataV3 {  id  __typename}fragment ImageMetadataV3Fields on ImageMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  attachments {    ...PublicationMetadataMediaFields    __typename  }  asset {    ...PublicationMetadataMediaImageFields    __typename  }  title  content  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment LinkMetadataV3Fields on LinkMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  attachments {    ...PublicationMetadataMediaFields    __typename  }  content  sharingLink  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment LiveStreamMetadataV3Fields on LiveStreamMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  playbackURL  liveURL  title  content  attachments {    ...PublicationMetadataMediaFields    __typename  }  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment MintMetadataV3Fields on MintMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  mintLink  attachments {    ...PublicationMetadataMediaFields    __typename  }  content  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment TextOnlyMetadataV3Fields on TextOnlyMetadataV3 {  id  rawURI  tags  attributes {    ...MetadataAttributeFields    __typename  }  content  encryptedWith {    ...PublicationMetadataLitEncryptionFields    __typename  }  __typename}fragment OpenActionModulesFields on OpenActionModule {  ... on SimpleCollectOpenActionSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    collectLimit    followerOnly    recipient    referralFee    endsAt    __typename  }  ... on MultirecipientFeeCollectOpenActionSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    collectLimit    referralFee    followerOnly    endsAt    recipients {      recipient      split      __typename    }    __typename  }  ... on LegacyFreeCollectModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    collectNft    followerOnly    __typename  }  ... on LegacyFeeCollectModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    followerOnly    recipient    referralFee    __typename  }  ... on LegacyLimitedFeeCollectModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    collectLimit    followerOnly    recipient    referralFee    __typename  }  ... on LegacyLimitedTimedFeeCollectModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    collectLimit    followerOnly    recipient    referralFee    endTimestamp    __typename  }  ... on LegacyRevertCollectModuleSettings {    type    __typename  }  ... on LegacyTimedFeeCollectModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    followerOnly    recipient    referralFee    endTimestamp    __typename  }  ... on LegacyMultirecipientFeeCollectModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    collectLimit    referralFee    followerOnly    endsAt    recipients {      recipient      split      __typename    }    __typename  }  ... on LegacySimpleCollectModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    amount {      ...AmountFields      __typename    }    collectNft    collectLimit    followerOnly    recipient    referralFee    endsAt    __typename  }  ... on LegacyERC4626FeeCollectModuleSettings {    type    __typename  }  ... on LegacyAaveFeeCollectModuleSettings {    type    __typename  }  ... on UnknownOpenActionModuleSettings {    type    contract {      ...NetworkAddressFields      __typename    }    initializeResultData    initializeCalldata    openActionModuleReturnData    __typename  }  __typename}fragment CommentFields on Comment {  ...CommentBaseFields  commentOn {    ... on Post {      ...PostFields      __typename    }    ... on Comment {      ...CommentBaseFields      __typename    }    ... on Quote {      ...QuoteBaseFields      __typename    }    __typename  }  __typename}fragment CommentBaseFields on Comment {  id  publishedOn {    id    __typename  }  isHidden  isEncrypted  momoka {    proof    __typename  }  txHash  createdAt  by {    ...PublicationProfileFields    __typename  }  stats {    ...PublicationStatsFields    __typename  }  operations {    ...PublicationOperationFields    __typename  }  metadata {    ...AnyPublicationMetadataFields    __typename  }  openActionModules {    ...OpenActionModulesFields    __typename  }  root {    ... on Post {      ...PostFields      __typename    }    ... on Quote {      ...QuoteBaseFields      __typename    }    __typename  }  profilesMentioned {    snapshotHandleMentioned {      ...HandleInfoFields      __typename    }    __typename  }  __typename}fragment QuoteBaseFields on Quote {  id  publishedOn {    id    __typename  }  isHidden  isEncrypted  momoka {    proof    __typename  }  txHash  createdAt  by {    ...PublicationProfileFields    __typename  }  stats {    ...PublicationStatsFields    __typename  }  operations {    ...PublicationOperationFields    __typename  }  metadata {    ...AnyPublicationMetadataFields    __typename  }  openActionModules {    ...OpenActionModulesFields    __typename  }  profilesMentioned {    snapshotHandleMentioned {      ...HandleInfoFields      __typename    }    __typename  }  __typename}fragment MirrorFields on Mirror {  id  publishedOn {    id    __typename  }  isHidden  momoka {    proof    __typename  }  txHash  createdAt  by {    ...PublicationProfileFields    __typename  }  mirrorOn {    ... on Post {      ...PostFields      __typename    }    ... on Comment {      ...CommentFields      __typename    }    ... on Quote {      ...QuoteFields      __typename    }    __typename  }  __typename}fragment QuoteFields on Quote {  ...QuoteBaseFields  quoteOn {    ... on Post {      ...PostFields      __typename    }    ... on Comment {      ...CommentBaseFields      __typename    }    ... on Quote {      ...QuoteBaseFields      __typename    }    __typename  }  __typename}`;

const PUBLICATION_STATS_QUERY = `
  fragment PublicationStats on PublicationStats {
    id
    comments
    mirrors
    quotes
    bookmarks
    upvoteReactions: reactions(request: { type: UPVOTE })
    downvoteReactions: reactions(request: { type: DOWNVOTE })
    countOpenActions(request: $publicationStatsCountOpenActionArgsRequest)
  }

  query PublicationStats(
    $publicationRequest: PublicationRequest!
    $publicationStatsInputRequest: PublicationStatsInput
    $publicationStatsCountOpenActionArgsRequest: PublicationStatsCountOpenActionArgs
  ) {
    result: publication(request: $publicationRequest) {
      ... on Post {
        stats(request: $publicationStatsInputRequest) {
          ...PublicationStats
        }
      }
      ... on Comment {
        stats(request: $publicationStatsInputRequest) {
          ...PublicationStats
        }
      }
      ... on Quote {
        stats(request: $publicationStatsInputRequest) {
          ...PublicationStats
        }
      }
    }
  }
`;

const WHO_ACTED_ON_PUBLICATION_QUERY = `
  fragment ProfileFields on Profile {
    id
    handle {
      ...HandleInfoFields
      __typename
    }
    ownedBy {
      ...NetworkAddressFields
      __typename
    }
    signless
    sponsor
    createdAt
    stats {
      ...ProfileStatsFields
      __typename
    }
    operations {
      ...ProfileOperationsFields
      __typename
    }
    interests
    invitedBy {
      id
      handle {
        ...HandleInfoFields
        __typename
      }
      ownedBy {
        ...NetworkAddressFields
        __typename
      }
      metadata {
        ...ProfileMetadataFields
        __typename
      }
      __typename
    }
    invitesLeft
    onchainIdentity {
      proofOfHumanity
      ens {
        name
        __typename
      }
      sybilDotOrg {
        verified
        source {
          twitter {
            handle
            __typename
          }
          __typename
        }
        __typename
      }
      worldcoin {
        isHuman
        __typename
      }
      __typename
    }
    followNftAddress {
      ...NetworkAddressFields
      __typename
    }
    metadata {
      ...ProfileMetadataFields
      __typename
    }
    followModule {
      ...FollowModuleFields
      __typename
    }
    __typename
  }

  fragment HandleInfoFields on HandleInfo {
    fullHandle
    localName
    suggestedFormatted {
      localName
      __typename
    }
    linkedTo {
      nftTokenId
      __typename
    }
    __typename
  }

  fragment NetworkAddressFields on NetworkAddress {
    address
    chainId
    __typename
  }

  fragment ProfileStatsFields on ProfileStats {
    id
    followers
    following
    comments
    posts
    mirrors
    quotes
    __typename
  }

  fragment ProfileOperationsFields on ProfileOperations {
    id
    isBlockedByMe {
      value
      __typename
    }
    isFollowedByMe {
      value
      __typename
    }
    isFollowingMe {
      value
      __typename
    }
    hasBlockedMe {
      value
      __typename
    }
    canBlock
  canUnblock
    canFollow
    canUnfollow
    __typename
  }

  fragment ProfileMetadataFields on ProfileMetadata {
    displayName
    bio
    rawURI
    picture {
      ... on ImageSet {
        ...ImageSetFields
        __typename
      }
      ... on NftImage {
        image {
          ...ImageSetFields
          __typename
        }
        __typename
      }
      __typename
    }
    coverPicture {
      ...ImageSetFields
      __typename
    }
    attributes {
      ...MetadataAttributeFields
      __typename
    }
    __typename
  }

  fragment ImageSetFields on ImageSet {
    optimized {
      uri
      __typename
    }
    raw {
      uri
      __typename
    }
    __typename
  }

  fragment MetadataAttributeFields on MetadataAttribute {
    type
    key
    value
    __typename
  }

  fragment FollowModuleFields on FollowModule {
    ... on FeeFollowModuleSettings {
      type
      amount {
        ...AmountFields
        __typename
      }
      recipient
      __typename
    }
    ... on RevertFollowModuleSettings {
      type
      __typename
    }
    ... on UnknownFollowModuleSettings {
      type
      __typename
    }
    __typename
  }

  fragment AmountFields on Amount {
    asset {
      ...Erc20Fields
      __typename
    }
    value
    __typename
  }

  fragment Erc20Fields on Asset {
    ... on Erc20 {
      name
      symbol
      decimals
      contract {
        ...NetworkAddressFields
        __typename
      }
      __typename
    }
    __typename
  }

  query WhoActedOnPublication($whoActedOnPublicationRequest: WhoActedOnPublicationRequest!) {
    result: whoActedOnPublication(request: $whoActedOnPublicationRequest) {
      items {
        ...ProfileFields
      }
      pageInfo {
        next
        __typename
      }
    }
  }
`;

const PUBLICATION_COMMENTS_QUERY = PUBLICATIONS_QUERY;

const PUBLICATION_MIRRORS_QUERY = PUBLICATIONS_QUERY;

const PUBLICATION_QUOTES_QUERY = PUBLICATIONS_QUERY;

const WHO_REACTED_PUBLICATION_QUERY = `
  fragment ProfileFields on Profile {
    id
    handle {
      ...HandleInfoFields
      __typename
    }
    ownedBy {
      ...NetworkAddressFields
      __typename
    }
    signless
    sponsor
    createdAt
    stats {
      ...ProfileStatsFields
      __typename
    }
    operations {
      ...ProfileOperationsFields
      __typename
    }
    interests
    invitedBy {
      id
      handle {
        ...HandleInfoFields
        __typename
      }
      ownedBy {
        ...NetworkAddressFields
        __typename
      }
      metadata {
        ...ProfileMetadataFields
        __typename
      }
      __typename
    }
    invitesLeft
    onchainIdentity {
      proofOfHumanity
      ens {
        name
        __typename
      }
      sybilDotOrg {
        verified
        source {
          twitter {
            handle
            __typename
          }
          __typename
        }
        __typename
      }
      worldcoin {
        isHuman
        __typename
      }
      __typename
    }
    followNftAddress {
      ...NetworkAddressFields
      __typename
    }
    metadata {
      ...ProfileMetadataFields
      __typename
    }
    followModule {
      ...FollowModuleFields
      __typename
    }
    __typename
  }

  fragment HandleInfoFields on HandleInfo {
    fullHandle
    localName
    suggestedFormatted {
      localName
      __typename
    }
    linkedTo {
      nftTokenId
      __typename
    }
    __typename
  }

  fragment NetworkAddressFields on NetworkAddress {
    address
    chainId
    __typename
  }

  fragment ProfileStatsFields on ProfileStats {
    id
    followers
    following
    comments
    posts
    mirrors
    quotes
    __typename
  }

  fragment ProfileOperationsFields on ProfileOperations {
    id
    isBlockedByMe {
      value
      __typename
    }
    isFollowedByMe {
      value
      __typename
    }
    isFollowingMe {
      value
      __typename
    }
    hasBlockedMe {
      value
      __typename
    }
    canBlock
  canUnblock
    canFollow
    canUnfollow
    __typename
  }

  fragment ProfileMetadataFields on ProfileMetadata {
    displayName
    bio
    rawURI
    picture {
      ... on ImageSet {
        ...ImageSetFields
        __typename
      }
      ... on NftImage {
        image {
          ...ImageSetFields
          __typename
        }
        __typename
      }
      __typename
    }
    coverPicture {
      ...ImageSetFields
      __typename
    }
    attributes {
      ...MetadataAttributeFields
      __typename
    }
    __typename
  }

  fragment ImageSetFields on ImageSet {
    optimized {
      uri
      __typename
    }
    raw {
      uri
      __typename
    }
    __typename
  }

  fragment MetadataAttributeFields on MetadataAttribute {
    type
    key
    value
    __typename
  }

  fragment FollowModuleFields on FollowModule {
    ... on FeeFollowModuleSettings {
      type
      amount {
        ...AmountFields
        __typename
      }
      recipient
      __typename
    }
    ... on RevertFollowModuleSettings {
      type
      __typename
    }
    ... on UnknownFollowModuleSettings {
      type
      __typename
    }
    __typename
  }

  fragment AmountFields on Amount {
    asset {
      ...Erc20Fields
      __typename
    }
    value
    __typename
  }

  fragment Erc20Fields on Asset {
    ... on Erc20 {
      name
      symbol
      decimals
      contract {
        ...NetworkAddressFields
        __typename
      }
      __typename
    }
    __typename
  }

  fragment ProfileReactionResult on ProfileReactionResult {
    reaction
    reactionAt
  }

  fragment ProfileWhoReactedResult on ProfileWhoReactedResult {
    profile {
      ...ProfileFields
    }
    reactions {
      ...ProfileReactionResult
    }
  }

  query WhoReactedPublication($whoReactedPublicationRequest: WhoReactedPublicationRequest!) {
    result: whoReactedPublication(request: $whoReactedPublicationRequest) {
      items {
        ...ProfileWhoReactedResult
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
`;

return {
  PUBLICATION_QUERY,
  PUBLICATIONS_QUERY,
  PUBLICATION_STATS_QUERY,
  PUBLICATION_COMMENTS_QUERY,
  PUBLICATION_MIRRORS_QUERY,
  PUBLICATION_QUOTES_QUERY,
  WHO_ACTED_ON_PUBLICATION_QUERY,
  WHO_REACTED_PUBLICATION_QUERY
};
