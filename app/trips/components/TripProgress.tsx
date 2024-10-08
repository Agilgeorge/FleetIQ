import React from "react";

interface TripStatus {
  status: string;
}

const TripProgress: React.FC<TripStatus> = ({ status }) => {
  const steps = [
    { name: "Started", date: "6 Aug 2024" },
    { name: "Completed" },
    { name: "POD Received" },
    { name: "POD Submitted" },
    { name: "Settled" },
  ];

  const getStatusIndex = (status: string) => {
    return steps.findIndex((step) => step.name === status);
  };

  const currentStatusIndex = getStatusIndex(status);

  return (
    <div className="flex items-center space-x-4">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full 
                        ${
                          index <= currentStatusIndex
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
          >
            {index <= currentStatusIndex && (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            )}
          </div>
          <div
            className={`mt-2 text-xs ${
              index <= currentStatusIndex ? "text-black" : "text-gray-500"
            }`}
          >
            {step.name}
          </div>
          {step.date && (
            <div className="text-xs text-gray-500">{step.date}</div>
          )}
        </div>
      ))}
      <div className="flex-grow h-px bg-gray-300 mx-2"></div>
    </div>
  );
};

export default TripProgress;
