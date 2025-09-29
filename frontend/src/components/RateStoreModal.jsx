import React, { useState } from "react";
import api from "../api/axios";

const RateStoreModal = ({ storeId, onClose, onRatingSuccess }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRating = async () => {
    if (!rating) return alert("Please select a rating!");

    try {
      setLoading(true);

      let res = await api.post(`/ratings/${storeId}`, { rating });
      console.log(res);
      onRatingSuccess(storeId, rating);
      onClose();
    } catch (err) {
      console.log(err);
      alert("Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Rate this Store</h2>

        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((num) => {
            <button
              key={num}
              onClick={() => setRating(num)}
              className={`px-3 py-1 rounded ${
                rating === num ? "bg-yellow-400" : "bg-gray-200"
              }`}
            >
              ⭐ {num}
            </button>;
          })}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-gray-300 rounded"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleRating}
            className="px-4 py-1 bg-blue-500 text-white rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateStoreModal;
