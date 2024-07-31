const req = require("express");
const express = req;
const app = express();
const port = 3000;

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader === "token") {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

const validateNumbers = (req, res, next) => {
  const { num1, num2 } = req.query;
  if (!isNaN(num1) && !isNaN(num2)) {
    next();
  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};

app.get("/add", authenticate, validateNumbers, (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const result = num1 + num2;
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
