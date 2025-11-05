const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

// Database Connection
const dbConnect = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
dbConnect();
cloudinaryConnect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // React App ka URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies/session
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//defining routes
app.use("/course", require("./routes/course"));
app.use("/user", require("./routes/user"));

app.use("/order", require("./routes/order"));

//admin routes
app.use("/admin", require("./routes/admin"));
app.get("/test/get",(req,res)=>{

  res.send("<p>Hello</p>");
})
// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is Running On Port: ${PORT}`);
});

// Error Handling
process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error:", err);
  process.exit(1);
});
