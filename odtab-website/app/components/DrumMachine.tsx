"use client";

import { useDrumSequencer } from "@/app/hooks/useDrumSequencer";
import { DrumGrid } from "@/app/components/DrumGrid";
import { ControlPanel } from "@/app/components/ControlPanel";
import { Footer } from "@/app/components/Footer";
import { LoadingIndicator } from "@/app/components/LoadingIndicator";

export function DrumMachine() {
  const {
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
  } = useDrumSequencer();

  // Show loading indicator during server-side rendering or before client initialization
  if (!isClient) {
    return <LoadingIndicator />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-8">互動式鼓機音序器</h1>

      <ControlPanel
        isPlaying={isPlaying}
        bpm={bpm}
        onPlayPause={handlePlayPause}
        onClear={handleClear}
        onBpmChange={setBpm}
      />

      <DrumGrid
        sequence={sequence}
        currentStep={currentStep}
        onCellClick={handleCellClick}
        onSoundPlay={handleSoundPlay}
      />
      <Footer />
    </div>
  );
}
