var config: any = {
	saltRounds : 12,
	tokenExpiresIn : 1440 * 60 // The JWT token expires in 24 hours (1440 minutes * 60 seconds = 24 hours)
};

module.exports = config;
