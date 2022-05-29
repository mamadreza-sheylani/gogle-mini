import React from "react";

const NotFound = ({ title }) => {
  return (
    <div className="text-center w-full ring-1 ring-red-600 py-5 rounded-xl">
      <p className="text-xl">No {title} Found</p>
      <p className="text-red-600 text-sm mt-3">This Might Be An Api Error</p>
    </div>
  );
};

export default NotFound;
