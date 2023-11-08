import { gql } from "@apollo/client";

export const ADD_PROJECT = gql`
  mutation addProject($name: String!, $description: String!, $clientId: ID!) {
    addProject(name: $name, description: $description, clientId: $clientId) {
      id
      name
      description
      status
      client {
        id
        name
        phone
        email
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $name: String!
    $description: String!
    $status: ProjectStatusUpdated!
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;
