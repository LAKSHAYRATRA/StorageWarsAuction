import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddFunds = () => {
  const { userId } = useAuth();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddFunds = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.patch(`http://localhost:7000/api/users/${userId}/addFunds`, { amount });
      navigate('/profile'); // Redirect back to profile page after adding funds
    } catch (error) {
      console.error('Error adding funds:', error);
      setError('Error adding funds.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Funds</h2>
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}
        <input
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setError('');
          }}
          placeholder="Enter amount"
          className="border rounded p-2 w-full mb-4"
        />
        <button
          onClick={handleAddFunds}
          className={`bg-blue-500 text-white p-2 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Add Funds'}
        </button>
        <div className="mt-6 text-center">
          <p className="text-gray-700 mb-4">Scan the QR code below to make a payment</p>
          <img src="path-to-your-qr-code.png" alt="Payment QR Code" className="w-48 h-48 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default AddFunds;
