import { DrumSound } from "../types";

// Number of steps in the sequence
export const STEPS = 16;
export const DEFAULT_BPM = 120;

// Define drum sounds
export const DRUM_SOUNDS: DrumSound[] = [
  {
    id: "kick",
    name: "底鼓",
    sound: "https://tonejs.github.io/audio/drum-samples/808/kick.mp3",
  },
  {
    id: "snare",
    name: "軍鼓",
    sound: "https://tonejs.github.io/audio/drum-samples/808/snare.mp3",
  },
  {
    id: "hihat",
    name: "合鈸",
    sound: "https://tonejs.github.io/audio/drum-samples/808/hihat-closed.mp3",
  },
  {
    id: "tomLow",
    name: "低音鼓",
    sound: "https://tonejs.github.io/audio/drum-samples/808/tom-low.mp3",
  },
  {
    id: "tomMid",
    name: "中音鼓",
    sound: "https://tonejs.github.io/audio/drum-samples/808/tom-mid.mp3",
  },
  {
    id: "crash",
    name: "鈸",
    sound: "https://tonejs.github.io/audio/drum-samples/808/crash-808.mp3",
  },
];
