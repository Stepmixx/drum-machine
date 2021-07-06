import Chord1 from "../bank1/Chord-1.wav";
import Chord2 from "../bank1/Chord-2.wav";
import SFX1 from "../bank1/SFX-1.wav";
import SFX2 from "../bank1/SFX-2.wav";
import Clap from "../bank1/Clap.wav";
import Cymbal from "../bank1/Cymbal.wav";
import Kick from "../bank1/Kick.wav";
import HiHat from "../bank1/Hi-Hat.wav";
import Snare from "../bank1/Snare.wav";

const bank1 = [
  { key: "Q", clipId: "Chord-1", src: Chord1 },
  { key: "W", clipId: "Chord-2", src: Chord2 },
  { key: "E", clipId: "SFX-1", src: SFX1 },
  { key: "A", clipId: "SFX-2", src: SFX2 },
  { key: "S", clipId: "Clap", src: Clap },
  { key: "D", clipId: "Cymbal", src: Cymbal },
  { key: "Z", clipId: "Kick", src: Kick },
  { key: "X", clipId: "Hi-Hat", src: HiHat },
  { key: "C", clipId: "Snare", src: Snare },
];

export default bank1;
