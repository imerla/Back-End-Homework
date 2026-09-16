import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
    smokes: Boolean!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    user: User!
  }

  input CreateUserInput {
    name: String!
    age: Int!
    isSmoker: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
  }

  type Mutation {
    deleteUser(id: ID!): Boolean!
    createUser(createUserDto: CreateUserInput!): String!
  }
`;
