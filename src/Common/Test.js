import React, { useRef, useState } from "react";

const FullScreenToggle = () => {
  const containerRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const enterFullScreen = () => {
    if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    } else if (containerRef.current.webkitRequestFullscreen) {
      containerRef.current.webkitRequestFullscreen(); // For Safari
    } else if (containerRef.current.msRequestFullscreen) {
      containerRef.current.msRequestFullscreen(); // For IE11
    }
    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); // For Safari
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen(); // For IE11
    }
    setIsFullScreen(false);
  };



  return (
    <div>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "300px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <p>This is the content you can toggle full-screen.

        {isFullScreen ? (
          <button onClick={exitFullScreen}>Normal Screen</button>
        ) : (
          <button onClick={enterFullScreen}>Full Screen</button>
        )}
        </p>
      </div>
    
    </div>
  );
};

export default FullScreenToggle;
