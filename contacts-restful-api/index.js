'use strict';

// requires
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('basic-auth');

// variables
var app = express();
var admin = {
    username: 'vassallocarlo',
    password: '1234'
};
// basic dmFzc2FsbG9jYXJsbzoxMjM0
var contacts = [
    {
        name: 'carlo',
        surname: 'vassallo',
        phone: '3935961404'
    }
];

// middleware
app.use(bodyParser.json());
app.use(function (err, req, res, next) {
    if (err) {
        res.status(500).json({
            error: true,
            code: 500,
            message: err.message
        });
    } else {
        next();
    }
});
app.use(function (req, res, next) {
    var user = auth(req);

    if (!user || !user.name || !user.pass) {
        res.status(401).json({
            error: true,
            code: 401,
            message: 'MISSING AUTH PARAMS'
        });
    };

    if (user.name === admin.username && user.pass === admin.password) {
        return next();
    } else {
        res.status(401).json({
            error: true,
            code: 401,
            message: 'WRONG CREDENTIALS'
        });
    };
});

// resource
app.get('/contact', function (req, res) {
    res.json(contacts);
});

app.post('/contact', function (req, res) {
    if (contacts.find((elem, index) => {
        if (elem.name === req.params.name)
            return true;
        return false;
    }))
        res.status(400).json({
            error: true,
            code: 400,
            message: 'CONTACT NAME ALREADY REGISTERED'
        });

    console.log(req.body);
    if (req.body.name && req.body.surname && req.body.phone) {
        contacts.push({
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
        });
        res.json({
            error: false,
            code: 200,
            message: 'OK'
        });
    } else
        res.status(404).json({
            error: true,
            code: 400,
            message: 'MISSING PARAMETERS'
        });
});

app.get('/contact/:name', function (req, res) {
    let contact = contacts.find((elem, index) => {
        if (elem.name === req.params.name)
            return true;
        return false;
    });

    if (contact)
        res.json({
            error: false,
            code: 200,
            message: 'OK',
            data: contact
        });
    else
        res.status(404).json({
            error: true,
            code: 404,
            message: 'NOT FOUND',
            data: null
        });

});

app.put('/contact/:name', function (req, res) {
    let contact = contacts.find((elem, index) => {
        if (elem.name = req.params.name)
            return true;
        return false;
    });

    if (contact) {
        for (var field in contact) {
            if (!contact.hasOwnProperty(field)) continue;
            if (req.body[field]) contact[field] = req.body[field];
        }
        res.json({
            error: false,
            code: 200,
            message: 'OK'
        });
    } else
        res.status(404).json({
            error: true,
            code: 404,
            message: 'NOT FOUND'
        });
});

app.delete('/contact/:name', function (req, res) {
    let found = false;

    contacts.forEach((elem, index, array) => {
        if (elem.name === req.params.name) {
            array.splice(index, 1);
            found = true;
        }
    });

    if (found)
        res.json({
            error: false,
            code: 200,
            message: 'OK'
        });
    else
        res.status(404).json({
            error: true,
            code: 404,
            message: 'NOT FOUND'
        });
});

// default route
app.use(function (req, res, next) {
    res.status(404).json({
            error: true,
            code: 404,
            message: 'ROUTE NOT FOUND'
        });
});

// start service
app.listen(3000);