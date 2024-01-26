import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import Typography, { TYPOGRAPHY_TYPES } from "../../components/Typography";
import MessageInput from "./components/MessageInput";
import ChatBox from "./components/ChatBox";
import { useMutation, useSubscription } from "@apollo/client";
import { GET_MESSAGES, POST_MESSAGE } from "../../core/graphql/operations";

interface IMessage {
  id: string;
  user: string;
  text: string;
  chatRoomName: string;
}

const ChatRoomController = () => {
  const { userName, chatRoomName } = useParams();
  const [messageBody, setMessageBody] = useState("");
  const scrollTarget = useRef<null | HTMLDivElement>(null);

  const [postMessage] = useMutation(POST_MESSAGE);
  const { data: responseData } = useSubscription(GET_MESSAGES);

  const messageData: IMessage[] = useMemo(() => {
    if (responseData) {
      const messages = responseData.messages.map((data) => ({
        id: data.id,
        user: data.user,
        text: data.text,
        chatRoomName: data.chatRoomName,
      }));
      return messages.filter((data) => data.chatRoomName === chatRoomName);
    }
    return [];
  }, [chatRoomName, responseData]);

  console.log(messageData);

  const sendMessage = useCallback(() => {
    if (messageBody.length > 0) {
      postMessage({
        variables: {
          user: userName,
          text: messageBody,
          chatRoomName: chatRoomName,
        },
      });
      setMessageBody("");
    }
  }, [chatRoomName, messageBody, postMessage, userName]);

  useEffect(() => {
    if (scrollTarget.current) {
      scrollTarget.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageData.length]);

  return (
    <div className="flex flex-col w-full h-full p-4 box-border">
      <Typography typography={TYPOGRAPHY_TYPES.TITLE}>
        ห้อง {chatRoomName}
      </Typography>
      <div className="relative flex flex-col w-full h-[calc(100%-64px)] bg-[#f7f7f7] rounded-[12px]">
        <section className="flex flex-col w-full h-[calc(100%-60px)] overflow-auto px-4">
          {messageData.map((message, index) => (
            <ChatBox
              key={index}
              sender={message.user}
              message={message.text}
              owned={message.user === userName}
            />
          ))}
          <div ref={scrollTarget} />
        </section>
        <footer className="sticky bottom-0 left-0 right-0 w-full">
          <MessageInput
            value={messageBody}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setMessageBody(e.target.value)
            }
            onEnter={sendMessage}
          />
        </footer>
      </div>
    </div>
  );
};

export default ChatRoomController;
