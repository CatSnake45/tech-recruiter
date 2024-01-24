import React, { useState, useEffect } from 'react';
import Job from './Job';

const JobDisplay = ({ jobCards }) => {
  const cards = [];
  console.log('job cards', jobCards);
  if (jobCards) {
    for (let i = 0; i < jobCards.length; i++) {
      cards.push(<Job jobCards={jobCards} data={jobCards[i]} />);
    }
  }

  return <div className='job-post-container'>{cards}</div>;
};

export default JobDisplay;
