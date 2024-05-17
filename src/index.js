const express = require("express");
const { ServerConfig, Logger } = require("./config");
const apiRoutes = require("./routes");
const Queue = require("./config/queue-config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Server started successfully on PORT ${ServerConfig.PORT}`);

  await Queue.connectQueue();
  console.log("Queue is up");

  //below line will print logs
  Logger.info("Successfully started the server", {});
});
