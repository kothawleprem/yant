import React from "react";
import { ReactSearch } from "@kothawleprem/vectara-react-search-metadatafilter";

const VITE_VECTARA_CUSTOMER_ID = import.meta.env.VITE_VECTARA_CUSTOMER_ID;
const VITE_VECTARA_API_KEY = import.meta.env.VITE_VECTARA_API_KEY;

const GlobalSearchComponent = () => {
  const user_id = localStorage.getItem("user_id")
  const metadataFilter = `doc.user_id = ${user_id}`

  return (
    <>
      <center>
        <div
          href="#"
          class="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <ReactSearch
            customerId={VITE_VECTARA_CUSTOMER_ID}
            corpusId="5"
            apiKey={VITE_VECTARA_API_KEY}
            placeholder="Quick search any of your clips" // Optional search input placeholder
            isDeeplinkable={true} // Optional boolean determining if search results will be deeplinked
            openResultsInNewTab={true} // Optional boolean determining if links will open in a new tab
            zIndex={5}
            metadataFilter={metadataFilter}
          />
        </div>
      </center>
    </>
  );
}

export default GlobalSearchComponent;
