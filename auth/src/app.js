const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.routes.js');
const passport = require('passport');
const {Strategy:GoogleStrategy}  = require('passport-google-oauth20');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Here, you would typically find or create a user in your database
  // For this example, we'll just return the profile
  return done(null, profile);
}));
app.get('/', (req, res) => {
    res.send('Authentication Service is running');
});


app.use('/api/auth', authRouter);




module.exports = app;