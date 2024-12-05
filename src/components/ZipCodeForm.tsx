"use client";

import React from "react";

export default function ZipCodeForm({ userId }: { userId: string }) {
  const updateZipCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const zipCode = formData.get("zipCode") as string;

    try {
      const response = await fetch("/api/profile/update-zip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, zipCode }),
      });

      if (!response.ok) {
        throw new Error("Failed to update zip code");
      }

      alert("Zip code updated: " + zipCode);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update zip code");
    }
  };

  return (
    <form onSubmit={updateZipCode} className="mt-4">
      <label htmlFor="zipCode" className="block text-sm font-medium">
        Update Zip Code
      </label>
      <input
        type="text"
        id="zipCode"
        name="zipCode"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        required
      />
      <button
        type="submit"
        className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Update
      </button>
    </form>
  );
}
