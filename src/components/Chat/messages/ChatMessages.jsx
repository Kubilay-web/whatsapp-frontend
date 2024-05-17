import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import Typing from "./Typing";
import FileMessage from "./files/FileMessage";

export default function ChatMessages({ typing }) {
  const { messages, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const endRef = useRef();

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
    bg-cover bg-no-repeat"
    >
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {messages &&
          messages.map((message) => (
            <div key={message._id}>
              {message.files.length > 0 &&
                message.files.map((file) => (
                  <FileMessage
                    FileMessage={file}
                    message={message}
                    key={file._id} // Assuming file._id is unique for each file
                    me={user._id === message.sender._id}
                  />
                ))}
              {message.message.length > 0 && (
                <Message
                  message={message}
                  key={message._id + "-message"} // Ensuring a unique key for message text
                  me={user._id === message.sender._id}
                />
              )}
            </div>
          ))}
        {typing ? <Typing /> : null}
        <div className="mt-2" ref={endRef}></div>
      </div>
    </div>
  );
}
