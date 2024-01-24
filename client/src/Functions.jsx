// PB: replaced isDone parameter with count; isDone does not appear to be used
const fetchData = async (city, jobType, count) => {
  let done = false;
  const jobsArray = [];
  const reqBody = { where: city, what: jobType, page: count };

  await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reqBody),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error fetching data!');
      }
      return response.json();
    })
    .then((jobs) => {
      console.log('jobs.results:', jobs.results);
      for (let i = 0; i < 10; i++) {  
        console.log('jobs.results[i]:', jobs.results[i]);
        if (jobs.results[i] !== undefined) {
          jobsArray.push(jobs.results[i]);
        } else {
          console.log('this job is undefined');
          done = true;
        }
        // }
      }
      console.log('jobsArr:', jobsArray);
    })
    .catch((error) => {
      console.error(`Error in fetchData method: ${error}`);
    });
  return { done, jobsArray };
};

export default fetchData;
