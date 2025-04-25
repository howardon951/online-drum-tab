// Define Tone.js type for TypeScript
export interface ToneJS {
  Players: new (samples: Record<string, string>) => ToneJSPlayers;
  Sequence: new (
    callback: (time: number, step: number) => void,
    events: number[],
    subdivision: string
  ) => ToneJSSequence;
  Transport: {
    start: () => void;
    stop: () => void;
    bpm: { value: number };
  };
  context: {
    state: string;
    resume: () => Promise<void>;
  };
}

export interface ToneJSPlayers {
  toDestination: () => ToneJSPlayers;
  player: (id: string) => { start: (time?: number) => void };
  dispose: () => void;
}

export interface ToneJSSequence {
  start: (time: number) => void;
  stop: () => void;
  dispose: () => void;
}

// Extend Window interface
declare global {
  interface Window {
    Tone: ToneJS;
  }
}

// Drum sound type definition
export type DrumSound = {
  id: string;
  name: string;
  sound: string;
};

// Sequence type
export type DrumSequence = Record<string, boolean[]>;
