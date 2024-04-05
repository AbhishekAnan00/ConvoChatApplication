import React, { useEffect, useRef } from "react";
import Msg from "./Msg";
import useGetMsg from "../../hooks/useGetMsg";
import MsgSkeleton from "../../skeleton/MsgSkeleton";
import useListenMsg from "../../hooks/useListenMsg";

const Msges = () => {
  const { messages, loading } = useGetMsg();
  useListenMsg();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Msg message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MsgSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the Chat</p>
      )}
    </div>
  );
};

export default Msges;
