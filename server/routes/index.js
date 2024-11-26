var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Survey' });
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET about me page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About me' });
});
/* GET Services page. */
router.get('/service', function(req, res, next) {
  res.render('index', { title: 'Services' });
});
/* GET Product page. */
router.get('/product', function(req, res, next) {
  res.render('index', { title: 'Products' });
});
/* GET Contact us page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact us' });
});
/* GET Contact us page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact us' });
});
module.exports = router;