const fileRoutes = (app, fs) =>{
    const path = require('path');

    app.post('/files', (req, res) => {
        const file = req.files.imageFile;
        const fileName = req.files.imageFile.name;
        console.log(fileName);
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
    })

};

module.exports = fileRoutes;