import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen("7200", () => {
  console.log(`[✅] Server running at http://localhost:7200`);
});
