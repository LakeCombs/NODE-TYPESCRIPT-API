
export default {
	port: process.env.PORT,
	dbURI: process.env.mongoURI,
	saltWorkFactor: process.env.SALTWORKFACTOR,
	accessTokenTtl: process.env.accessTOKENTTL,
	refreshTokenTtl: process.env.refreshTOKENTTL,
	publicKey: process.env.pulicKEY,
	privateKey: process.env.privateKEY,
};
