import gql from "graphql-tag";

export default gql`
  interface Error {
    path: String
    message: String
 
  }
`;

// description:String
// suggestion: String
// cause: [Error]