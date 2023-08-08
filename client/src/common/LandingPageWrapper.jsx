import React from "react";

const LandingPageWrapper = ({ children }) => {
  return (
    <main className="w-full flex flex-col items-start justify-center pt-32 px-2 sm:px-6 lg:px-16 xl:px-24  gap-12 pb-20 ">
      {children}
    </main>
  );
};

export default LandingPageWrapper;
