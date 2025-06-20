import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl mx-auto">
        
        {/* 404 Number */}
        <h1 className="text-8xl md:text-9xl font-black text-gray-900 mb-8">
          404
        </h1>

        {/* Error message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Sorry, we can't find the page you're looking for.
          </p>
          <p className="text-lg text-gray-500">
            Click the button below to go back to the homepage
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </a>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;