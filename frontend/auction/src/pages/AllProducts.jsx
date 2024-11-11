import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';

function AllProducts() {
  const { userId } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:7000/api/products', {
          params: { userId }
        });
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, [userId]);

  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen bg-gray-100 p-4">
      {products.map(product => (
        <div key={product._id} className="p-4">
          <Card product={product} userId={userId} />
        </div>
      ))}
    </div>
  );
}

export default AllProducts;
