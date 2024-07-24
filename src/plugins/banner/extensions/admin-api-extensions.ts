import gql from "graphql-tag";

export const adminApiExtensions = gql`
  type Banner {
    id: ID!
    position: Int!
    imageUrl: String!
    url: String
    name: String!
    translations: [BannerTranslation!]!
  }

  type BannerTranslation {
    id: ID!
    languageCode: LanguageCode!
    imageUrl: String!
    url: String
    name: String!
  }

  input BannerDataInput {
    position: Int!
    translations: [BannerTranslationInput!]!
  }

  input BannerTranslationInput {
    languageCode: LanguageCode!
    imageUrl: String!
    url: String
    name: String!
  }

  extend type Query {
    banners: [Banner!]!
    banner(bannerId: ID!): Banner
  }

  extend type Mutation {
    createBanner(bannerData: BannerDataInput!): Banner!
    updateBanner(bannerId: ID!, bannerData: BannerDataInput!): Banner!
  }
`;
