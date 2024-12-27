import mongoose from "mongoose";

export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DB_URL!, {
      authSource: "admin",
      retryWrites: true,
      w: "majority",
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
