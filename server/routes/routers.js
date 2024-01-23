const express = require('express');
const getJobData = require('../controllers/getJobData.js');
// import { getUserData } from "../controllers/getUserData.js";

const router = express.Router();

router.get('/', getJobData);
// router.get("/:id", getUserData);

module.exports = router;
