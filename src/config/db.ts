import mongoose from "mongoose";

export const connectDB = () => {
  const dbUrl = process.env.DATABASE;

  if (!dbUrl) {
    console.error("MongoDB URI is undefined. Check your .env file.");
    process.exit(1); // Exit with failure
  }

  mongoose
    .connect(dbUrl)
    .then(() => console.log(`[DATABASE] mongoDB connection established successfully`))
    .catch((error) => {
      console.error(`MongoDB connection error: ${error.message}`);
      process.exit(1); // Exit with failure
    });

  return mongoose.connection;
};

export{}

