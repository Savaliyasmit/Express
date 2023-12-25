const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
     cb(null , `${Date.now()}_${file.originalname.replace(/\s+/g,'_')}`)
    }
  })
  
exports.upload = multer({ storage: storage })

// /\s+/g this + mens all space