"use client";
// page.tsx

import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Uploader from "./components/Uploader";
import React, { useState } from "react";

export default function Home(this: any) {
  const [reload, setReload] = useState(false);

  const shouldReload = () => {
    setReload(!reload);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <Uploader reloadParent={shouldReload} />
      <Gallery reloadGallery={reload} />
    </main>
  );
}

