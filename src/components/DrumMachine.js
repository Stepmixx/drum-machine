import React, { useState } from "react";
import DrumPad from "./DrumPad";
import Switch from "react-switch";
import "./DrumMachine.css";
import bank1 from "./bank1";
import bank2 from "./bank2";

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

  const changeBank = () => {
    if (isOn) {
      if (currentBank === bank1) {
        setBank(bank2);
        setDisplayText("Lofi Beats");
      } else {
        setBank(bank1);
        setDisplayText("Default Beats");
      }
      switchBank(!bankSwitchBool);
    }
  };

  const clearDisplay = () => setDisplayText(String.fromCharCode(160));

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
              displayKey={setDisplayText}
              power={isOn}
              key={i}
              tabIndex={i.toString()}
            />
          );
        })}
      </div>
      <div
        id="control-panel"
        className="d-flex justify-content-between align-items-center"
      >
        <div className="switches">
          <i className="fas fa-power-off"></i>
          <Switch
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
    </div>
  );
};

export default DrumMachine;
