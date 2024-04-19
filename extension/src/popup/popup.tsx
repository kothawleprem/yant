declare global {
  interface Window {
    chrome: typeof chrome;
  }
}


import React, { useState, useEffect } from "react";
import "./popup.css";
import TokenList from "./components/tokenList";
import { Container, Form, Button, Col, Row } from "react-bootstrap";

const Popup = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [inputApiKey, setInputApiKey] = useState<string>("");
  const [isApiKeyStored, setIsApiKeyStored] = useState<boolean>(false);
  const [activeTopic, setActiveTopic] = useState<number>(1);

  const checkAPIKey = async () => {
    console.log("Checking API Key");
    const storedAPIKey = localStorage.getItem("apiKey");
    if (storedAPIKey) {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/verify_token/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${storedAPIKey}`,
          },
        }
      );
      if (response.ok) {
        console.log("verified token")
        setApiKey(storedAPIKey);
        setIsApiKeyStored(true);
        window.chrome.runtime.sendMessage({
          type: "updateActiveToken",
          token: storedAPIKey,
        });
      } else {
        // If the API call fails or returns an error, delete the key
        console.log("invalid token");
        localStorage.removeItem("apiKey");
      }
    }
  };

  const deleteAPIKey = () => {
    localStorage.removeItem("apiKey");
    setApiKey(null);
    setIsApiKeyStored(false);
  };

  useEffect(() => {
    checkAPIKey();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("apiKey", inputApiKey);
    window.chrome.runtime.sendMessage({
      type: "updateActiveToken",
      token: inputApiKey,
    });
    checkAPIKey();
    // setApiKey(inputApiKey);
    // setIsApiKeyStored(true);
    setInputApiKey("");
  };

  return (
    <div>
      <Container>
        <br />
        <img src="https://i.ibb.co/3kR0P8m/header.jpg" alt="header" />
        {isApiKeyStored ? (
          <div>
            {/* <p>API Key is stored: {apiKey}</p> */}
            <br />
            <Row>
              <Col xs={9}>
                <h3> ✔️ You can start clipping</h3>
              </Col>
              <Col xs={3}>
                <Button variant="danger" onClick={deleteAPIKey}>
                  Logout
                </Button>
              </Col>
            </Row>
            <TokenList
              activeTopic={activeTopic}
              setActiveTopic={setActiveTopic}
            />
          </div>
        ) : (
          <>
            <br />
            <h3>🔒 Enter API to access Clipping</h3>
            <br />
            <Form>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    placeholder="API Key"
                    type="text"
                    value={inputApiKey}
                    onChange={(e) => setInputApiKey(e.target.value)}
                  />
                </Col>
                <Col xs={3}>
                  <Button onClick={handleSubmit}>Submit</Button>
                </Col>
              </Row>
            </Form>
            <br />
            Get your API Key <a href="">here</a>
            {/* <form onSubmit={handleSubmit}>
              <label>
                Enter API Key:
                <input
                  type="text"
                  value={inputApiKey}
                  onChange={(e) => setInputApiKey(e.target.value)}
                />
              </label>
              <button type="submit">Save API Key</button>
            </form> */}
          </>
        )}
      </Container>
    </div>
  );
};

export default Popup;
