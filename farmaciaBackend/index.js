import express, {json}  from "express";
import { routesFarmacy } from "./routes/farmacyRouter.js";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors())


const PORT = process?.env?.PORT ?? "4323";

app.use('/farmacia', routesFarmacy)

app.listen(PORT, () => {
  console.log(`App runing on port: http://localhost:${PORT} `);
});
