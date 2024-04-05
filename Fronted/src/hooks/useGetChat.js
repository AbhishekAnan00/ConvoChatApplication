import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetChat = () => {
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const getChat = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setChat(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getChat();
  }, []);

  return { loading, chat };
};
export default useGetChat;
