"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [displaySize, setDisplaySize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const resizeHandler = () => {
    setDisplaySize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    console.log("Window resize event fired.");

    return () => {
      window.removeEventListener("resize", resizeHandler);
      console.log("Window resize event unregistered.");
    };
  }, [displaySize]);

  useEffect(() => {
    document.title = `Size: ${displaySize.height} x ${displaySize.width}`;
  });

  return (
    <div>
      {/* <p>Width: {displaySize.width}</p>
      <p>Height: {displaySize.height}</p> */}
      <Link className="bg-purple-400" href={"/about"}>
        About
      </Link>
    </div>
  );
};

export default page;
