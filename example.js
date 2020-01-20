import { google } from "googleapis";

function listFiles(auth) {
    const drive = google.drive({ version: 'v3', auth });
    getList(drive, '');
}
function getList(drive, pageToken) {
    drive.files.list({
        corpora: 'user',
        pageSize: 10,
        q: "name=alessandro.jpg",
        pageToken: pageToken ? pageToken : '',
        fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
        if(err) return console.log('The API returned an error: ' + err);
        const files =  res.data.files;

        if(files.length) {
            console.log('Files:');
            processList(files);
            if(res.data.nextPageToken) {
                getList(drive, res.data.nextPageToken);
            }
        } else {
            console.log('No files found');
        }
    })
}

function processList(files) {
    console.log('Processing.......');
    files.forEach(file => {
        console.log(file);
    });
}

function uploadFile(auth) {
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

function getFile(auth, fileId) {
    const drive = google.drive({ version: 'v3', auth });
    drive.files.get({ fileId: fileId, fields: '*'}, (err, res) => {
        console.log(res.data);
    })
}