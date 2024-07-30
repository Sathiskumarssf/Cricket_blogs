"use client";
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import style from '../styles/Frontpage.module.css';
import Footer from '../components/Footer';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'; // Import icons

function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState("ALL"); // State for selected team
  const teamsPerPage = 5;
  const [direction, setDirection] = useState(''); // For animation direction

  const teams = [
    'ALL', 'INDIA', 'Sri Lanka', 'Australia', 'Pakistan',
    'Bangladesh', 'Nepal', 'New Zealand', 'South Africa', 'West Indies',
    'England' 
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts'); // Correct API path
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, []);

  const endIndex = Math.min(startIndex + teamsPerPage, teams.length);
  const displayedTeams = teams.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (startIndex > 0) {
      setDirection('prev');
      setStartIndex(prevStartIndex => Math.max(0, prevStartIndex - 1)); // Move one item at a time
    }
  };

  const handleNext = () => {
    if (endIndex < teams.length) {
      setDirection('next');
      setStartIndex(prevStartIndex => Math.min(teams.length - teamsPerPage, prevStartIndex + 1)); // Move one item at a time
    }
  };

  // Reset the direction state after rendering
  useEffect(() => {
    if (direction) {
      const timer = setTimeout(() => setDirection(''), 500); // 500ms to match CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [direction]);

  const handleTeamClick = (teamName) => {
    setSelectedTeam(teamName); // Set the selected team
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='bg-slate-50'>
      <Navbar />
      <div className="flex justify-center bg-slate-50 sticky top-0 z-10">
        <div className={`${style.itermdiv} bg-black w-11/12 rounded-lg flex items-center justify-between`}>
          <button
            onClick={handlePrevious}
            disabled={startIndex === 0}
            className="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-full"
            aria-label="Previous"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div className={`${style.teamsList} ${style[direction]}`}>
            {teams.map((team, index) => (
              <div
                key={`${team}-${index}`}
                className={`${style.teamItem} ${startIndex <= index && index < endIndex ? 'visible' : 'hidden'}`}
              >
                <a
                  className={`${style.itermname} text-lg w-20 cursor-pointer`}
                  onClick={() => handleTeamClick(team)}
                >
                  {team}
                </a>
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-full"
            disabled={endIndex >= teams.length}
            aria-label="Next"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <main className="p-4">
        {selectedTeam !== "ALL" ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">Details for {selectedTeam}</h1>
            {/* Display details of the selected team here */}
            <p>Details about {selectedTeam} go here.</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <ul className="list-disc pl-5">
              {posts.map((post, index) => (
                <li key={index} className="mb-2">
                  <strong>{post.title}:</strong> {post.description}
                </li>
              ))}
            </ul>
            <ul className="list-disc pl-5">
              {posts.map((post, index) => (
                <li key={index} className="mb-2">
                  <strong>{post.title}:</strong> {post.description}
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Posts;
