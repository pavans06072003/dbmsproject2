const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router");
const app = express();
const PORT = process.env.PORT || 5000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({limit:'5mb'}));
app.use("/api",router);

app.listen(PORT,()=>{
    console.log('server is running',PORT);
});
