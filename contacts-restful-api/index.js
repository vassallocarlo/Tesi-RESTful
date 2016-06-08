'use strict';

// requires
const express = require('express');
const bodyParser = require('body-parser')

// variables
var app = express();
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
        res.status(500).send({
            error: true,
            code: 500,
            message: err.message
        });
    } else {
        next();
    }

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
        res.status(404).json({
            error: true,
            code: 400,
            message: 'CONTACT NAME ALREADY REGISTERED'
        });

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

// start service
app.listen(3000);