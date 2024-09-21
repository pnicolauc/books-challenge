import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();
let client: Sequelize;

export default (): Sequelize => {
  if (!client) {
    const connectionString = process.env.POSTGRES_CONNECTION_STRING;

    if(!connectionString){
      throw new Error("POSTGRES_CONNECTION_STRING is not set")
    }

    client = new Sequelize(connectionString)
  }

  return client;
};
