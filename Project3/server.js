const express = require('express');
const { fetchRandomSwapiCards } = require('./swapiService');
const exphbs = require('express-handlebars');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const path = require('path');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const randomCardsRoutes = require('./controllers/api/randomCardsController');
const exp = require('constants');
// const favoritesRoutes = require('./controllers/api/favoritesRoutes');
// const favorite = require('./models/favorite');
// const { getfavorites, savefavorite } = require('./utils/helpers');
const PORT = process.env.PORT || 3005;
// const hbs = exphbs.create({ helpers });
const app = express();
// const router = express.Router();
app.use(session({
  secret: 'anykey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 500000, httpOnly: true, sameSite: 'strict' }, 
  store: new SequelizeStore({
    db: sequelize
  })
}));
// const authRoutes = require('./controllers/homeRoutes');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Other configurations and middleware
// app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
// Session middleware configuration
// app.use(initialize());
// app.use(session());
app.use(routes)
// Sync all models
sequelize.sync({force: false})
.then(() => {
    console.log(`Now listening on ${PORT}`);
  })
  .catch(err => {
    console.error('Unable to create tables, shutting down...', err);
    process.exit(1);
  });
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Render the login page
// router.get('/login', (req, res) => {
//   res.render('login'); // Ensure you have a login.handlebars or login.ejs file in your views directory
// });

// // Database connection
// const sequelize = new Sequelize(
  //   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//   }
// );

// // server.js
// const express = require('express');
// const { fetchRandomSwapiCards } = require('./swapiService');
// const exphbs = require('express-handlebars');
// const app = express();

// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
// // Other configurations and middleware

// app.get('/', (req, res) => {
//   const cards = [
//     { title: 'Card 1', description: 'Description for card 1' },
//     { title: 'Card 2', description: 'Description for card 2' },
//     // Add more cards as needed
//   ];

//   res.render('test', { loggedIn: false, body: '<p>Welcome to Random Cards!</p>', cards });
// });

app.get('/random-cards', async (req, res) => {
      const cards = await fetchRandomSwapiCards();
      res.render('random-cards', { cards });
});

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

  // app.use('/', authRoutes);
  // app.use('/random-cards', randomCardsRoutes);
  // app.use('/favorites', favoritesRoutes);
  
  
  // // Define the route
  // app.post('/api/users', (req, res) => {
  //   // Handle user creation logic here
  //   const user = req.body;
  //   // Save user to database (this is just a placeholder)
  //   console.log('User created:', user);
  //   res.status(201).send({ message: 'User created successfully' });
  // });
  
  // // Define the profile route
  // passport.use(new LocalStrategy(
  //   function(username, password, done) {
  //     // Implement user authentication logic here
  //   }
  // ));
  
  // passport.serializeUser(function(user, done) {
  //   done(null, user.id);
  // });
  
  // passport.deserializeUser(function(id, done) {
  //   // Fetch user by ID
  // });
  
  // app.use('/api', randomCardsRoutes);
  
  // router.post('/favorites', (req, res) => {
  //   const { cardData } = req.body;
  
  //   if (!cardData) {
  //     return res.status(400).send('Bad Request: Missing card data');
  //   }
  
  //   // Implement logic to save the favorite card data
  //   // For example, save to a database or in-memory store
  
  //   console.log('Favorite card data:', cardData);
  
  //   // Respond with success
  //   res.status(200).send('Favorite saved');
  // });
  
  // Other routes and server setup
  // app.use('/api', favoritesRoutes);