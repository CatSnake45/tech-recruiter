module.exports = getJobData = async (req, res) => {
  const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.API_APP_ID}&app_key=${process.env.API_KEY}&results_per_page=50&what=Javascript%20Developer&where=New%20York`;
  //https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=d045d28c&app_key=9762edd919aa95b4dce07ea1e12c2639&results_per_page=200&what=Javascript%20Developer&where=Torrance
  //what = search term (like 'javascript developer' from our dropdown menu)
  //where = city/place
  //distance?
  //page (where it says /search/1?) (important when loading more jobs!)

  const options = {
    method: 'GET',
    // headers: {
    //   "X-RapidAPI-Key": "7cd2420b17msh8fd6743e4bbd572p141a57jsn6e2c876f3416",
    //   "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    // },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
};

// console.log("hello");
// const getLocationData = (req, res) => {};
