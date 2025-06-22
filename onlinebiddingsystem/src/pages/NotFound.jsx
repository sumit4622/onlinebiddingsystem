
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
        <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
          <button
            onClick={() => window.history.back()}
            class="btn btn-light d-inline-flex align-items-center px-4 py-3 text-dark"
          >
            <svg class="me-2" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;