const User = require('../models/User'),
	bcrypt = require('bcryptjs'),
	Bcrypt = require('../config/bcrypt');

module.exports.UpdateUser = (req, res) => {
	const _id = req.user._id,
		{ first_name, last_name, email, password, phone, avatar, oldPassword } = req.body,
		toBeUser = {};

	if (first_name) toBeUser.first_name = first_name;
	if (last_name) toBeUser.last_name = last_name;
	if (email) toBeUser.email = email;
	if (phone) toBeUser.phone = phone;
	if (avatar) toBeUser.avatar = avatar;

	password
		? Bcrypt(_id, password, oldPassword)
				.then((hash) => {
					toBeUser.password = hash;
					User.findOneAndUpdate(_id, { $set: toBeUser }, { $new: true })
						.then((user, err) => {
							err && res.json(err);
							res.status(200).json({
								success: true,
								msg: `Successfully update user`,
								result: user
							});
						})
						.catch((err) => res.json(err));
				})
				.catch((err) => res.json(err))
		: User.findOneAndUpdate(_id, { $set: toBeUser }, { $new: true })
				.then((user, err) => {
					err && res.json(err);
					res.status(200).json({
						success: true,
						msg: `Successfully update user`,
						result: user
					});
				})
				.catch((err) => res.json(err));
};
