"use client";

import { getData } from "@/api/getData";
import { useEffect } from "react";

export default function Home() {
  const fetch = async () => {
    try {
      await getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={fetch}>get data</button>
    </div>
  );
}
