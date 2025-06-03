require("dotenv").config();
const express = require("express");
const router = require('./routers/router.js');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const app = express();
app.use(express.json());

const corsOption ={
    origin:"https://client-dashboard-suigeneris.vercel.app",
    methods: "GET, PUT, PATCH, DELETE, POST, HEAD",
    credentials:true
}
app.use(cookieParser());
app.use(cors(corsOption));
app.use("/",router);

app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'None' 
  }
}));

app.listen(5000,()=>{
    console.log("Runnig");
})
