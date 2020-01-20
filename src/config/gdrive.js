const fs = require("fs");
const {google} = require('googleapis');

/**
 * Envia um arquivo ao google drive via api
 * @param {string} fileName nome do arquivo a ser salvo
 * @param {string} filePath caminho da imagem a ser enviada
 * @param {function} callback retorno do id da chamada realizada 
 */
function imageUpload(fileName, filePath, callback){
    require("./gdrive-auth")((auth) => {
        const fileMetadata = {
            name: fileName
        };
 
        const media = {
            mimeType: "image/jpeg",
            body: fs.createReadStream(filePath)
        }
        
        const drive = google.drive({version: 'v3', auth});
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
          }, function (err, file) {
            if (err) {
              // Handle error
              console.error(err);
            } else {
              callback(file.data.id);
            }
          });
    });
}

function deleteFile(fileId, callback) {
  require("./gdrive-auth")((auth) => {
    const drive = google.drive({version: 'v3', auth});
    drive.files.delete({
      fileId: fileId,
    }, function (err, res) {
      if (err) return console.log(err);
      callback(res);
    })
  });
}

function listFiles(callback) {
  require("./gdrive-auth")((auth) => {
    const drive = google.drive({ version: 'v3', auth });
    drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name, thumbnailLink)',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;
      if(files.length){
        callback(files);
      } else {
        console.log('No files found.');
      }
    });
  });
}
/**
 * 
 * @param {*} fileId 
 * @param {function} callback retorna o arquivo da chamada efetuada
 */
function getFile(fileId, callback) {
  require("./gdrive-auth")((auth) => {
    const drive = google.drive({ version: 'v3', auth });
    drive.files.get({ fileId: fileId, fields: 'id, name, thumbnailLink' }, (err, res) => {
      if(err) return console.log('The API returned an error: ' + err);
      const file = res.data;
      callback(file);
    })
  });
}
 
module.exports = { imageUpload, listFiles, getFile, deleteFile };
