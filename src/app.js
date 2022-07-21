import express from "express";
import router from "./routes/routes.js";

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

app.use(express.json());
app.use("/api", router);