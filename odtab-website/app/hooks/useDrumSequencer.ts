"use client";

import { useState, useEffect, useRef } from "react";
import { DRUM_SOUNDS, STEPS, DEFAULT_BPM } from "../constants/drumSounds";
import { ToneJSPlayers, ToneJSSequence, DrumSequence } from "../types";
import {
  startAudioContext,
  createSamplesPlayers,
  setBpm as setToneBpm,
} from "../lib/toneUtils";

export function useDrumSequencer() {
  // State
  const [sequence, setSequence] = useState<DrumSequence>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [isClient, setIsClient] = useState(false);

  // Refs
  const samplerRef = useRef<ToneJSPlayers | null>(null);
  const sequenceRef = useRef<ToneJSSequence | null>(null);

  // Initialize sequence - only on client-side
  useEffect(() => {
    setIsClient(true);

    const initialSequence: DrumSequence = {};
    DRUM_SOUNDS.forEach((sound) => {
      initialSequence[sound.id] = Array(STEPS).fill(false);
    });
    setSequence(initialSequence);
  }, []);

  // Initialize Tone.js - only on client-side
  useEffect(() => {
    if (!isClient) return;

    const loadTone = async () => {
      // Ensure Tone is loaded
      const Tone = window.Tone;
      if (!Tone) return;

      // Create sampler
      const samples: Record<string, string> = {};
      DRUM_SOUNDS.forEach((sound) => {
        samples[sound.id] = sound.sound;
      });

      // Create sampler
      samplerRef.current = createSamplesPlayers(samples);

      // Set BPM
      setToneBpm(bpm);

      // Create sequence
      sequenceRef.current = new Tone.Sequence(
        (time: number, step: number) => {
          setCurrentStep(step);

          // Play all enabled drum sounds at the current step
          DRUM_SOUNDS.forEach((sound) => {
            if (sequence[sound.id] && sequence[sound.id][step]) {
              samplerRef.current?.player(sound.id).start(time);
            }
          });
        },
        Array.from({ length: STEPS }, (_, i) => i),
        "16n"
      );
    };

    loadTone();

    // Cleanup function
    return () => {
      if (sequenceRef.current) {
        sequenceRef.current.dispose();
      }
      if (samplerRef.current) {
        samplerRef.current.dispose();
      }
    };
  }, [sequence, bpm, isClient]);

  // Handle play state changes
  useEffect(() => {
    if (!isClient) return;

    const Tone = window.Tone;
    if (!Tone) return;

    if (isPlaying) {
      // Start Transport and sequence
      Tone.Transport.start();
      if (sequenceRef.current) {
        sequenceRef.current.start(0);
      }
    } else {
      // Stop Transport and sequence
      Tone.Transport.stop();
      setCurrentStep(-1);
      if (sequenceRef.current) {
        sequenceRef.current.stop();
      }
    }

    return () => {
      if (Tone) {
        Tone.Transport.stop();
      }
    };
  }, [isPlaying, isClient]);

  // Handle BPM changes
  useEffect(() => {
    if (isClient) {
      setToneBpm(bpm);
    }
  }, [bpm, isClient]);

  // Cell click handler
  const handleCellClick = (soundId: string, step: number) => {
    const newSequence = { ...sequence };
    newSequence[soundId][step] = !newSequence[soundId][step];
    setSequence(newSequence);
  };

  // Play/pause handler
  const handlePlayPause = async () => {
    if (!isClient) return;

    // Start audio context if needed (must be triggered by user interaction)
    await startAudioContext();
    setIsPlaying(!isPlaying);
  };

  // Clear sequence
  const handleClear = () => {
    const newSequence: DrumSequence = {};
    DRUM_SOUNDS.forEach((sound) => {
      newSequence[sound.id] = Array(STEPS).fill(false);
    });
    setSequence(newSequence);
  };

  // Play a single drum sound
  const handleSoundPlay = (soundId: string) => {
    if (isClient && samplerRef.current) {
      samplerRef.current.player(soundId).start();
    }
  };

  return {
    sequence,
    isPlaying,
    currentStep,
    bpm,
    isClient,
    handleCellClick,
    handlePlayPause,
    handleClear,
    handleSoundPlay,
    setBpm,
  };
}
