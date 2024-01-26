import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      user
      text
      chatRoomName
    }
  }
`;

export const POST_MESSAGE = gql`
  mutation($user:String!, $text:String!, $chatRoomName: String!){
    postMessage(user:$user,text:$text,chatRoomName:$chatRoomName)
  }
`;