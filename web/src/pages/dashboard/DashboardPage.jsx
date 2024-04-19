import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalSearchComponent from "../../components/dashboard/GlobalSearch";
import GlobalChat from "../../components/dashboard/GlobalChat";
import Clipboard from '../../components/dashboard/Clipboard'
import Navbar from "../../components/landingPage/Navbar";

const DashboardPage = () => {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = () => {
    fetch("http://127.0.0.1:8000/api/data/topics/", {
      method: "GET",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }
    }
    )
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error("Error fetching topics:", error));
  };

  const handleInputChange = (event) => {
    setNewTopic(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:8000/api/data/topics/`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTopic }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTopics([...topics, data]);
        setNewTopic("");
      })
      .catch((error) => console.error("Error adding topic:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar/>
      <Clipboard />
      <br />
      <GlobalSearchComponent />
      <br />
      <br />
      <GlobalChat />

      <center>
        <div class="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  tracking-tight text-gray-900 dark:text-white">
          {/* <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p> */}
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              value={newTopic}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter new topic"
            />
            <br />
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Topic
            </button>
          </form>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Topic</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic) => (
                  <tr key={topic.id}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {topic.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {topic.name}
                    </td>
                    <td>
                      &nbsp;
                      <button
                        type="submit"
                        className="bg-red-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded"
                        onClick={() =>
                          navigate("/dashboard/topic", {
                            state: {
                              topicId: topic.id,
                            },
                          })
                        }
                      >
                        View Notes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </center>
    </div>
  );
};

export default DashboardPage;
