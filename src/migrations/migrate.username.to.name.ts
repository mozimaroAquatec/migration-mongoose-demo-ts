import mongoose from "mongoose";
import Users from "../models/users.model";
import { DBLogger, usersLoggers } from "../logging";
import "../config/env.config";

// Ensure strictQuery is set before connecting
mongoose.set("strictQuery", true);
/**
 * @desc Migrates usernames to names for users where the name field does not exist.
 * This function connects to the database, performs the migration operation,
 * and then disconnects from the database.
 * @command__DEV set NODE_ENV=development && ts-node src/migrations/migrate.username.to.name.ts
 * @command__PROD set NODE_ENV=production && ts-node src/migrations/migrate.username.to.name.ts
 * @returns {Promise<void>} A Promise that resolves when the migration is complete.
 */
const migrateUsernameToName = async (): Promise<void> => {
  try {
    // Connect to the database using a new connection
    await mongoose.connect(process.env.MONGO_URI as string);
    DBLogger.info("Database connected successfully in migration mode");

    // Perform the migration
    const result = await Users.updateMany(
      { name: { $exists: false } }, // Only update documents where name does not already exist
      { $rename: { username: "name" } }
    );

    usersLoggers.info(
      `Successfully migrated ${result.modifiedCount} documents`
    );
  } catch (error) {
    usersLoggers.error(error, "Error migrating data");
  } finally {
    // Disconnect the database after the migration is done
    await mongoose.disconnect();
    DBLogger.info("Database disconnected after migration");
  }
};

// Execute the migration function
migrateUsernameToName();
