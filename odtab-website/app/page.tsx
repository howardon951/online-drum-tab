import { DrumMachine } from "@/app/components/DrumMachine";
import { ToneTransportProvider } from "@/app/context/ToneTransportContext";
export default function Home() {
  return (
    <ToneTransportProvider>
      <DrumMachine />
    </ToneTransportProvider>
  );
}
