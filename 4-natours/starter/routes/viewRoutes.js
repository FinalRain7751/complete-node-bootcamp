const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewsController');
const authcontroller = require('../controllers/authController');

// router.get('/', (req, res) => {
//   res.status(200).render('base', {
//     tour: 'The Forest Hiker',
//     user: 'Jonas',
//   });
// });

router.get('/', viewController.getOverview);
router.get('/tour/:slug', authcontroller.protect, viewController.getTour);
router.get('/login', viewController.getLoginForm);

module.exports = router;
