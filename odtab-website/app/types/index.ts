// Drum sound type definition
export type DrumSound = {
  id: string;
  name: string;
  sound: string;
};

// Sequence type
export type DrumSequence = Record<string, boolean[]>;
