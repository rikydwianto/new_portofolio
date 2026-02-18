const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

const authController = require('../controllers/admin/authController');
const dashboardController = require('../controllers/admin/dashboardController');
const projectController = require('../controllers/admin/projectController');
const categoryController = require('../controllers/admin/categoryController');
const timelineController = require('../controllers/admin/timelineController');
const visitorController = require('../controllers/admin/visitorController');
const settingController = require('../controllers/admin/settingController');

// Auth Routes
router.get('/login', authController.loginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Dashboard (Protected)
router.get('/dashboard', ensureAuthenticated, dashboardController.index);

// Project Routes
router.get('/projects', ensureAuthenticated, projectController.list);
router.get('/projects/create', ensureAuthenticated, projectController.createForm);
router.post('/projects', ensureAuthenticated, upload, projectController.store);
router.get('/projects/:id/edit', ensureAuthenticated, projectController.editForm);
router.put('/projects/:id', ensureAuthenticated, upload, projectController.update);
router.delete('/projects/:id', ensureAuthenticated, projectController.delete);

// Category Routes
router.get('/categories', ensureAuthenticated, categoryController.list);
router.get('/categories/create', ensureAuthenticated, categoryController.createForm);
router.post('/categories', ensureAuthenticated, categoryController.store);
router.get('/categories/:id/edit', ensureAuthenticated, categoryController.editForm);
router.put('/categories/:id', ensureAuthenticated, categoryController.update);
router.delete('/categories/:id', ensureAuthenticated, categoryController.delete);

// Timeline Routes
router.get('/timeline', ensureAuthenticated, timelineController.list);
router.get('/timeline/create', ensureAuthenticated, timelineController.createForm);
router.post('/timeline', ensureAuthenticated, timelineController.store);
router.get('/timeline/:id/edit', ensureAuthenticated, timelineController.editForm);
router.put('/timeline/:id', ensureAuthenticated, timelineController.update);
router.delete('/timeline/:id', ensureAuthenticated, timelineController.delete);

// Visitor Analytics Routes
router.get('/visitors', ensureAuthenticated, visitorController.index);
router.get('/visitors/logs', ensureAuthenticated, visitorController.logs);

// Settings Routes (Profile, Skills, Stats, Badges)
router.get('/settings/profile', ensureAuthenticated, settingController.profileForm);
router.post('/settings/profile', ensureAuthenticated, settingController.updateProfile);

router.get('/settings/skills', ensureAuthenticated, settingController.skillsList);
router.post('/settings/skills', ensureAuthenticated, settingController.storeSkill);
router.put('/settings/skills/:id', ensureAuthenticated, settingController.updateSkill);
router.delete('/settings/skills/:id', ensureAuthenticated, settingController.deleteSkill);

router.get('/settings/stats', ensureAuthenticated, settingController.statsList);
router.post('/settings/stats', ensureAuthenticated, settingController.storeStat);
router.put('/settings/stats/:id', ensureAuthenticated, settingController.updateStat);
router.delete('/settings/stats/:id', ensureAuthenticated, settingController.deleteStat);

router.get('/settings/badges', ensureAuthenticated, settingController.badgesList);
router.post('/settings/badges', ensureAuthenticated, settingController.storeBadge);
router.put('/settings/badges/:id', ensureAuthenticated, settingController.updateBadge);
router.delete('/settings/badges/:id', ensureAuthenticated, settingController.deleteBadge);

module.exports = router;
