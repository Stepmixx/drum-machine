import React, { useState, useEffect, useCallback } from "react";
import DrumPad from "./DrumPad";
import Switch from "react-switch";
import "./DrumMachine.css";
import bank1 from "./bank1";
import bank2 from "./bank2";
import { VolumeSlider, Thumb, StyledTrack } from "./VolumeSlider";

const switchTextStyle = {
  height: "100%",
  color: "white",
  fontWeight: "bold",
  fontSize: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const DrumMachine = () => {
  const [isOn, powerMachine] = useState(false);
  const [currentBank, setBank] = useState(bank1);
  const [bankSwitchBool, switchBank] = useState(false);
  const [displayText, setDisplayText] = useState(String.fromCharCode(160));
  const [sliderColor, setSliderColor] = useState("#E9007E");
  const [volume, setVolume] = useState(1);

  const changeBank = () => {
    if (currentBank === bank1) {
      setBank(bank2);
      if (isOn) {
        setDisplayText("Lofi Beats");
        setSliderColor("#13B9B9");
      }
    } else {
      setBank(bank1);
      if (isOn) {
        setDisplayText("Default Beats");
        setSliderColor("#E9007E");
      }
    }
    switchBank(!bankSwitchBool);
  };

  const clearDisplay = () => setDisplayText(String.fromCharCode(160));

  const activeColor = (padKey) => {
    switch (padKey) {
      case "Q":
      case "A":
      case "Z":
        return "active-yellow";
      case "W":
      case "S":
      case "X":
        return "active-pink";
      case "E":
      case "D":
      case "C":
        return "active-blue";
      default:
        return null;
    }
  };

  const playAudio = useCallback(
    (padKey, element) => {
      if (isOn) {
        const audio = document.getElementById(padKey);
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play();
        setDisplayText(
          currentBank
            .find((obj) => obj.key === padKey)
            .clipId.replace(/-/g, " ")
        );
        element.classList.add(activeColor(padKey));
        setTimeout(() => {
          element.classList.remove(activeColor(padKey));
        }, 200);
      }
    },
    [currentBank, isOn, volume]
  );

  useEffect(() => {
    const handleKeyPress = (e) => {
      const audioKey = e.key.toUpperCase();
      if (currentBank.find((obj) => obj.key === audioKey)) {
        const keyPadElement = document.getElementById(
          currentBank.find((obj) => obj.key === audioKey).clipId
        );
        playAudio(audioKey, keyPadElement);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [playAudio, currentBank]);

  return (
    <div
      id="drum-machine"
      className="d-flex align-items-center justify-content-evenly flex-column"
    >
      <div id="drum-pad-container">
        {currentBank.map((obj, i) => {
          return (
            <DrumPad
              letter={obj.key}
              link={obj.src}
              audioId={obj.clipId}
              power={isOn}
              playSound={playAudio}
              key={i}
              tabIndex={i.toString()}
            />
          );
        })}
      </div>
      <div id="displayandswitches" className="control-panel">
        <div className="switches">
          <i className="fas fa-power-off"></i>
          <Switch
            aria-label="power switch"
            onChange={() => {
              powerMachine(!isOn);
              clearDisplay();
            }}
            checked={isOn}
            uncheckedIcon={<div style={switchTextStyle}>Off</div>}
            checkedIcon={<div style={switchTextStyle}>On</div>}
            activeBoxShadow="0 0 2px 3px #ffff"
          />
        </div>
        <div id="display">{displayText}</div>
        <div className="switches">
          <i className="fas fa-music"></i>
          <Switch
            aria-label="bank switch"
            onChange={() => changeBank()}
            checked={bankSwitchBool}
            uncheckedIcon={<div style={switchTextStyle}>1</div>}
            checkedIcon={<div style={switchTextStyle}>2</div>}
            activeBoxShadow="0 0 2px 3px #ffff"
            offColor="#E9007E"
            onColor="#13B9B9"
          />
        </div>
      </div>
      <div id="volume-container" className="control-panel">
        <i id="volume-icon" className="fas fa-volume"></i>
        <VolumeSlider
          ariaLabel="volume slider"
          defaultValue={[100]}
          renderTrack={(props, state, color = sliderColor) => (
            <StyledTrack {...props} index={state.index} sldrColor={color} />
          )}
          renderThumb={Thumb}
          onChange={(value) => setVolume(value / 100)}
        />
      </div>
    </div>
  );
};

export default DrumMachine;
