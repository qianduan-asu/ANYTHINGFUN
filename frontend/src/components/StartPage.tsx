// src/components/StartPage.tsx
import React, { useEffect, useState } from "react";
import "../assets/StartPage.css";

interface StartPageProps {
  onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onStart, 1000); // 1秒后调用 onStart 函数，完全隐藏开始页
    }, 3000); // 3秒后开始淡出

    return () => clearTimeout(timer);
  }, [onStart]);

  return (
    <div className={`start-page ${fadeOut ? "fade-out" : ""}`}>
      <h1 className="title">欢迎来到地图游戏</h1>
      <div className="animation">🌍</div>
    </div>
  );
};

export default StartPage;
