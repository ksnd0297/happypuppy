import { ChatType } from "@/src/types/chat/chat";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";

type Props = {
  userId: number;
  handleNewMessage: (newMessage: ChatType) => void;
};

const useSocket = (props: Props) => {
  const { userId, handleNewMessage } = props;

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!ws.current) return;

    if (Platform.OS === "android") {
      ws.current = new WebSocket("ws://10.0.2.2:3000/ws-stomp");
    }

    if (Platform.OS === "ios") {
      ws.current = new WebSocket("ws://127.0.0.1:3000/ws-stomp");
    }

    ws.current.onopen = () => {
      console.log("connected");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onmessage = (e) => {
      console.log(" e: ", e.data);
      const newMessage = JSON.parse(e.data);
      handleNewMessage(newMessage);
    };

    return () => {
      ws.current?.close();
      console.log("WebSocket connection closed");
    };
  }, []);

  const handleSendMessage = (message: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          id: userId,
          message,
        })
      );
      console.log("Message sent:", message);
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  };

  return { handleSendMessage };
};

export default useSocket;
