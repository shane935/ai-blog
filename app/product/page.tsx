import React from "react";

export default () => {
  return (
    <>
      <h1 className="text-2xl mb-8">Product List</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="card shadow-md p-4">
          <h2 className="text-lg">Product 1</h2>
          <p>Volume: 100 ml</p>
          <p>Cost: $10</p>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <span>&lt;</span>
        </button>
        <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <span>&gt;</span>
        </button>
      </div>
    </>
  );
};
