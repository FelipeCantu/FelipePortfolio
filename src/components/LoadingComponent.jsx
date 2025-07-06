import React from 'react';

const LoadingComponent = ({ loadingText = "Loading Application", statusText = "Initializing components..." }) => {
  return (
    <div className="loading-container">
      <img className="background-image" src="images/mainbg.jpg" alt="Loading Background" />
      
      <div className="pulsing-circles">
        <div className="pulse-circle circle-1"></div>
        <div className="pulse-circle circle-2"></div>
        <div className="pulse-circle circle-3"></div>
      </div>
      
      <div className="logo-orbit-container">
        <div className="logo-container">
          <div className="logo">
            <img className="logo-image" src="images/mainwlogo.png" alt="Company Logo" />
          </div>
        </div>
        
        <div className="orbiting-dot dot-1"></div>
        <div className="orbiting-dot dot-2"></div>
        <div className="orbiting-dot dot-3"></div>
        <div className="orbiting-dot dot-4"></div>
      </div>
      
      <h1 className="loading-text">{loadingText}</h1>
      
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        <p className="status-text">{statusText}</p>
      </div>
      
      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { background-position: -300px 0; }
          100% { background-position: 300px 0; }
        }
        
        @keyframes orbitAnimation {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        
        @keyframes backgroundPulse {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.05); }
        }
        
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          background: rgba(20, 20, 30, 0.95);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow: visible;
          z-index: 9999;
        }
        
        .background-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
          opacity: 0.3;
        }
        
        .pulsing-circles {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 0;
        }
        
        .pulse-circle {
          position: absolute;
          border-radius: 50%;
          animation: backgroundPulse ease-in-out infinite;
        }
        
        .circle-1 {
          width: 200px;
          height: 200px;
          border: 2px solid rgba(0, 191, 255, 0.3);
          animation-duration: 2s;
        }
        
        .circle-2 {
          width: 300px;
          height: 300px;
          border: 2px solid rgba(247, 171, 10, 0.2);
          animation-duration: 3s;
          animation-delay: 0.5s;
        }
        
        .circle-3 {
          width: 400px;
          height: 400px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation-duration: 4s;
          animation-delay: 1s;
        }
        
        .logo-orbit-container {
          position: relative;
          width: 300px;
          height: 300px;
          margin-bottom: 3rem;
          z-index: 2;
        }
        
        .logo-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150px;
          height: 150px;
        }
        
        .logo {
          width: 100%;
          height: 100%;
          animation: rotate 4s linear infinite, pulse 3s ease-in-out infinite;
          filter: drop-shadow(0 8px 16px rgba(0, 191, 255, 0.3));
        }
        
        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        .orbiting-dot {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          margin-top: -6px;
          margin-left: -6px;
          animation: orbitAnimation linear infinite;
          z-index: 1;
        }
        
        .dot-1 {
          background: radial-gradient(circle, #00bfff, #1e90ff);
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.8);
          animation-duration: 3s;
        }
        
        .dot-2 {
          background: radial-gradient(circle, #f7ab0a, #ffbf00);
          box-shadow: 0 0 15px rgba(247, 171, 10, 0.8);
          animation-duration: 2.5s;
          animation-delay: -1s;
        }
        
        .dot-3 {
          background: radial-gradient(circle, #ffffff, #e0e0e0);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
          animation-duration: 3.5s;
          animation-delay: -2s;
        }
        
        .dot-4 {
          background: radial-gradient(circle, #1e90ff, #0066cc);
          box-shadow: 0 0 15px rgba(30, 144, 255, 0.8);
          animation-duration: 2.8s;
          animation-delay: -0.5s;
        }
        
        .loading-text {
          color: white;
          font-size: 2rem;
          font-weight: 300;
          margin-bottom: 1.5rem;
          text-align: center;
          background: linear-gradient(90deg, #00bfff, white, #f7ab0a);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: fadeInOut 2.5s ease-in-out infinite;
        }
        
        .progress-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .progress-bar {
          width: 300px;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          border: 1px solid rgba(0, 191, 255, 0.3);
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 191, 255, 0.8),
            rgba(247, 171, 10, 0.8),
            transparent
          );
          background-size: 300px 100%;
          animation: shimmer 2s infinite;
        }
        
        .status-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          text-align: center;
          margin: 0;
          animation: fadeInOut 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingComponent;