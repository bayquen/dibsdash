import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  step: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, step }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-48 flex flex-col justify-between">
      <div className="justify-end">
        <span className="text-sm font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          Step {step}
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-start mt-2">
        <h3 className="font-rubik text-xl font-bold text-gray-800 mb-3">
          {title}
        </h3>
        <p className="font-rubik text-md text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function FeatureGrid() {
  const features = [
    {
      title: "Create Event",
      description: "Set up your event in seconds.",
      step: 1
    },
    {
      title: "Share Link",
      description: "Start coordinating by sharing your event URL with friends.",
      step: 2
    },
    {
      title: "Add Items",
      description: "Categorize each item, add notes, and build item lists.",
      step: 3
    },
    {
      title: "Claim Items",
      description: "Claim any items by adding your name & remove claims as needed.",
      step: 4
    },
    {
      title: "Modify",
      description: "Edit anything any time. Anyone with your link can do so. (Admin access coming soon)",
      step: 5
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      <h2 className="font-rubik text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-6 mb-6">
        How It Works
      </h2>
      <h3 className="font-rubik text-md sm:text-lg md:text-xl text-gray-500 w-full text-center mb-8">
        DibsDash is a minimalist app to coordinate what to bring to your gathering. <br />
        Include items like food, drinks, decor & more. <br />
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            step={feature.step}
          />
        ))}
      </div>
    </div>
  );
}
