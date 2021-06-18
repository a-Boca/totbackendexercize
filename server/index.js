import express from 'express';
import cors from 'cors';
import {pool} from './postgresdb.js';

const app = express()
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }
//middleware
app.use(cors(corsOptions))
app.use(express.json())
app.options('*', cors())
//ROUTES

//create a client
app.post("/user", async(req,res) => {
    try{
        const {mail,name} = req.body.data
        const newUser = await pool.query("INSERT INTO client (mail,name) VALUES($1,$2) RETURNING *",[mail,name])
        const response = {
            status : "success",
            data: newUser.rows[0]
        } 
        res.json(response)
    }
    catch(err){
        console.error(err.message) 
        const response = {
            status : "error",
            data: null
        } 
        res.json(response)
    }
})

//get all client
app.get("/user", async(req,res) => {
    try{
        const allUsers = await pool.query("SELECT * FROM client")
        const response = {
            status : "success",
            data: allUsers.rows
        } 
        res.json(response)
    }
    catch(err){
        console.error(err.message) 
        const response = {
            status : "error",
            data: null
        } 
        res.json(response)
    }
})

//create reservation
app.post("/reservation", async(req,res) => {
    try{
        const {mail,date,time,table_id,seats,allow_strangers_people} = req.body.data
        const postDateReservation = await pool.query("SELECT seats,allow_strangers_people FROM reservation WHERE date=$1 AND time=$2 AND table_id=$3",[date,time,table_id])
        if(postDateReservation.rows){
            postDateReservation.rows.forEach(element => {
                const requestedSeats = seats.split("")
                const alreadyReserverdSeats = element.seats.toString().split("")
                if(requestedSeats.some(item => alreadyReserverdSeats.includes(item))){
                    const response = {
                        status : "failure",
                        message: "One or more required places are already occupied"
                    } 
                    res.json(response)
                }else if(!(element.allow_strangers_people)){
                    const response = {
                        status : "failure",
                        message: "The person who booked this place doesn't want to eat with strangers"
                    } 
                    res.json(response)
                }
            });
        }else{
            const newReservation = await pool.query("INSERT INTO reservation (mail,date,time,table_id,seats,allow_strangers_people) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",[mail,date,time,table_id,seats,allow_strangers_people])
            const response = {
                status : "success",
                data: newReservation.rows[0]
            } 
            res.json(response)
        }
        const newReservation = await pool.query("INSERT INTO reservation (mail,date,time,table_id,seats,allow_strangers_people) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",[mail,date,time,table_id,seats,allow_strangers_people])
        const response = {
            status : "success",
            data: newReservation.rows[0]
        } 
        res.json(response)
    }
    catch(err){
        console.error(err.message) 
        const response = {
            status : "error",
            data: null
        } 
        res.json(response)
    }
})

//get list of all registered reservation
app.get("/reservation",async(req,res)=>{
    try{
        const allReservation = await pool.query("SELECT * FROM reservation ORDER BY date DESC;")
        const response = {
            status : "success",
            data: allReservation.rows
        } 
        res.json(response)
    }
    catch(err){
        console.error(err.message) 
        const response = {
            status : "error",
            data: null
        } 
        res.json(response)
    }
})



//get list of reservations given 2 date
app.get("/reservation/:fromDate/:toDate",async(req,res)=>{
try{
    const {fromDate,toDate} = req.params;
    const filteredReservation = await pool.query("SELECT * FROM reservation WHERE date >= $1 AND date <= $2",[fromDate,toDate])
    const response = {
        status : "success",
        data: filteredReservation.rows
    } 
    res.json(response)
}
catch(err){
    console.error(err.message) 
    const response = {
        status : "error",
        data: null
    } 
    res.json(response)
}
})

//get list of reservations given a start date
app.get("/reservation/:fromDate/",async(req,res)=>{
    try{
        const {fromDate} = req.params;
        const filteredReservation = await pool.query("SELECT * FROM reservation WHERE date >= $1",[fromDate])
        const response = {
            status : "success",
            data: filteredReservation.rows
        } 
        res.json(response)
    }
    catch(err){
        console.error(err.message) 
        const response = {
            status : "error",
            data: null
        } 
        res.json(response)
    }
    })



app.listen(5000,()=>{
    console.log("Server started on port 5000")
})