const express = require("express");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
  res.send("this is the server");
});

// app.post('/login', passport.authenticate('local'), () => {
//   res.redirect('http://localhost:3000/dashboard')
// })


app.listen(4000, () => {
  console.log("listening on port http://localhost:4000/");
});
