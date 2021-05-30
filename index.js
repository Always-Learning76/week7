const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const port = 5001;
const secret = "boutit"


app.use(express.json());
//create a token and send back to client

app.post('/create-token', (req, res) => {
    //payload
    //secret
    //expiry
    const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id
    }
    const expiry = 36000;
    //create token
    jwt.sign(payload, secret, { expiresIn: expiry}, (err, token) => {
        if(err) {
            return res.status(500).json({ err })
        } else {
            return res.status(200).json({token})
        }
    })
})

//receive token from client and decode
app.get('/decode-token', (req, res) => {
    console.log(req.headers);
    //pick auth header
    if(!req.headers.authorization) {
        return res.status(403).json({message: "auth is required"})
    }
    //pick authorization header
    const authHeader = req.headers.authorization;
    //extract token
    const splittedStr = authHeader.split(' ');
    const token = splittedStr[1];
    //decode token
    jwt.verify(token, secret, (err, decodedtoken) => {
        if(err) {
            return res.status(500).json({err})
        } else {
            return res.status(200).json({ user: decodedtoken })
       }
 })
    //decode token
})

app.listen(port, () => console.log("server is running baby"));


