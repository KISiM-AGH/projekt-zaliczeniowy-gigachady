const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');
const {ObjectId} = require("mongodb");

recordRoutes.route('/words').get(async function (_req, res) {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection('words')
        .find({})
        .limit(50)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send('Error fetching words!');
            } else {
                //console.log("Correctly answered the query");
                res.json(result);
            }
        });
});

recordRoutes.route('/words/add').post(function (req, res) {
    const dbConnect = dbo.getDb();
    const matchDocument = {
        word_text: req.body.word_text,
    };

    dbConnect
        .collection('words')
        .insertOne(matchDocument, function (err, result) {
            if (err) {
                res.status(400).send('Error inserting matches!');
            } else {
                //console.log(`Added a new record to word ${matchDocument.word_text}`);
                res.status(204).send();
            }
        });
});

recordRoutes.route('/records/add').post(function (req, res) {
    const dbConnect = dbo.getDb();
    const matchDocument = {
        incorrect_letters_1: req.body.incorrect_letters_1,
        time: req.body.time,
        word_text: req.body.word_text,
    };

    dbConnect
        .collection('records')
        .insertOne(matchDocument, function (err, result) {
            if (err) {
                res.status(400).send('Error inserting matches!');
            } else {
                //console.log(`Added a new record to word ${matchDocument.word_text}`);
                res.status(204).send();
            }
        });
});

recordRoutes.route('/records').get(async function (_req, res) {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection('records')
        .find({})
        .limit(50)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send('Error fetching records!');
            } else {
                //console.log("Correctly answered the query");
                res.json(result);
            }
        });
});

recordRoutes.route('/words/delete').delete((req, res) => {
    const dbConnect = dbo.getDb();
    const wordQuery = { word_text: req.body.word_text };

    dbConnect
        .collection('words')
        .deleteOne(wordQuery, function (err, _result) {
            if (err) {
                res
                    .status(400)
                    .send(`Error deleting word ${wordQuery.word_text}!`);
            } else {
                //console.log(("deleting word "+wordQuery.word_text));
                res.status(204).send()
            }
        });

    dbConnect
        .collection('records')
        .deleteMany(wordQuery, function (err, _result) {
            if (err) {
                res
                    .status(400)
                    .send(`Error deleting record with word ${wordQuery.word_text}!`);
            } else {
            }
        });

});

recordRoutes.route('/records/delete').delete((req, res) => {
    const dbConnect = dbo.getDb();
    const recordQuery = { _id: ObjectId(req.body._id) };

    dbConnect
        .collection('records')
        .deleteOne(recordQuery, function (err, _result) {
            if (err) {
                res
                    .status(400)
                    .send(`Error deleting record id ${recordQuery._id}!`);
            } else {
                //console.log(("deleting record id "+recordQuery._id));
                res.status(204).send()
            }
        });


});

module.exports = recordRoutes;
