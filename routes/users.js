const userRoutes = (app, fs) => {

  // variables
  const dataPath = './data/team.json';

  //read
  app.get('/users', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err){
        console.log(err);
      }
      res.send(JSON.parse(data));
    });
  });
};

module.exports = userRoutes;
