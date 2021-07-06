import React, { useCallback, useEffect, useRef, useState } from "react";
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

const DrumPad = ({ letter, link, audioId, displayKey, power }) => {
  const [isActive, setIsActive] = useState("");
  const keyRef = useRef();

  const activatePad = useCallback(() => {
    if (isActive === "") {
      switch (letter) {
        case "Q":
        case "A":
        case "Z":
          setIsActive("active-yellow");
          break;
        case "W":
        case "S":
        case "X":
          setIsActive("active-pink");
          break;
        case "E":
        case "D":
        case "C":
          setIsActive("active-blue");
          break;
        default:
          return null;
      }
    }
  }, [isActive, setIsActive, letter]);

  const deactivatePad = useCallback(() => setIsActive(""), []);

  const playAudio = useCallback(() => {
    if (power) {
      const audioToPlay = keyRef.current;
      audioToPlay.currentTime = 0;
      audioToPlay.play();
      displayKey(audioId.replace(/-/g, " "));
      activatePad();
      setTimeout(() => deactivatePad(), 200);
    }
  }, [power, audioId, displayKey, activatePad, deactivatePad]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const { key } = e;
      if (key.toUpperCase() === letter) {
        playAudio();
      }
    };

    document.addEventListener("keydown", (e) => handleKeyPress(e));
    return document.removeEventListener("keydown", (e) => handleKeyPress(e));
  }, [letter, playAudio]);

  return (
    <div
      id={audioId}
      className={`drum-pad ${keyPadColor(power, letter)} ${isActive}`}
      onClick={() => playAudio()}
    >
      {letter}
      <audio ref={keyRef} className="clip" id={letter} src={link} />
    </div>
  );
};

export default DrumPad;
