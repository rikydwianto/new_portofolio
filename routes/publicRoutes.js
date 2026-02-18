const express = require('express');
const router = express.Router();
const mainController = require('../controllers/public/mainController');

router.get('/', mainController.index);
router.get('/project/:slug', mainController.detail);
router.get('/cv/download', mainController.downloadCV);

module.exports = router;
