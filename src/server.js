require("dotenv").config();
const { prisma } = require("./middleware/db");
const app = require("./middleware/app");
const port = process.env.PORT;

app.post("/new", (req, res) => {});
app.get("/posts", (req, res) => {});
app.patch("/update", (req, res) => {});
app.delete("/remove", (req, res) => {});

app.listen(port, () => {
  console.log(` app listening on localhost:${port}`);
});
