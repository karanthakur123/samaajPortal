const express = require('express');
const dataRoutes= require("./src/student/routes");
const app = express();
const port =3000;

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hello world");
})

app.use("/api/v1/data",dataRoutes);
app.listen(port,() => console.log(`app listening on port ${port}`));