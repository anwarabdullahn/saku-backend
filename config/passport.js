const JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt,
	secret = process.env.SECRET,
	User = require('../models/User'),
	Admin = require('../models/Admin');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = (passport) => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			jwt_payload.role === 'user'
				? User.findById(jwt_payload.id).then((user) => (user ? done(null, user) : done(null, false)))
				: Admin.findById(jwt_payload.id).then((admin) => (admin ? done(null, admin) : done(null, false)));
		})
	);
};
