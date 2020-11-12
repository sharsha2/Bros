//link to express package
var express = require('express');
//instances new express route to handle http requests.
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bro\'s Shoppy ' });
});

/* GET Men page. */
router.get('/men' ,(req, res, next)=> {
    res.render('men', { title: 'Men\'s page' });
});

/* GET Women page. */
router.get('/women', (req, res, next) => {
    res.render('women', { title: 'Women\'s page' });
});

/* GET Kids page. */
router.get('/kids', (req, res, next) => {
    res.render('kids', { title: 'kid\'s page' });
});

/* GET Offers page. */
router.get('/offers', (req, res, next) => {
    res.render('offers', { title: 'Offer\'s page' });
});

/* GET Profile page. */
router.get('/profile', (req, res, next) => {
    res.render('profile', { title: 'Profile page' });
});

/* GET Wishlist page. */
router.get('/wishlist', (req, res, next) => {
    res.render('wishlist', { title: 'Wishlist page' });
});

/* GET Bag page. */
router.get('/bag', (req, res, next) => {
    res.render('bag', { title: 'Bag page' });
});
module.exports = router;
