import gql from "graphql-tag";

export const adminApiExtensions = gql`
  type Banner {
    id: ID!
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

  extend type Query {
    banners(options: BannerListOptions): PaginatedBannerList!
    banner(bannerId: ID!): Banner
  }

  input BannerListOptions {
    skip: Int
    take: Int
    sort: BannerSortParameter
    filter: BannerFilterParameter
    filterOperator: LogicalOperator
  }

  input BannerSortParameter {
    position: SortOrder
    page: SortOrder
  }

  input BannerPositionFilterParameter {
    eq: Int
    notEq: Int
    lt: Int
    lte: Int
    gt: Int
    gte: Int
    in: [Int]
    notIn: [Int]
  }

  input BannerFilterParameter {
    position: BannerPositionFilterParameter
    page: BannerPositionFilterParameter
  }

  type PaginatedBannerList {
    items: [Banner!]!
    totalItems: Int!
  }

  extend type Mutation {
    createBanner(bannerData: BannerDataInput!): Banner!
    updateBanner(updateBannerData: UpdateBannerInput!): Banner!
  }
`;
