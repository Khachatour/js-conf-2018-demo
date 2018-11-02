import React, { Component, Suspense } from "react";
// import { unstable_createResource as createResource } from "react-cache";
import {
  lazy,
  unstable_createResource as createResource,
  Director
} from "hitchcock";

import data from "./data";
import "./App.css";

async function api(query) {
  const res = await fetch(query);
  return await res.json();
}

const waiter = ms => new Promise(resolve => setTimeout(resolve, ms));

const gameFetcher = createResource(
  () => waiter(1000).then(() => import("./data").then(mod => mod.default)),
  data => data
);

export function Loading() {
  return <div className="loading">🌀</div>;
}

function Game(props) {
  const { smallThumb, title, createdAt, creator, description } = props;
  return (
    <div className="game-container">
      <div className="game-container-img">
        <img src={smallThumb} alt="logo" />
      </div>
      <div className="game-content">
        <div className="flexed created-at">
          <p className="title">Title:</p>
          <span className="content">{title}</span>
        </div>
        <div className="flexed created-at">
          <p className="title">Created at:</p>
          <span className="content">{createdAt}</span>
        </div>
        <div className="flexed  creator">
          <p className="title">Creator:</p>
          <span className="content">{creator}</span>
        </div>
        <div className="flexed  descrption">
          <p className="title">Description:</p>
          <span className="content">{description}</span>
        </div>
      </div>
    </div>
  );
}

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    waiter(3000)
      .then(() => import("./data"))
      .then(mod => {
        this.setState({ data: mod.default });
      });
  }

  renderContent = () => {
    if (!this.state.data) {
      return <Loading />;
    }
    return Object.values(this.state.data).map((data, idx) => (
      <Game {...data} key={idx} />
    ));
  };

  render() {
    return (
      <Director>
        <div className="App">{this.renderContent()}</div>
        <div className="game-fetcher" onClick={this.fetchGame}>
          fetch game
        </div>
      </Director>
    );
  }
}

export default App;
