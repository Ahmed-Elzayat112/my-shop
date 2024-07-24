import gql from "graphql-tag";

export const shopApiExtensions = gql`
  type Banner {
    id: ID!
    position: Int!
    translations: [BannerTranslation!]!
  }

  type BannerTranslation {
    id: ID!
    languageCode: LanguageCode!
    imageUrl: String!
    url: String
  }

  input BannerDataInput {
    position: Int!
    translations: [BannerTranslationInput!]!
  }

  input BannerTranslationInput {
    languageCode: LanguageCode!
    imageUrl: String!
    url: String
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
