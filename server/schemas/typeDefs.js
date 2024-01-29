const typeDefs = `
  
  type Query {
    users: [User]
    user(email: String!): User
    me: User
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }

  type User {
    _id: ID!
    email: String!
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;