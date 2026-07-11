const mongoose = require("mongoose");

const uri =
  "mongodb+srv://bupitc_admin:jqJYYGuS73GrlrK7@cluster0.qe2asmq.mongodb.net/bup_itc?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });