const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');


const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);

//önce redirectmiddlewaresi ile kontrol et
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage);
//önce redirectmiddlewaresi ile kontrol et
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);

router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(pageController.senEmail);


module.exports = router;
