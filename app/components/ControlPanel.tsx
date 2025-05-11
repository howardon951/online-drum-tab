"use client";

interface ControlPanelProps {
  isPlaying: boolean;
  bpm: number;
  onPlayPause: () => void;
  onClear: () => void;
  onBpmChange: (bpm: number) => void;
}

export function ControlPanel({
  isPlaying,
  bpm,
  onPlayPause,
  onClear,
  onBpmChange,
}: ControlPanelProps) {
  return (
    <div className="mb-6 flex gap-4 items-center">
      <button
        onClick={onPlayPause}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full text-lg transition-colors"
      >
        {isPlaying ? "暫停" : "播放"}
      </button>

      <button
        onClick={onClear}
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full text-lg transition-colors"
      >
        清除
      </button>

      <div className="flex items-center ml-4">
        <label htmlFor="bpm" className="mr-2 font-medium">
          BPM:
        </label>
        <input
          id="bpm"
          type="number"
          min="60"
          max="200"
          value={bpm}
          onChange={(e) => onBpmChange(Number(e.target.value))}
          className="w-16 px-2 py-1 border rounded text-center"
        />
      </div>
    </div>
  );
}
