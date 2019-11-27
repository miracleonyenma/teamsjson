const readWrite = (app, fs) => {

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

};

module.exports = readWrite;