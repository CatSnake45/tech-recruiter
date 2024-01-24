import React from 'react';
import { useSelector } from 'react-redux';

const Search = ({ getSearch, setJob, city, updateCity }) => {
  const user = useSelector((state) => state.user);
  console.log('city in search', user.city);
  return (
    <div className='search-bar'>
      <select
        className='select-box'
        name='type'
        id='date-types'
        onChange={async (e) => await setJob(e)}
      >
        <option value='' disabled>
          Select Job Type
        </option>
        <option value='Python developer'>Python developer</option>
        <option value='Javascript developer'>Javascript developer</option>
        <option value='HTML/CSS'>HTML/CSS</option>
        <option value='Full Stack'>Full Stack</option>
        <option value='Mobile iOS'>Mobile iOS</option>
        <option value='Data Analyst'>Data Analyst</option>
        <option value='Software Developer'>Software Developer</option>
        <option value='Security'>Security</option>
        <option value='IT'>IT</option>
        <option value='Quality Assurance'>Quality Assurance</option>
        <option value='Network Engineer'>Network Engineer</option>
      </select>
      <input
        className='search-bar select-box'
        type='text'
        placeholder={user.city}
        onChange={async (e) => await updateCity(e)}
      />
      <button
        className='search-button'
        type='submit'
        onClick={async (e) => await getSearch(e)}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
