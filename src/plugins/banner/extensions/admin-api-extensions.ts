import gql from "graphql-tag";

export const adminApiExtensions = gql`
  type Banner implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    position: Int!
    page: Int!
    url: String
    title: String
    image: Asset!
    translations: [BannerTranslation!]!
  }

  type BannerTranslation {
    id: ID!
    languageCode: LanguageCode!
    assetId: Int!
    title: String!
    base: Banner!
    image: Asset!
  }

  input BannerDataInput {
    position: Int!
    page: Int!
    url: String
    translations: [BannerTranslationInput!]!
  }

  input BannerTranslationInput {
    languageCode: LanguageCode!
    assetId: Int!
    title: String!
  }

  input UpdateBannerInput {
    id: ID!
    position: Int!
    page: Int!
    url: String
    translations: [BannerTranslationInput!]!
  }

  type BannerList implements PaginatedList {
    items: [Banner!]!
    totalItems: Int!
  }

  input BannerListOptions

  extend type Query {
    banners(options: BannerListOptions): BannerList!
    banner(bannerId: ID!): Banner
  }

  extend type Mutation {
    createBanner(bannerData: BannerDataInput!): Banner!
    updateBanner(updateBannerData: UpdateBannerInput!): Banner!
    deleteBanner(bannerId: ID!): Banner!
  }
`;
