//imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");
const mongoose = require("mongoose");

dotenv.config();

//middlewares
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api", require("./routes/userRoutes"));

//db connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

//error handler
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`App listening on http://localhost:${process.env.PORT}`);
});
