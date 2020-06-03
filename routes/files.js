const fileRoutes = (app, fs) =>{
  const path = require('path');
  // const readWrite = require("./readWrite");
  // variables
  const dataPath = './data/team.json';
  
  
  const handleErr = (error) => {
    console.log(error)
  }

  // refactored helper methods

  const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
      fs.readFile(filePath, encoding, (err, data) => {
        if(err){
          handleErr(err);
        };

        
        callback(returnJson ? JSON.parse(data) : data);
      });
    };

  const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err, data) => {
      if(err){
        console.log(err);
      }

      callback();
    });
  };

  // const getFiles = (dir, next)=>{
  //   const filesDir = path.join(`${__dirname}/../${dir}`);
  //   console.log(filesDir);
  //   let filesList = [];

    // fs.readdir(path.join(`${__dirname}/../${dir}`), (err, files) => {
    //   if(err){
    //     console.log(err);
    //     // res.writeHead(500, {
    //     //   'Content-Type': 'application/json'
    //     // });
    //     // res.end(JSON.stringify({ status: 'error', message: err }));
    //     // return
    //   }
    //   // console.log(files)
    //   filesList =  files;
    //   return filesList;
    // });
    
  //   console.log(filesList)
  //   next(filesList);
  // };

  




  app.post('/files', (req, res) => {

      readFile(data => {
          newUserId = data.members.length;
          console.log(newUserId);

          if(req.files == null){
            console.log(req.files)
            res.writeHead(400, {
              'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({ status: 'error', message: `Files sent returned ${req.files}`, path : " " }));
            return

          } else{

            const file = req.files.imageFile;
          
            const fileNameArr = file.name.split(".");
            const fileName = `${newUserId}.${fileNameArr.slice(-1)[0]}`;
            console.log(fileName, newUserId);
            const filePath = path.join(__dirname, "../images/" + fileName);
            console.log(filePath);
            var newUserId;
  
            // const newUser = (id)=>{
            //     newUserId = id
            //     console.log(newUserId);
  
            // }
  
            file.mv(filePath, (err) => {
                if(err){
                    console.log(err)
                    res.writeHead(500, {
                        'Content-Type': 'application/json'
                    })
                    res.end(JSON.stringify({ status: 'error', message: err }));
                    return
                }
                res.writeHead(200, {
                    'Content-Type': 'application/json'        
                })
                res.end(JSON.stringify({ status: 'success', message : 'file added successfully', path: filePath }))
            })
  
            return newUserId            
  
          }

      }, true);



  });

    //update
  app.put('/files/:id', (req, res) => {
    readFile(data => {
      const userId = req.params["id"];
      console.log(userId);

      if(req.files == null){
        console.log(req.files)
        res.writeHead(400, {
          'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({ status: 'error', message: `Files sent returned ${req.files}`, path : " " }));
        return

      } else{

        const file = req.files.imageFile;
        const fileNameArr = file.name.split(".");
        const fileName = `${userId}.${fileNameArr.slice(-1)[0]}`;
        console.log(fileName, userId);
        const filePath = path.join(__dirname, "../images/" + fileName);
        console.log(filePath);

        file.mv(filePath, (err) => {
            if(err){
                console.log(err)
                res.writeHead(500, {
                    'Content-Type': 'application/json'
                })
                res.end(JSON.stringify({ status: 'error', message: err }));
                return
            }
            res.writeHead(200, {
                'Content-Type': 'application/json'        
            })
            res.end(JSON.stringify({ status: 'success', message : 'file added successfully', path: filePath }))
        })

        // data.members[userId].img = filePath;

        // writeFile(JSON.stringify(data, null, 2), () => {
        //   // res.status(200).send(`users id:${userId} updated`);
        // });  

      

      return userId            
      }
      
    }, true);
  });

  app.delete('/files/:id', (req, res) => {
    let fileId = `${req.params.id}`;
    let dir = "images";
    
    fs.readdir(path.join(`${__dirname}/../${dir}`), (err, files) => {
      if(err){
        console.log(err);
        // res.writeHead(500, {
        //   'Content-Type': 'application/json'
        // });
        // res.end(JSON.stringify({ status: 'error', message: err }));
        // return
      }
      console.log(files)
      let filesString = files.join(" ");
      
      console.log(filesString);
      let regExName = new RegExp(fileId, "i");
      console.log(regExName);

      let fileName = regExName.exec(filesString),
        file = fileName.input.substr(fileName.index, 5);

      console.log(file);

      fs.unlink(path.join(`${__dirname}/../${dir}/${file}`), (err) => {
        if (err){
          console.log(err)
          return
        }
        res.status(200).send(JSON.stringify({status : "success", message: `${file} deleted`}))
      });
      
    });

    
  });




};

module.exports = fileRoutes;