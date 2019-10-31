const userRoutes = (app, fs) => {

  // variables
  const dataPath = './data/team.json';



  // //read
  // app.get('/users', (req, res) => {
  //   fs.readFile(dataPath, 'utf8', (err, data) => {
  //     if (err){
  //       console.log(err);
  //     }
  //     res.send(JSON.parse(data));
  //   });
  // });

// refactored helper methods

  const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
      if(err){
        throw err;
      };

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err, data) => {
      if(err){
        throw err;
      }

      callback();
    });
  };

  // read
  app.get('/users', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if(err){
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });
};

module.exports = userRoutes;
