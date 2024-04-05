import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMsg from "../../hooks/useSendMsg";
const MsgInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMsg();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full flex gap-1">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 outline-none bg-gray-950 border-gray-800 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="inset-y-0 end-0 flex items-center bg-gray-950 border-gray-800 rounded-t-md rounded-b-md p-2"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MsgInput;
