import { app } from "./app.js";
import { config } from "./config/index.js";
import { connectDB } from "./db/index.js";

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log("Express server running on => ", config.port);
    });
  })
  .catch((error) => {
    throw new Error("Database connection Error", error);
    process.exit(1);
  });
