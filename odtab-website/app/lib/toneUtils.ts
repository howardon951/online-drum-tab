"use client";

/**
 * Attempts to start the Tone.js audio context
 * This must be triggered by a user interaction due to browser restrictions
 */
export async function startAudioContext(): Promise<boolean> {
  if (typeof window === "undefined" || !window.Tone) {
    return false;
  }

  try {
    if (window.Tone.context.state !== "running") {
      await window.Tone.context.resume();
    }
    return true;
  } catch (error) {
    console.error("Failed to start audio context:", error);
    return false;
  }
}

/**
 * Creates a Tone.js Players instance with the provided samples
 */
export function createSamplesPlayers(samples: Record<string, string>) {
  if (typeof window === "undefined" || !window.Tone) {
    return null;
  }

  try {
    return new window.Tone.Players(samples).toDestination();
  } catch (error) {
    console.error("Failed to create samples player:", error);
    return null;
  }
}

/**
 * Sets the Tone.js global BPM
 */
export function setBpm(bpm: number): boolean {
  if (typeof window === "undefined" || !window.Tone) {
    return false;
  }

  try {
    window.Tone.Transport.bpm.value = bpm;
    return true;
  } catch (error) {
    console.error("Failed to set BPM:", error);
    return false;
  }
}
