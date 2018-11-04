import React, { Component, Suspense, useState } from "react";
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

const imageResource = createResource(
  src =>
    new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(src);
      image.src = src;
    })
);
export function Loading() {
  return <div className="loading">🌀</div>;
}

function Game(props) {
  const {
    smallThumb,
    largeThumb,
    title,
    createdAt,
    creator,
    description
  } = props;
  const image = imageResource.read(largeThumb);
  return (
    <div className="game-container">
      <div className="game-container-img">
        {!image ? (
          <img src={smallThumb} className="preview" />
        ) : (
          <img src={image} className="loaded" />
        )}
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

const waiter = ms => new Promise(resolve => setTimeout(resolve, ms));

class App extends Component {
  state = {
    id: 1,
    games: []
  };

  componentDidMount() {
    // waiter(3000)
    //   .then(() => import("./data"))
    //   .then(mod => {
    //     this.setState({ data: mod.default });
    //   });
  }

  fetchGame = () => {
    waiter(1000).then(() =>
      import("./data").then(mod => {
        this.setState(state => {
          if (state.id === 4) {
            return {
              games: [mod.default[1]],
              id: 1
            };
          }
          return {
            games: [...state.games, mod.default[state.id]],
            id: state.id + 1
          };
        });
      })
    );
  };

  renderContent = () => {
    return this.state.games.map((data, idx) => (
      <Suspense fallback={<Loading />}>
        <Game {...data} key={idx} />
      </Suspense>
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
