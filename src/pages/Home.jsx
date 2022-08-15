import React from "react";

export const Home = () => {
  console.log(process.env.REACT_APP_GITHUB_TOKEN);
  return (
    <>
      <div>Home</div>

      <p>{process.env.REACT_APP_GITHUB_TOKEN}</p>
    </>
  );
};
