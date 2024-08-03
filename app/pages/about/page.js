import React from 'react';
import Navbar from '../../../components/Navbar'; // Adjust path as needed
import Footer from '../../../components/Footer'; // Adjust path as needed

export default function AboutPage() {
  return (
    <div className="bg-customGreen ">
      <Navbar />
      <main className="bg-customGreen  flex flex-col items-center">
        <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg mt-12 mb-12">
          <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">About Us</h1>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Welcome to our website! We are a team of passionate individuals committed to delivering the best experience for our users.
          </p>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Our mission is to provide innovative solutions and exceptional service. With a focus on quality and customer satisfaction, we strive to exceed expectations in everything we do.
          </p>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Founded in 2001, we have grown from a small startup into a leading provider in our industry. Our team is dedicated to continuous improvement and staying at the forefront of technology.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Thank you for visiting our site. We look forward to serving you and helping you achieve your goals. If you have any questions or feedback, please feel free to <a href="/pages/contact" className="text-blue-500 hover:underline">contact us</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
