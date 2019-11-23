// load up our shiny new route for users
const userRoutes = require('./users');

// load up our shiny new route for files
const fileRoutes = require('./files');


const appRouter =  (app, fs) => {
  // we've added in a default route here that handles empty routes
      // at the base API url

  app.get('/', (req, res) => {
    res.send('welcome')
  });

  // run our user route module here to complete the wire up
  userRoutes(app, fs);  

  // run our files route module here to complete the wire up
  fileRoutes(app, fs);  

};

module.exports = appRouter;
