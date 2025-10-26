import type React from "react";

export interface Stat {
  label: string;
  value: number;
}

export interface Activity{
  category: React.ReactElement;
  description: string;
  time: string;
}