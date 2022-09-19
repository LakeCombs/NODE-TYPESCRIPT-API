import mongoose from "mongoose";
import config from "config";
import logger from "../utils/logger";

async function connect() {
	const dbURI = config.get<string>("dbURI");
	try {
		await mongoose.connect(dbURI);
		logger.info("conneced to db");
	} catch (error) {
		logger.error(`an error occoured while connecting to db`, error);
		process.exit(1);
	}
}

export default connect;
