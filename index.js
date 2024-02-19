const express = require("express");
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

const cors = require("cors");
app.use(cors({ origin: "*", credentials: true }));

// backend routes
app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

// Export app if required by another module
if (require.main === module) {
  // Only start the server if the file is being executed directly
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
}

module.exports = app;
