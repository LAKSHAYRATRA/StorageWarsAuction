import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userId } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get(`http://localhost:7000/api/users/${userId}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile data.');
      }
    }

    fetchProfile();
  }, [userId]);

  const handleAddFunds = () => {
    navigate('/add-funds');
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        <div className="space-y-4">
          <div>
            <strong>Name:</strong> {profile.name}
          </div>
          <div>
            <strong>Age:</strong> {profile.age}
          </div>
          <div>
            <strong>Gender:</strong> {profile.gender}
          </div>
          <div>
            <strong>Email:</strong> {profile.email}
          </div>
          <div>
            <strong>Phone:</strong> {profile.phone}
          </div>
          <div>
            <strong>Address:</strong> {profile.address}
          </div>
          <div>
            <strong>Current Balance:</strong> {profile.currentBalance}
          </div>
        </div>
        <div className="mt-6">
          <button onClick={handleAddFunds} className="bg-blue-500 text-white p-2 rounded w-full mt-2">
            Add Funds
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;