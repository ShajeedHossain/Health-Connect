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

//route imports
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const adminRoutes = require("./routes/adminRoutes");
const devRoutes = require("./routes/devRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");

//routes
app.use("/api/user", userRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dev", devRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/hospital", hospitalRoutes);

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
