declare global {
  interface Window {
    chrome: typeof chrome;
  }
}

import React, { useState, useEffect } from "react";


interface Topic {
  id: number;
  name: string;
}

interface Props {
  activeTopic: number;
  setActiveTopic: (id: number) => void;
}

const TokenList: React.FC<Props> = ({ activeTopic, setActiveTopic }) => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    // Fetch list of topics from API
    const storedAPIKey = localStorage.getItem("apiKey");
    fetch("http://127.0.0.1:8000/api/data/topics/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${storedAPIKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error("Error fetching topics:", error));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveTopic(Number(event.target.value));
    console.log("setting...", event.target.value);
    localStorage.setItem("active_topic_id", event.target.value);
    window.chrome.runtime.sendMessage({
      type: "updateActiveTopic",
      topicId: event.target.value,
    });
  };

  return (
    <div>
      <br />
      <label>Select Topic for clips:</label>
      <select value={activeTopic} onChange={handleChange}>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
    </div>
  );
};

export default TokenList;
