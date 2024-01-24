let tempJobsArr = [false];
let counter = 1;

// PB: replaced isDone parameter with count; isDone does not appear to be used
const fetchData = async (city, state, jobType, count) => {
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
      for (let i = 0; i < jobs.results.length; i++) {
        if (jobs.results[i] !== undefined) {
          tempJobsArr.push(jobs.results[i]);
        } else {
          tempJobsArr[0] = 'true';
        }
        // }
      }
      // console.log(tempJobsArr);
    })
    .catch((error) => {
      console.error(`Error in fetchData method: ${error}`);
    });
  return tempJobsArr;
};

export default fetchData;
