
// load up our shiny new route for users
const userRoutes = require('./users');

// load up our shiny new route for files
const fileRoutes = require('./files');


const appRouter =  (app, fs, path) => {
  // we've added in a default route here that handles empty and downlaod routes
      // at the base API url

  app.get('/', (req, res) => {
    res.send('welcome')
  });

  app.get('/download', (req, res)=>{
    // console.log("download")
    // const file = `${__dirname}` + `/../data/team.json`;
    // res.download(file);

    const downloadDir = path.join(`${__dirname}/../data`);
    console.log(downloadDir);

    fs.readdir(downloadDir, (err, files) => {
      if(err){
        console.log(err);
        res.writeHead(500, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ status: 'error', message: err }));
        return
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'        
      })
      res.end(JSON.stringify(files));
    })
  });

  app.get('/download/:id', (req, res) => {
    const file = `${__dirname}` + `/../data/${req.params["id"]}`;
    res.download(file);

  });

  // run our user route module here to complete the wire up
  userRoutes(app, fs, path);  

  // run our files route module here to complete the wire up
  fileRoutes(app, fs, path);  

};

module.exports = appRouter;
