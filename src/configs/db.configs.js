import log from "../logs/log";

import mongoose from "mongoose";

const connectDatabase = async () => {
  const mongoDbUrl = process.env.MONGO_DB_URL;
  log.info(`Connecting to ${mongoDbUrl}`);
  mongoose.Promise = global.Promise;

  mongoose
    .connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info("Successfully connected to the database");
    })
    .catch((err) => {
      log.error(`Could not connect to the database. Exiting now ... \n${err}`);
    });
};
export default { connectDatabase };
