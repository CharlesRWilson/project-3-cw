const express = require('express');
const { fetchRandomSwapiCards } = require('./swapiService');
const exphbs = require('express-handlebars');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const sequelize = require('./config/database');
const favorite = require('./models/favorite');
const { getfavorites, savefavorite } = require('./utils/helpers');
const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Other configurations and middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    // Implement user authentication logic here
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // Fetch user by ID
});

// Sync all models
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to create tables, shutting down...', err);
    process.exit(1);
  });

// Route to fetch random cards
app.get('/random-cards', async (req, res) => {
  const cards = await fetchRandomSwapiCards();
  res.render('random-cards', { cards });
});

// Route to get favorite cards
app.get('/favorites', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  const favorites = await getfavorites(req.user.id);
  res.render('favorites', { cards: favorites });
});

// Route to save a favorite card
app.post('/favorites', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorized');
  }
  await savefavorite(req.user.id, req.body.cardData);
  res.send('favorite saved');
});

// Other routes and server setup

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// // server.js
// const express = require('express');
// const { fetchRandomSwapiCards } = require('./swapiService');
// const exphbs = require('express-handlebars');
// const app = express();

// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
// // Other configurations and middleware

// app.get('/random-cards', async (req, res) => {
//     const cards = await fetchRandomSwapiCards();
//     res.render('random-cards', { cards });
// });

// // Other routes and server setup

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// const path = require('path');
// const express = require('express');
// const session = require('express-session');
// const exphbs = require('express-handlebars');
// const routes = require('./controllers');
// const helpers = require('./utils/helpers');

// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Set up Handlebars.js engine with custom helpers
// const hbs = exphbs.create({ helpers });

// const sess = {
//   secret: 'Super secret secret',
//   cookie: {
//     maxAge: 300000,
//     httpOnly: true,
//     secure: false,
//     sameSite: 'strict',
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.use(session(sess));

// // Inform Express.js on which template engine to use
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(routes);

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });
