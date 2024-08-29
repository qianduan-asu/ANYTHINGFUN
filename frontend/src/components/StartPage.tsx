import React from "react"
import "../assets/StartPage.css"

interface StartPageProps {
  onStart: () => void;
  isMapLoaded: boolean;
}

const StartPage: React.FC<StartPageProps> = ({ onStart, isMapLoaded }) => {
  return (
    <div className="start-page">
      <div className="start-page-content">
        <div className="minecraft-loader">
          <h1 className="title">Welcome to AnythingFun</h1>
          <div className="animation-container">
            <div className="map-icon">🗺️</div>
            <div className="car-icon">🚗</div>
            <div className="plane-icon">✈️</div>
          </div>

          {isMapLoaded && (
            <button onClick={onStart} className="start-button">
              Start Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartPage;
