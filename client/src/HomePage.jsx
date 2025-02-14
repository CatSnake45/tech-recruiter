import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import JobDisplay from './components/JobDisplay';
// remove following line if redux not being implemented
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogout } from './state';
import fetchData from './Functions';

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
  seeMoreJobs,
}) => {
  // possibley unessecary if redux not being implemented
  const user = useSelector((state) => state.user);
  console.log('state', state);
  // const user = {
  //   userName: "Cyrus",
  //   city: "Boston",
  // };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { user, setUser } = useState(user);

  // useEffect(() => {
  //   console.log('in useEffect');
  //   const fetchDefaultJobs = async () => {
  //     try {
  //       const { done, jobsArray } = await fetchData(
  //         user.city,
  //         'Python developer',
  //         1
  //       );
  //     } catch (error) {
  //       console.error('Error fetching default jobs:', error);
  //     }
  //   };
  //   fetchDefaultJobs();
  //   console.log('result of fetching default', fetchDefaultJobs);
  // }, [user.city, setJob]);

  const handleClick = () => {
    navigate('/');
    dispatch(setLogout());
  };

  return (
    <div className='app-bg'>
      <div className='user-container'>
        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' />
        <button
          type='button'
          role='bigBtn'
          className='name-btn-container'
          class='btn-logout btn-outline-primary'
          onClick={handleClick}
        >
          Log Out
        </button>
      </div>
      <div className='homepage app-bg'>
        <div className='all-but-logout'>
          <img className='logo-image-blue' src='../assets/blue-logo.png' />
          <h1>Welcome to TechRecruiter </h1>
          <p className='homepage-p'>Filter by JOB and LOCATION</p>
          <p className='homepage-p'>
            <strong>Hi, {user.userName}!</strong> Fill out the fields to see
            jobs in your desired city
          </p>
          <div className='search-div'>
            <Search
              jobCards={jobCards}
              getSearch={getSearch}
              newCity={newCity}
              setJob={setJob}
              setListings={setListings}
              city={city}
              updateCity={updateCity}
            />
          </div>
        </div>
        <JobDisplay jobCards={jobCards} />
        {console.log(`showSeeMore: ${showSeeMore}`)}
        {showSeeMore && (
          <button
            className='see-more-button'
            type='submit'
            onClick={seeMoreJobs}
          >
            Click for more jobs
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
