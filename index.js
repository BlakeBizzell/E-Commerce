const express = require("express");
const app = express();
const PORT = 3000;

// backend routes
app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
