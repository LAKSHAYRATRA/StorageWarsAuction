import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const NotificationsPage = () => {
  const { userId } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await axios.get(`http://localhost:7000/api/notifications/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }

    fetchNotifications();
  }, [userId]);

  const handlePayment = async (notification) => {
    try {
      const response = await axios.post('http://localhost:7000/api/payments', {
        userId,
        productId: notification.productId,
        amount: notification.amount, // Amount to be paid is available in the notification
      });
      alert('Payment successful! The product will be delivered in the next 7 days.');
      // Update the notification status
      setNotifications(notifications.map(n =>
        n._id === notification._id ? { ...n, hasPaid: true } : n
      ));
    } catch (error) {
      console.error('Error making payment:', error);
      alert('Payment failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="bg-gray-800 text-white w-full p-6 text-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
      </header>
      <main className="flex-grow w-full p-6">
        <h2 className="text-2xl font-semibold mb-4">Auction Notifications</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          {notifications.length === 0 ? (
            <p className="text-gray-700">No notifications available.</p>
          ) : (
            notifications.map((notification) => (
              <div key={notification._id} className="mb-4 p-4 border-b">
                <h3 className="text-xl font-bold">{notification.message}</h3>
                <p className="text-gray-700">Auction Date: {new Date(notification.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-700">Status: {notification.hasPaid ? 'Paid' : 'Unpaid'}</p>
                <p className="text-gray-700">Amount: {notification.amount}</p>
                {!notification.hasPaid && (
                  <button
                    className="bg-green-500 text-white px-4 py-2 mt-2 rounded shadow hover:bg-green-600 transition duration-300"
                    onClick={() => handlePayment(notification)}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </main>
      <footer className="bg-gray-800 text-white w-full p-6 text-center">
        <p>&copy; 2024 Storage Wars Auction System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default NotificationsPage;
