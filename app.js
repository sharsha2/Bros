var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');


//Ref for Auth
const passport = require('passport')
const session = require('express-session')
//const localStategy = require('passport-local').Strategy

var app = express();


//Database Connection - try to connect an log a pass/fail result!
const mongoose = require('mongoose')
const globals = require('./config/globals')
mongoose.connect(globals.db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        (res) => {
            console.log('Connection to MongoDB')
        }).catch(() => {
            console.log('Connection Error')
        })

//Passport Initialization
//1. Configure app to manage sessions
app.use(session({
    secret: 'TaskManagerSecret',
    resave: true,
    saveUninitialized: false
}))

//2.  Set up Passport
app.use(passport.initialize())
app.use(passport.session())

//3.  Link Passport to our User Model
const User = require('./models/user')
passport.use(User.createStrategy())

//4. Set up Passport to Read /Write user data to the session object
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//Google Auth
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(new GoogleStrategy({
    clientID: globals.ids.google.clientID,
    clientSecret: globals.ids.google.clientSecret,
    callbackURL: globals.ids.google.callbackURL
},
    (token, tokenSecret, profile, done) => {
        //do we already have a user document in Mongo for this profile?
        User.findOne({ oauthId: profile.id }, (err, user) => {
            if (err) {
                console.log(err) //error
            }
            if (!err && user != null) {
                //Google already exists in the MongoDB - just return the user object
                done(null, user)
            }
            else {
                //Google user IS new, register them in MongoDB users collection!
                user = new User({
                    oauthId: profile.id,
                    username: profile.displayName,
                    oauthProvider: 'Google',
                    created: Date.now()
                })
                user.save((err) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        done(null, user)
                    }
                })
            }
        })
    }
))

//Facebook Auth
const FacebookStrategy = require('passport-facebook').Strategy

passport.use(new FacebookStrategy({
    clientID: globals.ids.facebook.clientID,
    clientSecret: globals.ids.facebook.clientSecret,
    callbackURL: globals.ids.facebook.callbackURL
},
    (token, tokenSecret, profile, done) => {
        //do we already have a user document in Mongo for this profile?
        User.findOne({ oauthId: profile.id }, (err, user) => {
            if (err) {
                console.log(err) //error
            }
            if (!err && user != null) {
                //facebook already exists in the MongoDB - just return the user object
                done(null, user)
            }
            else {
                //facebook user IS new, register them in MongoDB users collection!
                user = new User({
                    oauthId: profile.id,
                    username: profile.displayName,
                    oauthProvider: 'facebook',
                    created: Date.now()
                })
                user.save((err) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        done(null, user)
                    }
                })
            }
        })
    }
))




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;