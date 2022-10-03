import { gql } from "@apollo/client";

const CREATER_USER_CUSTOM = gql`
  mutation authenticateCustomUser(
    $fullname: String!
    $email: String!
    $password: String!
  ) {
    authenticateCustomUser(
      fullname: $fullname
      email: $email
      password: $password
    ) {
      id,
      errormessage
    }
  }
`;

const AUTHENTICATE_USER = gql`
  mutation authenticateEmailUser(
    $token: String!
  ) {
    authenticateEmailUser(
      token: $token
    ) {
      id,
      errormessage
    }
  }
`;


export {CREATER_USER_CUSTOM, AUTHENTICATE_USER};