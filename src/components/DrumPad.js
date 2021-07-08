import React from "react";
import "./DrumPad.css";

const keyPadColor = (isOn, key) => {
  if (isOn) {
    switch (key) {
      case "Q":
      case "A":
      case "Z":
        return "yellow-keys";
      case "W":
      case "S":
      case "X":
        return "pink-keys";
      case "E":
      case "D":
      case "C":
        return "blue-keys";
      default:
        return null;
    }
  } else {
    return "off-keys";
  }
};

const DrumPad = ({ letter, link, audioId, power, playSound }) => {
  return (
    <button
      id={audioId}
      className={`drum-pad ${keyPadColor(power, letter)}`}
      onClick={(e) => {
        playSound(letter, e.target);
      }}
    >
      {letter}
      <audio className="clip" id={letter} src={link} />
    </button>
  );
};

export default DrumPad;
