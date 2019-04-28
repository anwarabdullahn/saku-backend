const Theme = require('../models/Theme'),
	Validation = require('../config/validation');

module.exports.Store = (req, res) => {
	const { name } = req.body,
		newTheme = new Theme({ name, image: req.file.url }),
		{ errors, isValid } = Validation.StoreNameOnly(req.body);

	!isValid
		? res.status(400).json({
				success: false,
				msg: `Error Validation`,
				errors
			})
		: newTheme.save().then((theme, err) => {
				err && res.json(err);
				theme
					? res.status(201).json({
							success: true,
							msg: `Theme created`,
							result: theme
						})
					: res.status(400).json({
							success: false,
							msg: `Failed to create Theme`
						});
			});
};

module.exports.Get = (req, res) => {
	Theme.find().then((theme) =>
		res.status(200).json({
			success: true,
			msg: `Find Theme`,
			result: theme
		})
	);
};

module.exports.Edit = (req, res) => {
	const { name, image } = req.body,
		_id = req.query.id,
		toBeTheme = {};

	if (name) toBeTheme.name = name;
	if (image) toBeTheme.image = req.file.url;

	Theme.findOneAndUpdate({ _id }, { $set: toBeTheme }, { new: true }).then((theme, err) => {
		err && res.json(err);
		theme
			? res.status(200).json({
					success: true,
					msg: `Successfully update user theme`,
					result: theme
				})
			: res.status(400).json({
					success: false,
					msg: `Failed to update theme`
				});
	});
};

module.exports.Delete = (req, res) => {
	const _id = req.query.id;

	Theme.findOneAndDelete({ _id }).then((theme, err) => {
		err && res.json(err);
		theme
			? res.status(200).json({
					success: true,
					msg: `Successfully delete Theme`
				})
			: res.status(400).json({
					success: false,
					msg: `Failed to find Theme`
				});
	});
};
