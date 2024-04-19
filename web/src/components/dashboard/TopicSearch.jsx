import React from 'react'
import { ReactSearch } from "@kothawleprem/vectara-react-search-metadatafilter";

const VITE_VECTARA_CUSTOMER_ID = import.meta.env.VITE_VECTARA_CUSTOMER_ID;
const VITE_VECTARA_API_KEY = import.meta.env.VITE_VECTARA_API_KEY;

const TopicSearch = ({ topic_id }) => {
  const user_id = localStorage.getItem("user_id");
  const metadataFilter = `doc.user_id = ${user_id} AND doc.topic_id = ${topic_id}`;

  return (
    <ReactSearch
      customerId={VITE_VECTARA_CUSTOMER_ID}
      corpusId="5"
      apiKey={VITE_VECTARA_API_KEY}
      placeholder="Quick search clips in this topic" // Optional search input placeholder
      isDeeplinkable={true} // Optional boolean determining if search results will be deeplinked
      openResultsInNewTab={true} // Optional boolean determining if links will open in a new tab
      zIndex={5}
      metadataFilter={metadataFilter}
    />
  );
}

export default TopicSearch