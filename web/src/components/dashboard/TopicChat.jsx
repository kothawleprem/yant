import React from "react";
import { ReactChatbot } from "@kothawleprem/vectara-react-chatbot";

const VITE_VECTARA_CUSTOMER_ID = import.meta.env.VITE_VECTARA_CUSTOMER_ID;
const VITE_VECTARA_API_KEY = import.meta.env.VITE_VECTARA_API_KEY;

const TopicChat = ({ topic_id }) => {
    const user_id = localStorage.getItem("user_id")
    console.log(user_id, topic_id)
    const metadataFilter = `doc.user_id = ${user_id} AND doc.topic_id = ${topic_id}`
    console.log(metadataFilter)
  return (
    <div>
      <ReactChatbot
        customerId={VITE_VECTARA_CUSTOMER_ID}
        corpusIds={["5"]}
        apiKey={VITE_VECTARA_API_KEY}
        title="Topic Chat"
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

export default TopicChat;
