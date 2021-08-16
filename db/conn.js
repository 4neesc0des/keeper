const mongoose = require("mongoose");

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connection successfull__");
  })
  .catch((err) => {
    console.log(`NOT CONNECTED !!! ${err}`);
  });
