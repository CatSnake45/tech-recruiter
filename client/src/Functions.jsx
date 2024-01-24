let tempJobsArr = [false];
let counter = 1;

// PB: replaced isDone parameter with count; isDone does not appear to be used
const fetchData = async (city, state, jobType, count) => {
  counter += 6;
  await fetch('http://localhost:3000/')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error fetching data!');
      }
      return response.json();
    })
    .then((jobs) => {
      for (let i = counter - 6; i < counter; i++) {
        if (jobs.data[i] !== undefined) {
          tempJobsArr.push(jobs.data[i]);
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
