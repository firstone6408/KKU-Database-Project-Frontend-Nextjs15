/** @format */

"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./MapLeaflet"), {
  ssr: false,
});

export { Map };
