import app from "./app.js";
import { server } from "./src/configs/env.config.js";

app.listen(server.port, (err) => {
  if (err) console.log(`Error while starting the server: `, err);
  else console.log(`Server started at port: `, server.port);
});
