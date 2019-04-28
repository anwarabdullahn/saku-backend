const Wallet = require('../models/Wallet'),
	Transaction = require('../models/Transaction'),
	Validation = require('../config/validation');

module.exports.Store = (req, res) => {
	const { name, balance, themeId } = req.body,
		newWallet = new Wallet({ name, balance, userId: req.user._id, themeId }),
		{ errors, isValid } = Validation.StoreWallet(req.body);

	!isValid
		? res.status(400).json({
				success: false,
				msg: `Error Validation`,
				errors
			})
		: newWallet.save().then((wallet, err) => {
				err && res.json(err);
				wallet
					? res.status(201).json({
							success: true,
							msg: `Wallet created`,
							result: wallet
						})
					: res.status(400).json({
							success: false,
							msg: `Failed to create Wallet`
						});
			});
};

module.exports.Get = (req, res) => {
	const userId = req.user._id,
		_id = req.query.id;

	_id
        ? Wallet.findOne({ userId, _id }).then((wallet, err) => {
				err && res.json(err);
				wallet
					? res.status(200).json({
							success: true,
							msg: `Successfully find user wallet`,
							result: wallet
						})
					: res.status(400).json({
							success: false,
							msg: `Failed to find wallet`
						});
			})
        : Wallet.find({ userId: userId }).sort({ createdAt: -1 }).then((wallet, err) => {
				err && res.json(err);
				wallet
					? res.status(200).json({
							success: true,
							msg: `Successfully find user wallet`,
							result: wallet
						})
					: res.status(400).json({
							success: false,
							msg: `Failed to find wallet`
						});
			});
};

module.exports.Delete = (req, res) => {
	const userId = req.user._id,
		_id = req.query.id;

	Wallet.findOne({ userId, _id }).then((wallet, err) => {
		err && res.json(err);
		wallet
			? Transaction.find({ wallet_id: _id }).then((transaction, err) => {
					err && res.json(err);
					for (let i = 0; i < transaction.length; i++) transaction[i].remove();
					wallet.delete().then((data) =>
						res.status(200).json({
							success: true,
                            msg: `Successfully delete user wallet`,
                            result: data
						})
					);
				})
			: res.status(400).json({
					success: false,
					msg: `Failed to find wallet`
				});
	});
};

module.exports.Edit = (req, res) => {
	const userId = req.user._id,
		_id = req.query.id,
		{ name, themeId } = req.body,
		toBeWallet = {};

	if (name) toBeWallet.name = name;
	if (themeId) toBeWallet.themeId = themeId;

	Wallet.findOneAndUpdate({ userId, _id }, { $set: toBeWallet }, { new: true }).then((wallet, err) => {
		err && res.json(err);
		res.status(200).json({
			success: true,
			msg: `Successfully update user wallet`,
			result: wallet
		});
	});
};
