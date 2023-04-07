const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const apiSpec = require("../openapi.json");
require("./middleware/passportAuth");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiSpec));

// Simple Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

app.use("/api", routes);

app.listen(5000, () => console.log("App is listening at port 5000"));
