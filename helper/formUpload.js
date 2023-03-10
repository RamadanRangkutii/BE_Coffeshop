const multer = require('multer')
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, 'public/uploads/images/')//mulai dari titik root folder(coffeshop_be)
  },
  filename: (req, file, cb)=> {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
   // cb(null, file.fieldname + '-' + uniqueSuffix)
   cb(null, `${new Date().getTime()}-${file.originalname}`)
  }
})


const formUpload = multer({ 
  storage: storage,
  fileFilter: (req, file, callback) => {
    let extFile = path.extname(file.originalname)
    if (extFile !== ".png" && extFile !== ".jpeg" && extFile !== ".jpg") {
      callback("Only images!",false)
    } else {
      callback(null, true);
    }
  },
  limits: {
    fileSize: 1048576 * 10, // 10mb
  }
})

module.exports = formUpload