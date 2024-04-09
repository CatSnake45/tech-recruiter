let tempJobsArr = [false];
let counter = 1;

// PB: replaced isDone parameter with count; isDone does not appear to be used
const fetchData = async (city, state, jobType, count) => {
  counter += 6;
  console.log('city, state, jobtype, count', city, state, jobType, count);
  await fetch('http://localhost:3001/')
    .then((response) => {
      console.log('response in fetch of fetchdata', response);
      if (!response.ok) {
        throw new Error('Error fetching data!');
      }
      return response.json();
    })
    .then((jobs) => {
      console.log('jobs', jobs);
      for (let i = counter - 6; i < counter; i++) {
        console.log('in for loop');
        console.log('i', i);
        console.log('jobs.data at index', jobs.results[i]);
        if (jobs.results[i] !== undefined) {
          tempJobsArr.push(jobs.results[i]);
        } else {
          tempJobsArr[0] = 'true';
        }
        console.log('tempJobsArr', tempJobsArr);
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
