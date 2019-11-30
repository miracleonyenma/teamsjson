const fileRoutes = (app, fs) =>{
    const path = require('path');
    // const readWrite = require("./readWrite");
    // variables
    const dataPath = './data/team.json';
  
    
// refactored helper methods

const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
      if(err){
        console.log(err);
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




    app.post('/files', (req, res) => {

        readFile(data => {
            newUserId = data.members.length;
            console.log(newUserId);
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
                res.end(JSON.stringify({ status: 'success', path: filePath }))
            })
    
            return newUserId            
        }, true);



    });

      //update
    app.put('/files/:id', (req, res) => {
      readFile(data => {
        const userId = req.params["id"];
        console.log(userId);
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
            res.end(JSON.stringify({ status: 'success', path: filePath }))
        })

        // data.members[userId].img = filePath;

        // writeFile(JSON.stringify(data, null, 2), () => {
        //   // res.status(200).send(`users id:${userId} updated`);
        // });  

        return userId            
    }, true);
});


};

module.exports = fileRoutes;