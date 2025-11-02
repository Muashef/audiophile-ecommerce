"use client";
import animationData from "../public/assets/animation_lm38kcif.json";
import React, { useRef, useEffect } from "react";
import lottie, { AnimationItem } from "lottie-web";

interface LottieAnimationProps {
  animationData: any;
}

function Lotties() {
  const container = useRef<HTMLDivElement>(null);
  let animation: AnimationItem | null = null;

  useEffect(() => {
    if (container.current) {
      animation = lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      });
    }

    return () => {
      animation?.destroy();
      animation = null;
    };
  }, []);
    
  return (
    <div
      ref={container}
      className="w-[300px] md:w-[500px] h-screen flex justify-center items-center"
      style={{ margin: "0 auto" }}
    />
  );
}

export default Lotties;