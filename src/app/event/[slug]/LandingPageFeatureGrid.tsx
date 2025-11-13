import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  step: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, step }) => {
  return (
    <div className="bg-white rounded-md p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 min-h-48 flex flex-col justify-between border border-black">
      <div className="justify-end">
        <span className="text-sm font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          Step {step}
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-center">
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
      description: "Set up your event in seconds. Edit anything as you go!",
      step: 1
    },
    {
      title: "Share Link",
      description: "Share your event URL with friends. Everyone has editing access.",
      step: 2
    },
    {
      title: "Add Items",
      description: "Categorize each item, add notes, and build item lists.",
      step: 3
    },
    {
      title: "Claim Items",
      description: "Call dibs! You can claim your added item and ones added by your friends.",
      step: 4
    }
  ];

  return (
    <div className="w-full max-w-md lg:max-w-2xl mx-auto py-12">
      <h2 className="font-rubik text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
        How It Works
      </h2>
      <h3 className="font-rubik text-md sm:text-lg md:text-xl text-gray-500 w-full text-center mb-6">
        DibsDash is a simple web app to coordinate and track event items with friends.
      </h3>
      <div className="grid grid-cols-2 gap-3">
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
