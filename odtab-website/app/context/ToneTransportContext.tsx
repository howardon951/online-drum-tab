"use client";

import React, { createContext, useContext, useMemo } from "react";
import { getTransport } from "tone";
import type { TransportClass } from "tone/build/esm/core/clock/Transport";

// 定義 context 型別
interface ToneTransportContextValue {
  transport: TransportClass;
}

const ToneTransportContext = createContext<
  ToneTransportContextValue | undefined
>(undefined);

export const ToneTransportProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 只在 client 端初始化 transport
  const transport = useMemo(() => getTransport(), []);

  return (
    <ToneTransportContext.Provider value={{ transport }}>
      {children}
    </ToneTransportContext.Provider>
  );
};

export function useTransport() {
  const context = useContext(ToneTransportContext);
  if (!context) {
    throw new Error("useTransport 必須在 ToneTransportProvider 內使用");
  }
  return context.transport;
}
