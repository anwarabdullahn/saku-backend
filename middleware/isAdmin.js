const Admin = require('../models/Admin');

module.exports = (req, res, next) => {
	Admin.findById(req.user._id).then(
		(data) =>
			data
				? next()
				: res.status(400).json({
						success: false,
						msg: 'Invalid Credentials'
					})
	);
};
