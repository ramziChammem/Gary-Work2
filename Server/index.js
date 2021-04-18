const express = require("express");
const app = express();
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerUi = require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerDocument = YAML.load("./swagger.yaml");

var cors = require("cors");
require("dotenv").config();
var bodyParser = require("body-parser");

const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoute");
const serviceProviderRouter = require("./routes/ServiceProviderRouter");
const ServicesProviderListRouter = require("./routes/ServicesProviderListRoute");
const ContactUsRouter = require("./routes/ContactUsRoute");
const reviewRouter = require("./routes/ReviewRoute");
const appointmentRouter = require("./routes/AppointmentRoute");
const adminRouter = require("./routes/AdminRoutes");
const professionsRouter = require("./routes/ProfessionsRoutes");
const postsRouter = require("./routes/PostsRoute");
const liveMessagesRouter = require("./routes/LiveMessages.Routes.js");

const multer = require("multer");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const upload = multer({ dest: "uploads" });
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = process.env.URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("successfully connected to database");
});

app.use("/api/user", userRouter);

app.use("/api/contactus", ContactUsRouter);

app.use("/api/serviceProvider", serviceProviderRouter);

app.use("/api/serviceProviderList", ServicesProviderListRouter);
app.use("/api/review", reviewRouter);
app.use("/api/appointment", appointmentRouter);

app.use("/api/admin", adminRouter);
app.use("/api/professions", professionsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/messages", liveMessagesRouter);
app.post("/upload", upload.any(0), (req, res) => {
  let image = req.files[0].path;

  try {
    cloudinary.uploader.upload(image, (error, result) => {
      error && res.send({ status: false, msg: error });
      res.send({ status: true, msg: result });
    });
  } catch (err) {
    res.send({ status: false, msg: err });
  }
});
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// io.on("connection", (socket) => {
//   socket.on("message", (msg) => {
//     console.log(msg);
//     socket.broadcast.emit("message-broadcast", msg);
//   });
//   console.log("a user connected");
// });

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GaryWork API",
      version: "1.0.0",
      description: "API for thesis project",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: [path.join(__dirname, "/routes/**/*.js")],
};

const specs = swaggerJSDoc(options);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
  })
);
// app.get(
//   "/docs",
//   swaggerUi.setup(specs, {
//     explorer: true,
//   })
// );

const port = 3000;
http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
