const Validator = require('validator');

const isEmpty = (data) =>
	data === undefined ||
	data === null ||
	(typeof data === 'object' && Object.keys(data).length === 0) ||
	(typeof data === 'string' && data.trim().length === 0);

module.exports.Register = (data) => {
	let errors = {};
	data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
	data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
	data.phone = !isEmpty(data.phone) ? data.phone : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.email = !isEmpty(data.email) ? data.email : '';

	if (!Validator.isEmail(data.email)) errors.email = `Must be correct email type`;
	if (Validator.isEmpty(data.first_name)) errors.first_name = `First name is required`;
	if (Validator.isEmpty(data.last_name)) errors.last_name = `Last name is required`;
	if (Validator.isEmpty(data.password)) errors.password = `Password is required`;
	if (Validator.isEmpty(data.phone)) errors.phone = `Phone is required`;
	if (!Validator.isNumeric(data.phone, { no_symbols: false })) errors.phone = `Phone is numeric`;
	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports.AdminRegister = (data) => {
	let errors = {};
	data.name = !isEmpty(data.name) ? data.name : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.email = !isEmpty(data.email) ? data.email : '';

	if (!Validator.isEmail(data.email)) errors.email = `Must be correct email type`;
	if (Validator.isEmpty(data.name)) errors.name = `Name is required`;
	if (Validator.isEmpty(data.password)) errors.password = `Password is required`;
	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports.Login = (data) => {
	let errors = {};
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if (Validator.isEmpty(data.email)) errors.email = `Email is required`;
	if (Validator.isEmpty(data.password)) errors.password = `Password is required`;
	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports.StoreTransaction = (data) => {
	let errors = {};
	data.walletId = !isEmpty(data.walletId) ? data.walletId : '';
	data.categoryId = !isEmpty(data.categoryId) ? data.categoryId : '';
	data.type = !isEmpty(data.type) ? data.type : '';
	data.amount = !isEmpty(data.amount) ? data.amount : '';

	if (Validator.isEmpty(data.walletId)) errors.walletId = `Wallet is required`;
	if (Validator.isEmpty(data.categoryId)) errors.categoryId = `Category is required`;
	if (Validator.isEmpty(data.type)) errors.type = `Type is required`;
	if (Validator.isEmpty(data.amount)) errors.amount = `Amount is required`;
	if (!Validator.isNumeric(data.amount, { no_symbols: false })) errors.amount = `Amount is numeric`;
	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports.StoreWallet = (data) => {
	let errors = {};
	data.name = !isEmpty(data.name) ? data.name : '';
	data.themeId = !isEmpty(data.themeId) ? data.themeId : '';
	if (data.balance) {
		data.balance = !isEmpty(data.balance) ? data.balance : '';
		if (Validator.isEmpty(data.balance)) errors.balance = `Balance is required`;
		if (!Validator.isNumeric(data.balance, { no_symbols: false })) errors.balance = `Balance is numeric`;
	}
	if (Validator.isEmpty(data.name)) errors.name = `Wallet Name is required`;
	// if (Validator.isEmpty(data.themeId)) errors.themeId = `Wallet Themes is required`;
	return {
		errors,
		isValid: isEmpty(errors)
	};
};



module.exports.StoreNameOnly = (data) => {
	let errors = {};
	data.name = !isEmpty(data.name) ? data.name : '';

	if (Validator.isEmpty(data.name)) errors.name = `Name is required`;
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
