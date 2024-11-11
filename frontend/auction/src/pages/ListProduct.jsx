import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ListProduct() {
  const navigate = useNavigate(); // Correctly invoking useNavigate
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startingBid: '',
    image: null,
    deadline: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        data.append(key, formData[key]);
      }
    }
    data.append('listedBy', userId); // Include the user ID

    try {
      const response = await axios.post('http://localhost:7000/api/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product listed:', response.data);
      navigate('/');
    } catch (error) {
      console.error('There was an error listing the product:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">List a Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <input
            type="number"
            name="startingBid"
            placeholder="Starting Bid"
            value={formData.startingBid}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <input
            type="datetime-local"
            name="deadline"
            placeholder="Deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
          >
            List Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default ListProduct;
