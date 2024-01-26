import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Typography, { TYPOGRAPHY_TYPES } from "../../components/Typography";
import Input from "../../components/Input";

interface IMessage {
  sender: string;
  body: string;
  sendAt: Date;
}

const ChatRoomController = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isConnectionOpen, setConnectionOpen] = useState(false);
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
    <div className="relative w-full h-[90vh] p-4">
      <Typography typography={TYPOGRAPHY_TYPES.TITLE}>
        ห้อง {chatRoomName}
      </Typography>
      <section
        id="chat-view-container"
        className="flex flex-col w-full h-full overflow-auto"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`my-3 rounded py-3 w-1/3 text-white ${
              message.sender === userName
                ? "self-end bg-purple-600"
                : "bg-blue-600"
            }`}
          >
            <div className="flex items-center">
              <div className="ml-2">
                <div className="flex flex-row">
                  <div className="text-sm font-medium leading-5 text-gray-900">
                    {message.sender} at
                  </div>
                  <div className="ml-1">
                    <div className="text-sm font-bold leading-5 text-gray-900">
                      {new Date(message.sendAt).toLocaleTimeString(undefined, {
                        timeStyle: "short",
                      })}{" "}
                    </div>
                  </div>
                </div>
                <div className="mt-1 text-sm font-semibold leading-5">
                  {message.body}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollTarget} />
      </section>
      <footer className="sticky bottom-0 left-0 right-0 w-full">
        <Input
          type="text"
          value={messageBody}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMessageBody(e.target.value)
          }
        />
      </footer>
    </div>
  );
};

export default ChatRoomController;
