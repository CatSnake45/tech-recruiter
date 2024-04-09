import React from 'react';
import { Grid } from '@mui/material';

export default function Job({ jobCards, data }) {
  console.log('jobCards', jobCards);
  const {
    company,
    job_title,
    description,
    location,
    job_posted_at_datetime_utc,
  } = data;

  return (
    <div className='job-container'>
      <div className='job-card'>
        <p className='job-title'>
          <strong>{job_title}</strong>
        </p>
        <ul className='jobDetailsList'>
          <li className='jobDetail'>Employer: {company.display_name}</li>
          <li className='jobDetail'>Location: {`${location.display_name}`}</li>
          <li className='jobDetail'>Posted At: {job_posted_at_datetime_utc}</li>
          <li className='jobDetail'>Description: {description}</li>
        </ul>
      </div>
    </div>
  );
}
