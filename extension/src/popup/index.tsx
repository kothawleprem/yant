import React from "react";
import { createRoot } from "react-dom/client";
import '../assets/tailwind.css'
import Popup from "./popup";
import "bootstrap/dist/css/bootstrap.min.css";

function init() {
    console.log("in index")
    const appContainer = document.createElement('div')
    document.body.appendChild(appContainer)
    if (!appContainer) {
        throw new Error("Can not find AppContainer");
    }
    const root = createRoot(appContainer)
    console.log(appContainer)
    root.render(<Popup />);
}

init();