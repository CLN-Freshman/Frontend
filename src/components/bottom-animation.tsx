import { memo } from "react";

export const WaveBackground = memo(function WaveBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="blueWave">
            <stop
              offset="0%"
              style={{ stopColor: "rgba(59, 130, 246, 0.06)" }}
            />
            <stop offset="50%" style={{ stopColor: "#3b82f6" }} />
            <stop
              offset="100%"
              style={{ stopColor: "rgba(59, 130, 246, 0.2)" }}
            />
          </linearGradient>

          <linearGradient id="greenWave">
            <stop
              offset="0%"
              style={{ stopColor: "rgba(34, 197, 94, 0.06)" }}
            />
            <stop offset="50%" style={{ stopColor: "#22c55e" }} />
            <stop
              offset="100%"
              style={{ stopColor: "rgba(34, 197, 94, 0.2)" }}
            />
          </linearGradient>

          <path
            id="wave"
            d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
            s371.981,38.998,575.971,0
            s293.985-39.278,505.474,5.859
            s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
          />
        </defs>

        <g>
          <use xlinkHref="#wave" fill="url(#blueWave)" opacity=".3">
            <animateTransform
              attributeName="transform"
              type="translate"
              dur="10s"
              calcMode="spline"
              values="270 390; -334 340; 270 390"  // Reduced Y values from 420 to 390
              keyTimes="0; .5; 1"
              keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
              repeatCount="indefinite"
            />
          </use>

          <use xlinkHref="#wave" fill="url(#greenWave)" opacity=".6">
            <animateTransform
              attributeName="transform"
              type="translate"
              dur="8s"
              calcMode="spline"
              values="-270 390;243 380;-270 390"  // Reduced Y values from 420 to 390
              keyTimes="0; .6; 1"
              keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
              repeatCount="indefinite"
            />
          </use>

          <use xlinkHref="#wave" fill="url(#blueWave)" opacity=".9">
            <animateTransform
              attributeName="transform"
              type="translate"
              dur="6s"
              calcMode="spline"
              values="0 390;-140 360;0 390"  // Reduced Y values from 420 to 390
              keyTimes="0; .4; 1"
              keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
              repeatCount="indefinite"
            />
          </use>
        </g>
      </svg>
    </div>
  );
});