const userRoutes = (app, fs) => {

  // const readWrite = require("./readWrite");
  // variables
  const dataPath = './data/team.json';



// refactored helper methods

const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
  fs.readFile(filePath, encoding, (err, data) => {
    if(err){
      throw err;
    };

    //if true, parse the data to json
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



  // //read
  // app.get('/users', (req, res) => {
  //   fs.readFile(dataPath, 'utf8', (err, data) => {
  //     if (err){
  //       console.log(err);
  //     }
  //     res.send(JSON.parse(data));
  //   });
  // });

  app.post('/users', (req, res) => {

        readFile(data => {
            const newUserId = data.members.length;

            console.log(newUserId);
            // add the new user
            data.members[newUserId.toString()] = req.body;
            console.log(req.body);

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send("new user added");
            });

        },
            true);
    });

  // read
  app.get('/users', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if(err){
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

  //update
  app.put('/users/:id', (req, res) => {
    readFile(data => {

      //add the user
      const userId = req.params["id"];
      data.members[userId] = req.body
      console.log(req.body, data.members[userId]);

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`users id:${userId} updated`);
      });

    }, 
      true);
  });

};


module.exports = userRoutes;
