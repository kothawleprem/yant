import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from '../../components/landingPage/Navbar'

const NotePage = () => {
  const { state } = useLocation();
  const { topicId, noteId } = state;
  const [note, setNote] = useState("");
  console.log(noteId)



  useEffect(() => {
    fetchNoteByNoteId();
  }, [topicId]);

  const fetchNoteByNoteId = () => {
    fetch(`http://127.0.0.1:8000/api/data/notes/${noteId}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setNote(data["content"]))
      .catch((error) => console.error("Error fetching notes:", error));
  };

  const [selectedOption, setSelectedOption] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDropdownChange = async (selectedValue) => {
    setSelectedOption(selectedValue);
    setIsLoading(true)
    console.log(selectedValue)
    fetch(
      `http://127.0.0.1:8000/api/data/transformation/note/${noteId}/rewrite/${selectedValue}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setDisplayText(data["content"]))
      .catch((error) => console.error("Error fetching notes:", error));
    // Close the dropdown after selecting an option
    setDropdownVisible(false);
    setIsLoading(false)

  };

  return (
    <>
      <div className="container mx-auto p-4">
        {note !== "" ? (
          <>
            <ul>
              <li className="mb-2">
                <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <p class="mb-3 font-normal text-white dark:text-white-400">
                    {note}
                  </p>
                </div>
              </li>
            </ul>
          </>
        ) : (
          <></>
        )}
        <div className=" mt-8">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            Dropdown button
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div
            id="dropdown"
            className={`${
              dropdownVisible ? "" : "hidden"
            } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleDropdownChange("CASUAL")}
                >
                  Casual
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleDropdownChange("FORMAL")}
                >
                  Formal
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleDropdownChange("SIMPLIFIED")}
                >
                  Simplified
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleDropdownChange("CREATIVE")}
                >
                  Creative
                </a>
              </li>
            </ul>
          </div>
          <br /> <br />

          {isLoading && (
            <>
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </>
          )}
          {displayText && (
            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <p class="mb-3 font-normal text-white dark:text-white-400">
                {displayText}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotePage