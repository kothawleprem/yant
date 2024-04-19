// components/ChatApp.js
import React from "react";
import { ReactChatbot } from "@kothawleprem/vectara-react-chatbot";

const VITE_VECTARA_CUSTOMER_ID = import.meta.env.VITE_VECTARA_CUSTOMER_ID;
const VITE_VECTARA_API_KEY = import.meta.env.VITE_VECTARA_API_KEY;

const GlobalChat = () => {
  const user_id = localStorage.getItem("user_id")
  const metadataFilter = `doc.user_id = ${user_id}`
  
  return (
    <div>
      <ReactChatbot
        customerId={VITE_VECTARA_CUSTOMER_ID}
        corpusIds={["5"]}
        apiKey={VITE_VECTARA_API_KEY}
        title="Global Chat"
        placeholder="Chat with your AI assistant"
        inputSize="large"
        isInitiallyOpen={false}
        zIndex={5}
        enableStreaming={false}
        metadataFilter={metadataFilter}
        language="eng"
      />
    </div>
  );
};

export default GlobalChat;
