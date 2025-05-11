import { DrumSound } from "@/app/types";

// Number of steps in the sequence
export const STEPS = 16;
export const DEFAULT_BPM = 120;

// Define drum sounds
export const DRUM_SOUNDS: DrumSound[] = [
  {
    id: "kick",
    name: "kick",
    sound: "./sounds/kick.wav",
  },
  {
    id: "snare",
    name: "snare",
    sound: "./sounds/snare.wav",
  },
  {
    id: "hihat",
    name: "hihat",
    sound: "./sounds/hiHat.wav",
  },
  {
    id: "tomLow",
    name: "tomLow",
    sound: "./sounds/snare.wav",
  },
  {
    id: "tomMid",
    name: "tomMid",
    sound: "./sounds/snare.wav",
  },
  {
    id: "crash",
    name: "crash",
    sound: "./sounds/snare.wav",
  },
];
