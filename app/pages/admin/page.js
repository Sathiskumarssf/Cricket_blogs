"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import style from '../../../styles/Frontpage.module.css';
import Footer from '../../../components/Footer';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

function Page() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState("ALL");
  const [teamData, setTeamData] = useState([]);
  const teamsPerPage = 5;
  const [direction, setDirection] = useState('');
  const [selectedOption, setSelectedOption] = useState('about');
  const [search, setSearch] = useState('');
  const [editPlayerId, setEditPlayerId] = useState(null);
  const [editedPlayerData, setEditedPlayerData] = useState({});
  const router = useRouter();
  const [adminUsername, setAdminUsername] = useState('');

  const decodeUsername = (encodedUsername) => {
    return atob(encodedUsername); // Base64 decode username
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const encodedUsername = query.get('username'); // Extract encoded username from query parameters
    if (encodedUsername) {
      const decodedUsername = decodeUsername(encodedUsername);
      setAdminUsername(decodedUsername);
    }
  }, []);

  const teams = [
    'ALL', 'India', 'Sri Lanka', 'Australia', 'Pakistan',
    'Bangladesh', 'Nepal', 'South Africa', 'West Indies',
    'England'
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
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
      setStartIndex(prevStartIndex => Math.max(0, prevStartIndex - 1));
    }
  };

  const handleNext = () => {
    if (endIndex < teams.length) {
      setDirection('next');
      setStartIndex(prevStartIndex => Math.min(teams.length - teamsPerPage, prevStartIndex + 1));
    }
  };

  useEffect(() => {
    if (direction) {
      const timer = setTimeout(() => setDirection(''), 500);
      return () => clearTimeout(timer);
    }
  }, [direction]);

  const handleTeamClick = async (teamName, option, search = '') => {
    setSelectedTeam(teamName);

    try {
      const response = await fetch('http://localhost:3000/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamName, option, search }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch team data for ${teamName}`);
      }

      const data = await response.json();
      setTeamData(data);
    } catch (error) {
      console.error('Error fetching team data:', error);
    }
  };

  const handleSearchChange = (event) => {
    const newSearched = event.target.value;
    setSearch(newSearched);
    handleTeamClick(selectedTeam, selectedOption, newSearched);
  };

  const handleSelectChange = (event) => {
    const newSelectedOption = event.target.value;
    setSelectedOption(newSelectedOption);
    handleTeamClick(selectedTeam, newSelectedOption);
  };

  useEffect(() => {
    if (selectedTeam !== 'ALL') {
      handleTeamClick(selectedTeam, selectedOption);
    }
  }, [selectedTeam, selectedOption]);

  const handleEditClick = (player) => {
    setEditPlayerId(player.id); // Set the player ID
    setEditedPlayerData({
      ...player
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedPlayerData({
      ...editedPlayerData,
      [name]: value
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/updatePlayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: editPlayerId, ...editedPlayerData }), // Include player ID
      });

      if (!response.ok) {
        throw new Error('Failed to update player data');
      }

      const data = await response.json();
      if (data.success) {
        alert('Player updated successfully');
        setEditPlayerId(null);
        setEditedPlayerData({});
        handleTeamClick(selectedTeam, selectedOption); // Refresh player data
      }
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ backgroundColor: 'rgb(222, 249, 196)' }}>
      <Navbar />
      <div className="flex justify-center sticky top-0 z-10">
        <div className={`${style.itermdiv} w-11/12 rounded-lg flex items-center justify-between`}>
          <button
            onClick={handlePrevious}
            disabled={startIndex === 0}
            className="text-black hover:text-white hover:bg-gray-700 p-2 rounded-full"
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
                  className={`${style.itermname} text-lg w-20 cursor-pointer ${selectedTeam === team ? style.selected : ''}`}
                  onClick={() => handleTeamClick(team, selectedOption)}
                >
                  {team}
                </a>
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="text-black hover:text-white hover:bg-gray-700 p-2 rounded-full"
            disabled={endIndex >= teams.length}
            aria-label="Next"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <main className="pt-4 pl-24 ">
        {selectedTeam !== "ALL" && (
          <div className="flex items-center mb-4">
            <div className="relative w-64">
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="about">About</option>
                <option value="players">Players</option>
                <option value="trophies">Trophies</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </div>
            {selectedOption === "players" && (
              <div className="relative ml-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={handleSearchChange}
                  className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            )}
          </div>
        )}
        {selectedTeam !== "ALL" ? (
          <div className='w-11/12 pt-5 '>
            {selectedOption === "players" && (
              <div className={style.playerscontainer}>
                {teamData.map((item) => (
                  <div className={style.player} key={item.id}>
                    <img
                      src={item.imageUrl}
                      alt={item.playerName}
                      className={style.player_image}
                    />
                    <p className='flex'><strong>Player:</strong> <input className='w-34' name='playerName' value={editPlayerId === item.id ? (editedPlayerData.playerName || item.playerName) : item.playerName} onChange={handleInputChange} placeholder={item.playerName}/></p>
                    <p className='flex'><strong>Role:</strong><input className='w-34' name='role' value={editPlayerId === item.id ? (editedPlayerData.role || item.role) : item.role} onChange={handleInputChange} placeholder={item.role}/></p>
                    {item.role === 'Fast Bowler' && (
                      <p><strong>Bowling Average:</strong><input className='w-34' name='bowlingAverage' value={editPlayerId === item.id ? (editedPlayerData.bowlingAverage || item.bowlingAverage) : item.bowlingAverage} onChange={handleInputChange} placeholder={item.bowlingAverage}/></p>
                    )}
                    {item.role === 'Batsman' && (
                      <p className='flex m-4'><strong>Batting Average:</strong> <input className='w-14' name='battingAverage' value={editPlayerId === item.id ? (editedPlayerData.battingAverage || item.battingAverage) : item.battingAverage} onChange={handleInputChange} placeholder={item.battingAverage}/></p>
                    )}
                    {item.role === 'Wicketkeeper-Batsman' && (
                      <p className='flex'><strong>Batting Average:</strong> <input className='w-14' name='battingAverage' value={editPlayerId === item.id ? (editedPlayerData.battingAverage || item.battingAverage) : item.battingAverage} onChange={handleInputChange} placeholder={item.battingAverage}/></p>
                    )}
                    {item.role === 'All-Rounder' && (
                      <>
                        <p className='flex'><strong>Batting Average:</strong> <input className='w-14' name='battingAverage' value={editPlayerId === item.id ? (editedPlayerData.battingAverage || item.battingAverage) : item.battingAverage} onChange={handleInputChange} placeholder={item.battingAverage}/></p>
                        <p className='flex'><strong>Bowling Average:</strong><input className='w-14' name='bowlingAverage' value={editPlayerId === item.id ? (editedPlayerData.bowlingAverage || item.bowlingAverage) : item.bowlingAverage} onChange={handleInputChange} placeholder={item.bowlingAverage}/></p>
                      </>
                    )}
                    {item.hundreds > 0 && (
                      <p className='flex'><strong>Hundreds:</strong><input className='w-14' name='hundreds' value={editPlayerId === item.id ? (editedPlayerData.hundreds || item.hundreds) : item.hundreds} onChange={handleInputChange} placeholder={item.hundreds}/></p>
                    )}
                    {item.wickets > 0 && (
                      <p className='flex'><strong>Wickets:</strong><input className='w-14' name='wickets' value={editPlayerId === item.id ? (editedPlayerData.wickets || item.wickets) : item.wickets} onChange={handleInputChange} placeholder={item.wickets}/></p>
                    )}
                    <p className='flex'><strong>About:</strong> <input className='w-14' name='description' value={editPlayerId === item.id ? (editedPlayerData.description || item.description) : item.description} onChange={handleInputChange} placeholder={item.description}/></p>
                    
                    <button onClick={handleUpdate}>Update</button>
                  </div>
                ))}
              </div>
            )}
            {selectedOption === "about" && (
              <div className={`${style.aboutContainer} team-about mb-4 p-4 rounded-lg align-middle shadow-sm`}>
                {teamData.map((item, index) => (
                  <div key={index}>
                    <h2 className={`${style.cricketTeam} text-center text-black`}>{item.teamName}</h2>
                    <h1 className={`${style.crickerBoardHeading} text-center`}>Cricket Board: {item.governingBody}</h1>
                    <img
                      src={item.background}
                      alt={item.background}
                      className={style.cover_background}
                    />
                    <h1 className={`${style.cricket_team_about} ml-14`}><strong>Formats:</strong> {item.formats?.join(', ') || 'N/A'}</h1>
                    <div className={`${style.cricket_team_about} ml-14`}>
                      <h3 className="font-semibold">Achievements:</h3>
                      <ul className="list-none">
                        <li className={`${style.cricket_team_about}`}>
                          <strong>ICC Cricket World Cup:</strong> {item.achievements?.ICC_Cricket_World_Cup?.join(', ') || 'N/A'}
                        </li>
                        <li className={`${style.cricket_team_about}`}>
                          <strong>ICC Champions Trophy:</strong> {item.achievements?.ICC_Champions_Trophy?.join(', ') || 'N/A'}
                        </li>
                      </ul>
                    </div>
                    <div className={`${style.cricket_team_about}`}>
                      <h1 className={`${style.cricket_team_about} ml-14`}><strong>Legendary Players:</strong> {item.legendaryPlayers?.join(', ') || 'N/A'}</h1>
                    </div>
                    <h1 className={`${style.cricket_team_about} ml-14`}><strong>League:</strong> {item.league || 'N/A'}</h1>
                    <h1 className={`${style.cricket_team_about} ml-14`}><strong>Fan Base:</strong> {item.fanBase || 'N/A'}</h1>
                    <h1 className={`${style.cricket_team_about} ml-14`}><strong>Cultural Significance:</strong> {item.culturalSignificance || 'N/A'}</h1>
                    <h1 className={`${style.cricket_team_about} ml-14`}><strong>Details:</strong> {item.details || 'N/A'}</h1>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <h1 className='text-green-500 font-normal text-xl'>Welcome Dear {adminUsername}</h1>
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

export default Page;
