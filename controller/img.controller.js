const moment = require('moment');
const upload = require('../middleware/imgUpload');

const uploadFile = async (req, res) => {
  try {
    await upload(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: 'Select image to upload' });
    }

    res.status(200).send({
      message: 'Image successfully uploaded: ' + moment().format('D MMM, H:mm') + ' ' + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    if (err.code == 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        message: 'File size should be less than 2MB!',
      });
    }
    res.status(500).send({
      message: `${err}`,
    });
  }
};

module.exports = { uploadFile };
