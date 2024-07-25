import gql from "graphql-tag";

export const adminApiExtensions = gql`
  type Banner {
    id: ID!
    position: Int!
    url: String
    asset: Asset
    name: String!
    page: Int!
    translations: [BannerTranslation!]!
  }

  type BannerTranslation {
    id: ID!
    languageCode: LanguageCode!
    assetId: Int!
    url: String
    name: String!
  }

  input BannerDataInput {
    position: Int!
    page: Int!
    translations: [BannerTranslationInput!]!
  }

  input BannerTranslationInput {
    languageCode: LanguageCode!
    assetId: Int!
    url: String
    name: String!
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
    updateBanner(bannerId: ID!, bannerData: BannerDataInput!): Banner!
  }
`;
