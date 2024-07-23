import gql from 'graphql-tag';

export const shopApiExtensions = gql`
  type Banner {
    id: ID!
    position: Int!
    imageUrlEn: String!
    imageUrlAr: String!
    urlEn: String
    urlAr: String
  }

  input BannerDataInput {
    position: Int!
    imageUrlEn: String!
    imageUrlAr: String!
    urlEn: String
    urlAr: String
  }

  extend type Query {
    banners: [Banner!]!
  }
`;
