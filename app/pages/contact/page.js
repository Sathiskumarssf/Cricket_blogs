"use client";
import { useState } from 'react';
import Navbar from '../../../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, message }),
    });

    const data = await res.json();

    if (data.success) {
      setResponseMessage('Your message has been sent!');
      setEmail('');
      setMessage('');
    } else {
      setResponseMessage('There was an error sending your message.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-customGreen w-screen h-screen flex flex-col items-center">
      <div className="bg-customGreen w-screen h-screen flex flex-col items-center">
  <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg sm:mx-4 md:mx-8 lg:mx-16">
    <h1 className="text-2xl font-bold mb-4">Get in Touch</h1>
    <p className="text-gray-600 mb-6">
      Explore our <a href="#" className="text-blue-500">Help Docs</a> or contact our team.
    </p>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address*
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          What can we help with?*
        </label>
        <textarea
          id="message"
          rows="4"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="What can we help with?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600">
        Send
      </button>
    </form>
    {responseMessage && <p className="mt-4 text-center">{responseMessage}</p>}
    <div className="mt-8">
      <h1 className="text-lg font-bold mb-2">Our Details</h1>
      <div className="flex items-center mb-2">
        <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-700" />
        <a href="mailto:sathiskumarsk2001@gmail.com" className="text-blue-500">StringSport@gmail.com</a>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-700" />
        <a href="tel:075-8989432" className="text-blue-500">075-8989432</a>
      </div>
    </div>
  </div>
</div>

</div>

    </div>
  );
}
