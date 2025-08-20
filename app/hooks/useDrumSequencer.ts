"use client";

import { useState, useEffect, useRef } from "react";
import { DRUM_SOUNDS, STEPS, DEFAULT_BPM } from "@/app/constants/drumSounds";
import { DrumSequence } from "@/app/types";
import {
  startAudioContext,
  createSamplesPlayers,
  setBpm as setToneBpm,
} from "@/app/lib/toneUtils";
import { Sequence, Players } from "tone";
import { useTransport } from "@/app/context/ToneTransportContext";

export function useDrumSequencer() {
  // State
  const [sequence, setSequence] = useState<DrumSequence>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [isClient, setIsClient] = useState(false);

  // Refs
  const samplerRef = useRef<Players | null>(null);
  const sequenceRef = useRef<Sequence | null>(null);
  // Keep track of the latest sequence state for the Tone.Sequence callback
  const sequenceStateRef = useRef<DrumSequence>({});
  const transport = useTransport();

  // Initialize sequence - only on client-side
  useEffect(() => {
    setIsClient(true);

    const initialSequence: DrumSequence = {};
    DRUM_SOUNDS.forEach((sound) => {
      initialSequence[sound.id] = Array(STEPS).fill(false);
    });
    setSequence(initialSequence);
  }, []);

  // Always keep the ref synced with the latest sequence state
  useEffect(() => {
    sequenceStateRef.current = sequence;
  }, [sequence]);

  // Initialize Tone.js - only once on the client
  useEffect(() => {
    if (!isClient) return;

    const loadTone = async () => {
      // Create sampler
      const samples: Record<string, string> = {};
      DRUM_SOUNDS.forEach((sound) => {
        samples[sound.id] = sound.sound;
      });

      samplerRef.current = createSamplesPlayers(samples);

      // Create sequence that references the latest sequence state via ref
      sequenceRef.current = new Sequence(
        (time: number, step: number) => {
          setCurrentStep(step);

          // Play all enabled drum sounds at the current step
          DRUM_SOUNDS.forEach((sound) => {
            if (sequenceStateRef.current[sound.id]?.[step]) {
              samplerRef.current?.player(sound.id).start(time);
            }
          });
        },
        Array.from({ length: STEPS }, (_, i) => i),
        "16n"
      );
    };

    loadTone();

    return () => {
      if (sequenceRef.current) {
        sequenceRef.current.dispose();
      }
      if (samplerRef.current) {
        samplerRef.current.dispose();
      }
    };
  }, [isClient]);

  // Handle play state changes
  useEffect(() => {
    if (!isClient) return;

    if (isPlaying) {
      // Start Transport and sequence
      transport.start();
      if (sequenceRef.current) {
        sequenceRef.current.start(0);
      }
    } else {
      // Stop Transport and sequence
      transport.stop();
      setCurrentStep(-1);
      if (sequenceRef.current) {
        sequenceRef.current.stop();
      }
    }

    return () => {
      if (transport) {
        transport.stop();
      }
    };
  }, [isPlaying, isClient, transport]);

  // Handle BPM changes
  useEffect(() => {
    if (isClient) {
      setToneBpm(bpm);
    }
  }, [bpm, isClient]);

  // Cell click handler
  const handleCellClick = (soundId: string, step: number) => {
    // Create a deep copy of the sequence for the updated drum sound
    const newSequence = {
      ...sequence,
      [soundId]: [...sequence[soundId]],
    };
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
