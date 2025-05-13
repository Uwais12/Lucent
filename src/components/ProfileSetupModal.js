"use client";
import { useState } from "react";
import Dialog from "./Dialog"; // Assuming Dialog is in the same directory
import { toast } from "react-hot-toast";

export default function ProfileSetupModal({ isOpen, onClose, currentUsername, currentCompanyName, currentOccupation }) {  const [username, setUsername] = useState(currentUsername || "");  const [companyName, setCompanyName] = useState(currentCompanyName || "");  const [occupation, setOccupation] = useState(currentOccupation || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            username: username.trim(), 
            companyName: companyName.trim(), 
            occupation: occupation.trim() 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Profile updated successfully!");
        onClose(data.user); // Pass updated user data back if needed
      } else {
        setError(data.error || "Failed to update profile.");
        toast.error(data.error || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Profile setup error:", err);
      const errorMessage = "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If the modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog isOpen={isOpen} onClose={() => !isSubmitting && onClose()} title="Complete Your Profile">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <p className="text-sm text-gray-600">
          Please provide a username to continue. Workplace and occupation are optional but help us personalize your experience.
        </p>
        
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            Work Place (Company Name)
          </label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
            Occupation
          </label>
          <input
            type="text"
            name="occupation"
            id="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
            disabled={isSubmitting}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end pt-4 space-x-3">
          <button
            type="submit"
            disabled={isSubmitting || !username.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-violet-600 border border-transparent rounded-md shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save and Continue"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
 