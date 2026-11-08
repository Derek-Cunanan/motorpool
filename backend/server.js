const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

//routes
const authRoute = require("./routes/auth")
const requestRoute = require("./routes/request")
const vehicleRoute = require("./routes/vehicle")


const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth/", authRoute)
app.use("/api/request/", requestRoute)
app.use("/api/vehicle/", vehicleRoute)


mongoose.connect("mongodb+srv://djscunanan_db_user:moFKAlW3pX6P4Izq@cluster0.idj2fsp.mongodb.net")
    .then(()=>{console.log("connected")})
    .catch(()=>{console.log("not connected")})

app.listen(3000, (req,res) => {
    console.log("connected server")
})