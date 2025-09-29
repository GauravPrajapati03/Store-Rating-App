import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/UserNavbar";
import RateStoreModal from "../../components/RateStoreModal";
import { AuthContext } from "../../context/AuthContext";

const User = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await api.get("/stores");
        // console.log(res.data.stores.stores);
        setStores(res.data.stores.stores);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const handleRatingSuccess = (storeId, rating) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId ? { ...store, rating } : store
      )
    );
  };

  if (loading) return <p>Loading stores...</p>;

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Available Stores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stores.map((store, index) => (
            <div key={index} className="p-4 border rounded shadow">
              <h3 className="text-xl font-semibold">{store.name}</h3>
              <p>Owner: {store.ownerName}</p>
              <p>Rating: ⭐ {store.rating || "No ratings yet"}</p>
              <button
                onClick={() => setSelectedStore(store.id)}
                className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
              >
                Rate Store
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        {selectedStore && (
          <RateStoreModal
            storeId={selectedStore}
            onClose={() => setSelectedStore(null)}
            onRatingSuccess={() => {
              handleRatingSuccess;
            }}
          />
        )}
      </div>
    </div>
  );
};

export default User;
