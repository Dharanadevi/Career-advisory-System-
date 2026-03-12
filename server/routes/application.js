const express = require('express');
const router = express.Router();
const { handleJobApplication, getMyApplications } = require('../controllers/applicationController');

// POST route for applying
router.post('/apply', handleJobApplication);

// GET route for viewing history
// The :email is a dynamic parameter
router.get('/my-applications/:email', getMyApplications);

module.exports = router;