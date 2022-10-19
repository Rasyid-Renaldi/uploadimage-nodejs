const util = require('util');
const multer = require('multer');
const moment = require('moment');
const fs = require('fs');

const DIR = './uploads/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    // const fileName = moment().format('MM,DD hh:mm:ss') + ' ' + file.originalname;
    const date = moment().format('D MMM, H:mm');
    cb(null, `${file.originalname} ${date} `);
    // console.log(moment().format('D MMM, H:mm'));
  },
});

// fs.rename('kitten-03.jpg', '', (err) => {
//   if (err) throw err;
//   console.log('File renamed');
// });

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Image type should be: .jpeg, .jpg, .png and .gif!'));
    }
  },
}).single('file');

let imgUploadMiddleware = util.promisify(upload);

module.exports = imgUploadMiddleware;
