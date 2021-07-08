import Slider from "react-slider";
import styled from "styled-components";

export const VolumeSlider = styled(Slider)`
  width: 90%;
  height: 100%;
`;

const StyledThumb = styled.div`
  height: 20px;
  line-height: 20px;
  width: 20px;
  text-align: center;
  background-color: white;
  color: rgb(0, 0, 0, 0);
  border-radius: 50%;
  cursor: grab;
  font-size: 10px;
`;

export const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

export const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) => (props.index === 1 ? "#090909" : props.sldrColor)};
  border-radius: 999px;
`;

// export const Track = (props, state, sliderColor) => (
//   <StyledTrack {...props} index={state.index} sldrColor={sliderColor} />
// );
