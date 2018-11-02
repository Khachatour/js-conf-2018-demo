import React, { Component, Suspense } from "react";
import { unstable_createResource as createResource } from "react-cache";
import md5 from "md5";
import logo from "./logo.svg";
import "./App.css";

async function api(query) {
  const res = await fetch(query);
  return await res.json();
}
const queryRes = createResource(apiPath => {
  const hash = md5(
    `${new Date()}d5d585677555c1e4dc5930a64ebe8407f99a5dae0544b0f7b827c5038282e99ab26d1955`
  );
  return api(`${apiPath}apikey=0544b0f7b827c5038282e99ab26d1955`);
});
class App extends Component {
  render() {
    const result = queryRes.read(
      "https://gateway.marvel.com:443/v1/public/characters?name=venom&"
    );
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
