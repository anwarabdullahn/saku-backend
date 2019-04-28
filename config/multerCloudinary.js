const multer = require('multer'),
	cloudinary = require('cloudinary'),
	cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
	cloudinary,
	folder: 'saku-images',
	allowedFormats: [ 'jpg', 'png', 'jpeg' ],
	filename: function(req, file, cb) {
		cb(undefined, file.originalname);
	}
});
// .array('photos', 6)
// .single('image)
module.exports = multer({ storage: storage });
