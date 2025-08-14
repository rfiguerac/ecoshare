import React from 'react';

interface BannerCardProps {
  title: React.ReactNode;
  description: React.ReactNode;
  button1: React.ReactNode;
  button2?: React.ReactNode;
}

export const BannerCard = ({ title, description, button1, button2 }: BannerCardProps) => {
  return (
    <div className="mx-auto mt-10 p-12 w-full rounded-2xl text-center bg-gradient-to-r from-green-500 to-blue-600 shadow-lg">
      <h2 className="text-3xl md:text-4xllg:text-5xl font-bold tracking-tight text-white">
        {title}
      </h2>
      <p className="mt-4 text-md md:text-xl text-white max-w-2xl mx-auto">
        {description}
      </p>
      <div className="flex flex-col  sm:flex-row justify-center items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
        {button1}
        {button2}
      </div>
    </div>
  );
};