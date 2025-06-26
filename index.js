import app from "./app.js";
import { port } from "./src/configs/env.config.js";

app.listen(port, (err) => {
  if (err) console.log(`Error while starting the server: `, err);
  else console.log(`Server started at port: `, port);
});
