import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Typography, { TYPOGRAPHY_TYPES } from "../../components/Typography";
import MessageInput from "./components/MessageInput";
import ChatBox from "./components/ChatBox";

interface IMessage {
  sender: string;
  body: string;
  sendAt: Date;
}

const ChatRoomController = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [, setConnectionOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");

  const { userName, chatRoomName } = useParams();
  const ws = useRef<any>();

  const sendMessage = () => {
    if (messageBody) {
      ws.current.send(
        JSON.stringify({
          sender: userName,
          body: messageBody,
        })
      );
      setMessageBody("");
    }
  };

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");
    ws.current.onopen = () => {
      console.log("Connection Opened");
      setConnectionOpen(true);
    };
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((_messages) => [..._messages, data]);
    };
    return () => {
      console.log("Cleaning up...");
      ws.current.close();
    };
  }, []);

  const scrollTarget = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (scrollTarget.current) {
      scrollTarget.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  return (
    <div className="flex flex-col w-full h-full p-4 box-border">
      <Typography typography={TYPOGRAPHY_TYPES.TITLE}>
        ห้อง {chatRoomName}
      </Typography>
      <div className="relative flex flex-col w-full h-[calc(100%-64px)] bg-[#f7f7f7] rounded-[12px]">
        <section className="flex flex-col w-full h-[calc(100%-60px)] overflow-auto px-4">
          {messages.map((message, index) => (
            <ChatBox
              key={index}
              sender={message.sender}
              message={message.body}
              owned={message.sender === userName}
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
