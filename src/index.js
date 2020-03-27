import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Export the context so it may be imported by the consumer
export const UserContext = React.createContext();
const username = "Rahul";

ReactDOM.render(
  <React.StrictMode>
    {/* Wrap the App with the Provider */}
    <UserContext.Provider value={username}>
      <App />
    </UserContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
