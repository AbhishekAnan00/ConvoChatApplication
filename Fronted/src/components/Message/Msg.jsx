import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useChat from "../../zustand/useChat";
import { extractTime } from "../../utils/extractTime";

const Msg = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedChat } = useChat();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilepic : selectedChat?.profilepic;
  const bubbleBgColor = fromMe ? "bg-green-700" : "";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Msg;
