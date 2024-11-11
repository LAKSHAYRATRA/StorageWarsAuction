import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center text-white">
      
      <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <section className="mb-8">
          <h2 className="text-5xl font-semibold mb-4">Discover Hidden Treasures</h2>
          <p className="mb-6 text-xl">Join the ultimate auction experience and find the best deals on storage units. Your next big discovery awaits!</p>
        </section>
        <section className="mb-8 w-full px-4">
          <h3 className="text-3xl font-semibold mb-4">How It Works</h3>
          <div className="flex flex-wrap justify-around">
            <div className="w-full md:w-1/3 p-4 bg-white text-black rounded-lg shadow-lg mb-4 md:mb-0">
              <h4 className="text-2xl font-bold">Register</h4>
              <p className="mt-2">Create an account to start bidding on storage units.</p>
            </div>
            <div className="w-full md:w-1/3 p-4 bg-white text-black rounded-lg shadow-lg mb-4 md:mb-0">
              <h4 className="text-2xl font-bold">Bid</h4>
              <p className="mt-2">Place your bids on available storage units and win amazing treasures.</p>
            </div>
            <div className="w-full md:w-1/3 p-4 bg-white text-black rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold">Win</h4>
              <p className="mt-2">If you have the highest bid, the storage unit is yours!</p>
            </div>
          </div>
        </section>
        <section className="w-full px-4">
          <h3 className="text-3xl font-semibold mb-4">Testimonials</h3>
          <div className="flex flex-wrap justify-around">
            <div className="w-full md:w-1/3 p-4 bg-white text-black rounded-lg shadow-lg mb-4 md:mb-0">
              <p className="italic">"I found incredible treasures through Storage Wars. Highly recommended!"</p>
              <p className="mt-2 font-bold">- Jane Doe</p>
            </div>
            <div className="w-full md:w-1/3 p-4 bg-white text-black rounded-lg shadow-lg">
              <p className="italic">"Bidding has never been this exciting. Great experience!"</p>
              <p className="mt-2 font-bold">- John Smith</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-black w-full p-6 text-center shadow-lg">
        <p>&copy; 2024 Storage Wars Auction System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
