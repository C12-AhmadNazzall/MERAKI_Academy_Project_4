const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Project_4")
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });
