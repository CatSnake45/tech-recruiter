import React from 'react';
import Search from './components/Search';
import JobDisplay from './components/JobDisplay';
// remove following line if redux not being implemented
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HomePage = ({
  // props being drilled down from App.jsx
  getSearch,
  setListings,
  setJob,
  newCity,
  state,
  jobType,
  city,
  updateCity,
  jobCards,
  updateCount,
  showSeeMore,
}) => {
  // possibley unessecary if redux not being implemented
  const user = useSelector((state) => state.user);
  // const user = {
  //   userName: "Cyrus",
  //   city: "Boston",
  // };

  const handleClick = () => {};

  return (
    <div className='app-bg'>
      <div className='homepage app-bg'>
        <div className='user-container'>
          <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' />

          <p>
            <u>{user.userName}</u>
            <button>
              <Link to='/'>Log out</Link>
            </button>
          </p>
        </div>
        <img className='logo-image-blue' src='../assets/blue-logo.png' />
        <h1>Welcome to TechRecruiter </h1>
        <p className='homepage-p'>Filter by JOB and LOCATION</p>
        <p className='homepage-p'>
          <strong>Hi, {user.userName}!</strong> Fill out the fields to see jobs
          in {user.city}.
        </p>
        <div className='search-div'>
          <Search
            getSearch={getSearch}
            newCity={newCity}
            setJob={setJob}
            setListings={setListings}
            city={city}
            updateCity={updateCity}
          />
        </div>
        <JobDisplay jobCards={jobCards} />
        {showSeeMore}
      </div>
    </div>
  );
};

export default HomePage;
