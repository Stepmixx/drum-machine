import React from "react";
import "./Home.css";
import DrumMachine from "./DrumMachine";
import BgVideo from "../video/neon-bg.mp4";

const Home = () => {
  return (
    <div className="vh-100 vw-100 max-vw-100 max-vh-100 d-flex justify-content-center align-items-center">
      <video autoPlay muted loop id="neon-bg">
        <source src={BgVideo} type="video/mp4" />
        Your browser does not support this video file.
      </video>
      <DrumMachine />
    </div>
  );
};

export default Home;
