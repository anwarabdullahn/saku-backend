const updateUserWallet = (req, res, next) => {
	User.findById(req.user._id)
		.then((user, err) => {
			err && res.status(400).json(err);
			Wallet.find({ userId: req.user._id })
				.then((wallet, err) => {
                    err && res.status(400).json(err);
                    user.balance = 0
					for (let i = 0; i < wallet.length; i++) user.balance += wallet[i].balance;
					user.save().then(
						(user) =>
							user
								? next()
								: res.status(400).json({
										success: false,
										msg: 'Cannot Update User Balance'
									})
					);
				})
				.catch((err) => res.status(400).json(err));
		})
		.catch((err) => res.status(400).json(err));
};


module.exports = updateUserWallet;
