export function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-red-500 text-lg font-medium mb-2">
        Oops! Something went wrong
      </div>
      <div className="text-gray-600">
        {message || "Failed to load lesson content. Please try again later."}
      </div>
    </div>
  );
} 