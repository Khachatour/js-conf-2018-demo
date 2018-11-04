import React from "react";

const imageResource = createResource(
  src =>
    new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(src);
      image.src = src;
    })
);

function Img({ src, ...props }) {
  const loadedSrc = imageResource.read(src);
  return <img src={loadedSrc} {...props} />;
}

const waiter = ms => new Promise(resolve => setTimeout(resolve, ms));

const gateFetcher = createResource(
  () => waiter(3000).then(() => import("./data").then(mod => mod.default)),
  data => data
);
