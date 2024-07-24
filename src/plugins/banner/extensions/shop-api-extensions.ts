import gql from "graphql-tag";

export const shopApiExtensions = gql`
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
`;
