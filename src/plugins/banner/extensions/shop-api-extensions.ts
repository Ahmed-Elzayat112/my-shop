import gql from "graphql-tag";

export const shopApiExtensions = gql`
  type Banner {
    id: ID!
    position: Int!
    url: String
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
    translations: [BannerTranslationInput!]!
  }

  input BannerTranslationInput {
    languageCode: LanguageCode!
    assetId: Int!
    url: String
    name: String!
  }

  extend type Query {
    banners: [Banner!]!
    banner(bannerId: ID!): Banner
  }
`;
