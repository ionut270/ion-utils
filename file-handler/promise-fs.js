const fs = require("fs");

var fileExists = (dir) => new Promise((resolve, reject) =>{
    try {
        await fs.promises.stat(dir);
        resolve(true);
    } catch (err) {
        if (err.code === 'ENOENT') {
            resolve(false);
        }
    }
})

module.exports.fileExists = fileExists;

module.exports.makeDir = (dir) => new Promise(async (resolve, reject) =>{
    if(!await fileExists(dir)) fs.mkdir(dir, (err) =>{ 
        if(err) console.log(err);
        resolve()
    })
    else resolve()
});
module.exports.readDir = (dir) => new Promise(async (resolve, reject) =>{
    if(await fileExists(dir)) fs.readdir(dir, (err, data) => resolve(data))
    else resolve([])
});
module.exports.readFile = (dir) => new Promise(async (resolve, reject) =>{
    if(await fileExists(dir)) fs.readFile(dir, {encoding: "utf8",flag: "r"}, (err, file) => resolve(file))
    else resolve('')
});
module.exports.removeDir = (dir) => new Promise(async (resolve, reject) =>{
    if(await fileExists(dir)) fs.rmdir(dir, {recursive: true}, (err) => resolve())
    else resolve()
});
module.exports.removeFile = (dir) => new Promise(async (resolve, reject) =>{
    if(await fileExists(dir)) fs.unlink(dir, (err) => resolve())
    else resolve()
});
module.exports.isDirectory = (dir) => new Promise(async (resolve, reject) =>{
    if(await fileExists(dir)) fs.lstat(dir, (err, stats) => resolve( stats ? stats.isDirectory() : false))
    else resolve(false)
});
