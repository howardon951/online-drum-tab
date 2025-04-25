"use client";

import { DRUM_SOUNDS, STEPS } from "../constants/drumSounds";
import { DrumSequence } from "../types";

interface DrumGridProps {
  sequence: DrumSequence;
  currentStep: number;
  onCellClick: (soundId: string, step: number) => void;
  onSoundPlay: (soundId: string) => void;
}

export function DrumGrid({
  sequence,
  currentStep,
  onCellClick,
  onSoundPlay,
}: DrumGridProps) {
  return (
    <div className="w-full max-w-4xl overflow-x-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <table className="w-full border-collapse">
        <tbody>
          {DRUM_SOUNDS.map((sound) => (
            <tr
              key={sound.id}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <td className="py-2 pr-4 w-24">
                <button
                  className="w-full text-left font-medium hover:text-blue-500 transition-colors truncate"
                  onClick={() => onSoundPlay(sound.id)}
                >
                  {sound.name}
                </button>
              </td>

              {Array(STEPS)
                .fill(0)
                .map((_, i) => (
                  <td key={i} className="text-center p-1">
                    <button
                      className={`w-10 h-10 rounded-md transition-all ${
                        sequence[sound.id]?.[i]
                          ? "bg-blue-500 scale-100"
                          : "bg-gray-200 dark:bg-gray-700 scale-90"
                      } ${
                        currentStep === i ? "border-2 border-orange-500" : ""
                      }`}
                      onClick={() => onCellClick(sound.id, i)}
                    ></button>
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
