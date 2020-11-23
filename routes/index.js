//link to express package
var express = require('express');
//instances new express route to handle http requests.
var router = express.Router();

//ref for Auth
const passport = require('passport')
const User = require('../models/user')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Bro\'s Shoppy ',
        user: req.user
    });
});

/* GET Men page. */
router.get('/men', (req, res, next) => {
    res.render('men', {
        title: 'Men\'s page',
        user: req.user
    });
});

/* GET Women page. */
router.get('/women', (req, res, next) => {
    res.render('women', {
        title: 'Women\'s page',
        user: req.user
    });
});

/* GET Kids page. */
router.get('/kids', (req, res, next) => {
    res.render('kids', {
        title: 'kid\'s page',
        user: req.user
    });
});

/* GET Offers page. */
router.get('/offers', (req, res, next) => {
    res.render('offers', {
        title: 'Offer\'s page',
        user: req.user
    });
});

/* GET Profile page. */
router.get('/profile', (req, res, next) => {
    res.render('profile', {
        title: 'Profile page',
        user: req.user
    });
});

/* GET Wishlist page. */
router.get('/wishlist', (req, res, next) => {
    res.render('wishlist', {
        title: 'Wishlist page',
        user: req.user});
});

/* GET Bag page. */
router.get('/bag', (req, res, next) => {
    res.render('bag', {
        title: 'Bag page',
        user: req.user
    });
});

/* GET profile page. */
router.get('/profile', (req, res, next) => {
    res.render('profile', { title: 'profile page' });
});

//POST /profile
router.post('/profile', (req, res, next) => {
    //Use the User model with passport to try a new user
    //passport-local-mongoose will salt and has password
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err, user) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            //Log the User in and redirect to /tasks
            req.login(user, (err) => {
                res.redirect('/tasks')
            })
        }
    })
})



//GET/login
router.get('/login', (req, res, next) => {
    //Check for Invalid Login message and pass to the view to display
    let messages = req.session.messages || []

    //Clear the Session Message
    req.session.messages = []
    //Pass Local Message variable to the view for display
    res.render('login', {
        messages: messages
    })
})

//POST /Login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/tasks',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}))

//GET /Logout
router.get('/logout', (req, res, next) => {
    //Call passport built-in logout method
    req.logout()
    res.redirect('/login')
})

// GET / Google /
// Check if the User is already logged into/with Google, if not invoke then Google Signin
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}),
    (req, res) => { })

//Get / google/callback
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}),
    (req, res) => {
        res.redirect('/tasks')
    })

// GET / Facebook/
// Check if the User is already logged into/with Facebook, if not invoke then Facebook Signin
router.get('/facebook', passport.authenticate('facebook'),
    (req, res) => { }
)

//Get / facebook/callback
router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login'
}),
    (req, res) => {
        res.redirect('/tasks')
    })

module.exports = router;