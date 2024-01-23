const jobController = {};

jobController.getJobData = async (req, res, next) => {
  // const { keywords, city, page } = req.body;
  let page = 1;
  let what = 'Javascript Developer';
  let where = 'Boston';
  const url = `https://api.adzuna.com/v1/api/jobs/us/search/${page}?app_id=${process.env.API_APP_ID}&app_key=${process.env.API_KEY}&results_per_page=50&what=${what}&where=${where}`;
  //https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=d045d28c&app_key=9762edd919aa95b4dce07ea1e12c2639&results_per_page=200&what=Javascript%20Developer&where=Torrance
  //what = search term (like 'javascript developer' from our dropdown menu)
  //where = city/place //input.replace(' ','%20')
  //distance?
  //page (where it says /search/1?) (important when loading more jobs!)

  try {
    console.log(url);
    const response = await fetch(url, { method: 'GET' });
    //console.log(response);

    const result = await response.json();
    //console.log(result);
    res.locals.jobs = result;
    return next();
  } catch (error) {
    return next({
      log: `jobController.getJobData: Error: ${error}`,
      status: 500,
      message: { err: 'Error ocurred in jobController.getJobData.' },
    });
    // console.error(error);
  }
};

// console.log("hello");
// const getLocationData = (req, res) => {};
export default jobController;
