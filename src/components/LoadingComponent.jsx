import React from 'react';

const LoadingComponent = ({ loadingText = "Loading Application", statusText = "Initializing components..." }) => {
  return (
    <div className="loading-container">
      <div className="mesh-gradient"></div>

      <div className="glass-card">
        <div className="loader-wrapper">
          <div className="loading-ring"></div>
          <div className="logo-inner">
            <img className="logo-image" src="images/mainwlogo.png" alt="Company Logo" />
          </div>
        </div>

        <div className="text-content">
          <h1 className="loading-text">{loadingText}</h1>
          <div className="progress-wrapper">
            <div className="progress-bar">
              <div className="progress-line"></div>
            </div>
            <p className="status-text">{statusText}</p>
          </div>
        </div>
      </div>


      <style jsx>{`
        @keyframes hueRotate {
          from { filter: hue-rotate(0deg); }
          to { filter: hue-rotate(360deg); }
        }
        
        @keyframes ringRotate {
          0% { transform: rotate(0deg); border-top-color: #00bfff; }
          50% { border-top-color: #f7ab0a; }
          100% { transform: rotate(360deg); border-top-color: #00bfff; }
        }
        
        @keyframes logoBreathe {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        
        @keyframes progressFlow {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .loading-container {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0f;
          overflow: hidden;
          z-index: 9999;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .mesh-gradient {
          position: absolute;
          inset: -50%;
          background: 
            radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 70% 70%, rgba(247, 171, 10, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(30, 144, 255, 0.05) 0%, transparent 60%);
          filter: blur(80px);
          animation: hueRotate 20s linear infinite;
          z-index: 1;
        }

        .glass-card {
          position: relative;
          z-index: 2;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 40px;
          padding: 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .loader-wrapper {
          position: relative;
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-ring {
          position: absolute;
          inset: 0;
          border: 3px solid rgba(255, 255, 255, 0.05);
          border-top: 3px solid #00bfff;
          border-radius: 50%;
          animation: ringRotate 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .logo-inner {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: logoBreathe 3s ease-in-out infinite;
        }

        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 0 15px rgba(0, 191, 255, 0.3));
        }

        .text-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .loading-text {
          color: white;
          font-size: 1.75rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin: 0;
          background: linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .progress-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .progress-bar {
          width: 200px;
          height: 3px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .progress-line {
          position: absolute;
          height: 100%;
          width: 40%;
          background: linear-gradient(90deg, transparent, #00bfff, transparent);
          animation: progressFlow 2s linear infinite;
        }

        .status-text {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.9rem;
          font-weight: 400;
          margin: 0;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

      `}</style>
    </div>
  );
};

export default LoadingComponent;