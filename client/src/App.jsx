import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import fetchData from './Functions';
import Login from './components/loginPage/Login';
import HomePage from './HomePage';
import './App.css';
import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';

let showSeeMore = false;
let fetched = false;
let counter = 0;
let state;
let newCity;

const App = () => {
  const user = useSelector((state) => state.user);
  console.log('user', user);
  console.log('--------------', user);
  // let startCity = user.city
  // console.log(startCity)
  const [jobType, setJobType] = useState('Python developer');
  const [city, setCity] = useState('');
  const [jobCards, updateCards] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  // PB: Added a piece of state to keep track of searches
  const [searchCount, updateSearchCount] = useState(0);

  // create two variables to hold city and state, then pass as props

  //search function, when user submits, it iniatites a fetch request, and appends data to the job cards array. Then updates state of cards array
  const getSearch = async (e) => {
    console.log('getSearch!');
    const location = city;
    updateCards([]);

    // PB: When getSearch is called, set searchCount variable to 1
    // await updateSearchCount(1);
    counter = 1;
    console.log('App.jsx line 37:', counter);

    // PB: variable for search count
    // let count = searchCount;
    const { done, jobsArray } = await fetchData(city, jobType, counter);
    console.log('jobsArray line 45:', jobsArray);

    // figure out why only 9 of these 10 jobCards get rendered

    // this is why all new data is added to existing old data. instead, just set existing state to newData
    //  const updatedData = jobCards.concat(newData);
    updateCards(jobsArray);
    showSeeMore = true;
    setSeeMore(true);
  };

  //function to set the city to user input , and change job type state
  const updateCity = (e) => {
    setCity(e.target.value);
  };

  //what is showSeeMore meant to do?? Seems like it fetches data, updates state, and returns showSeeMore? Maybe 0th index is not relevant
  const updateCount = async (e) => {
    // PB: Update searchCount on state by 1
    // await updateSearchCount(searchCount + 1);
    counter++;
    console.log('clicked updateCount, counter:', counter);
    // let count = searchCount;
    console.log(
      `city: ${city}, state: ${state}, jobType: ${jobType}, counter: ${counter}`
    );
    let { done, jobsArray } = await fetchData(city, jobType, counter);
    console.log('App.jsx jobsArray:', jobsArray);
    //for(let i = 1; i < newData.length; i++){}
    updateCards([...jobCards, ...jobsArray]);

    if (done === true) {
      setSeeMore(false);
      showSeeMore = false;
      counter = 0;
    }
  };

  //set job value upon user input
  const setJob = (e) => {
    setJobType(e.target.value);
  };

  //logic: if not logged in, render log in page, else show home page
  //passes down state of job, city, state, cards, and searchhttp://localhost:3000/

  return (
    <div className='app-bg'>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='/home'
          element={
            <HomePage
              user={user}
              jobCards={jobCards}
              getSearch={getSearch}
              // setCards = {setCards}
              setJob={setJob}
              newCity={newCity}
              state={state}
              city={city}
              updateCity={updateCity}
              showSeeMore={seeMore}
              seeMoreJobs={updateCount}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
