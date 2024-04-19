import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopicChat from "../../components/dashboard/TopicChat";
import TopicSearch from "../../components/dashboard/TopicSearch";

const NotesPage = () => {
  const { state } = useLocation();
  const { topicId } = state;
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotesByTopicId();
  }, [topicId]);

  const fetchNotesByTopicId = () => {
    fetch(`http://127.0.0.1:8000/api/data/notes/by-topic/${topicId}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error("Error fetching notes:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <TopicSearch topic_id={topicId} />
      <TopicChat topic_id={topicId} />
      <br />

      <ul>
        {notes.map((note) => (
          <li key={note.id} className="mb-2">
            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <p class="mb-3 font-normal text-white dark:text-white-400">
                {note.content}
              </p>
              <button
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() =>
                  navigate("/dashboard/topic/clip", {
                    state: {
                      topicId: topicId,
                      noteId: note.id,
                    },
                  })
                }
              >
                Action
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesPage;
