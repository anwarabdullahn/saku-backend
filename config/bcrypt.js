const bcrypt = require('bcryptjs'),
	User = require('../models/User');

module.exports = async (_id, password, oldPassword) => {
	return await new Promise((resolve, reject) => {
		User.findById(_id).then((user) =>
			bcrypt
				.compare(oldPassword, user.password)
				.then(
					(match) =>
						match
							? bcrypt.genSalt(10, (err, salt) =>
									bcrypt.hash(password, salt, (err, hash) => resolve(hash))
								)
							: reject({ status: false, msg: 'Wrong Old Password' })
				)
		);
	});
};
