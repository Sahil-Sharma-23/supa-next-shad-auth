"use client";

import React from "react";
import { Next13ProgressBar } from "next13-progressbar";

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Next13ProgressBar
        height="4px"
        color="#fff"
        options={{ showSpinner: false }}
        showOnShallow
      />
    </>
  );
};

export default ProgressProvider;
