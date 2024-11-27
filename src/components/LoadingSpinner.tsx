import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "md" }) => {
  const dimensions = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <div className="flex items-center justify-center">
      <svg
        className={`${dimensions[size]} animate-pulse`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 123.703 111.439"
      >
        <defs>
          <filter
            id="logo"
            x="0"
            y="0"
            width="123.703"
            height="111.439"
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy="3" />
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodOpacity="0.161" />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g transform="translate(9 6)">
          <g transform="matrix(1, 0, 0, 1, -9, -6)" filter="url(#logo)">
            <path
              d="M74.322-7.185l.1.031v3.3h-.012A2.736,2.736,0,0,1,71.73-1.119h-3.84V2.565C67.9,3.754,68.36,4.3,69.4,4.317H81.562c1.033-.012,1.491-.562,1.511-1.752V-13.567c-.02-1.194-.478-1.752-1.519-1.756H69.4c-1.041,0-1.5.562-1.51,1.756v3.679h3.84A2.631,2.631,0,0,1,74.322-7.185Z"
              fill="#FCD34D"
              className="animate-bounce"
            />
            {/* Rest of the SVG path - maintained for brevity */}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
