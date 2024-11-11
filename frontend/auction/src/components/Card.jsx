import React, { useState } from 'react';
import axios from 'axios';

function ProductCard({ product, userId }) { // Receive userId as a prop
  const [showModal, setShowModal] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [currentBid, setCurrentBid] = useState(product.currentBid); // Add state to track the current bid

  // Construct the full image URL
  const imageUrl = `http://localhost:7000/${product.image}`;

  const handleBidClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBidSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:7000/api/products/${product._id}/bid`, { bidAmount, userId });
      console.log(response.data);
      setCurrentBid(bidAmount); // Update the current bid state
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting bid:', error);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 transform transition duration-500 hover:scale-105 hover:shadow-xl">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={product.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">{product.name}</div>
        <p className="text-gray-700 text-base mb-2">
          Min Ask Price: {product.startingBid}
        </p>
        <p className="text-gray-700 text-base mb-2">
          Max Current Bid: {currentBid} {/* Use currentBid state */}
        </p>
        <p className="text-gray-700 text-base">
          Deadline: {new Date(product.deadline).toLocaleString()}
        </p>
        <button 
          onClick={handleBidClick}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Make a Bid
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Place Your Bid</h3>
              <div className="mt-2">
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mt-4">
                <button 
                  onClick={handleBidSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  Submit Bid
                </button>
                <button 
                  onClick={handleCloseModal}
                  className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
