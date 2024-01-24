import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import fetchData from './Functions';
import Login from './components/loginPage/Login';
import HomePage from './HomePage';
import './App.css';
import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';

let showSeeMore = null;
let fetched = false;

const App = () => {
  const user = useSelector((state) => state.user);
  console.log('user', user);
  console.log('--------------', user);
  // let startCity = user.city
  // console.log(startCity)
  const [jobType, setJobType] = useState('Python developer');
  const [city, setCity] = useState('');
  const [jobCards, updateCards] = useState([]);
  // PB: Added a piece of state to keep track of searches
  const [searchCount, updateSearchCount] = useState(0);

  // create two variables to hold city and state, then pass as props
  let state;
  let newCity;

  //search function, when user submits, it iniatites a fetch request, and appends data to the job cards array. Then updates state of cards array
  const getSearch = async (e) => {
    const cityArr = city.split(', ');
    state = cityArr[1];
    newCity = cityArr[0];

    // PB: When getSearch is called, set searchCount variable to 1
    updateSearchCount(1);

    showSeeMore = (
      <button
        className='see-more-button'
        type='submit'
        onClick={async (e) => await updateCount(e)}
      >
        Click for more jobs
      </button>
    );

    // PB: variable for search count
    let count = searchCount;
    const newData = await fetchData(newCity, state, jobType, count);

    // this is why all new data is added to existing old data. instead, just set existing state to newData
    //  const updatedData = jobCards.concat(newData);
    const updatedData = newData;
    updateCards(updatedData);
  };

  //function to set the city to user input , and change job type state
  const updateCity = (e) => {
    setCity(e.target.value);
  };

  //what is showSeeMore meant to do?? Seems like it fetches data, updates state, and returns showSeeMore? Maybe 0th index is not relevant
  const updateCount = async (e) => {
    console.log('-------clicked---------');

    // PB: Update searchCount on state by 1
    updateSearchCount(searchCount + 1);

    let count = searchCount;
    const newData = await fetchData(newCity, state, jobType, count);

    updateCards(newData);
    let done = newData[0];
    if (done === 'true') {
      showSeeMore = null;
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
              user = {user}
              jobCards={jobCards}
              getSearch={getSearch}
              // setCards = {setCards}
              setJob={setJob}
              newCity={newCity}
              state={state}
              city={city}
              updateCity={updateCity}
              showSeeMore={showSeeMore}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
