const gdrive = require("./config/gdrive");
// gdrive.imageUpload("carro.jpg", "./carro.jpg", (id) => {
//     console.log(id);
// });

gdrive.listFiles((files) => {
    files.map((file) => {
        console.log(`[${file.name} (${file.id}) url:${file.thumbnailLink})]`);
    });
});

// gdrive.deleteFile('1R8XoanxVLsoaKUAFBaH4K_0YnVz2jbWW', (res) => {
//     console.log(res);
// });


