const typeDefs = `#graphql

  type Users {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [Users]
    faviourtieMovie: [Movie]
  }
  type Movie {
    id: ID!
    name: String!
    yearofPublication: Int!
    inTheathers: Boolean!
  }

  type Query {
    users: UsersResult
    user(id:ID!):Users!
    movies: [Movie!]!
    movie(name:String!):Movie!
  }

  input createUserInput {
    name: String!,
    username: String!,
    age: Int!,
    nationality: Nationality = BRAZIL
  }

  input updateNameInput {
    id: ID!
    newName: String!
  }

  type Mutation {
    createUser(input: createUserInput!): Users
    updateUsername(input: updateNameInput!): Users
    deleteUser(id:ID!):Users
  }

  enum Nationality{
    PAKISTAN
    UNITED_STATES
    SAUDI_ARABIA
    INDIA
  }

  type UsersSuccessResult {
    users: [Users!]!
  }
  type UsersErrorResult {
    message: String!
  }

  union UsersResult = UsersSuccessResult | UsersErrorResult
`;
export default typeDefs;