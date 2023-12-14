const setupDb = require("./db/db-setup");
const express = require("express");
const userRouter = require("./routes/user");
const channelRouter = require("./routes/channel");
const { swaggerSpec, swaggerUi } = require('./swagger');
require('dotenv').config()
const port = process.env.PORT
// set up database with objection and knex
setupDb();
const app = express();
// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use("/user", userRouter);
app.use("/channel", channelRouter);
app.listen(port, () => console.log(`server is running on port ${port}`));
