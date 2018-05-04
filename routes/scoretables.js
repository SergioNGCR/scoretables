﻿'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');

function getLeague(leagueid) {
    // Setting URL and headers for request
    var options = {
        url: 'http://scoretables.herokuapp.com/api/leagues/' + leagueid,
        //proxy: 'http://proxy-atc.atlanta.hp.com:8080 ',				// Comment or remove this line when uploading code
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function (resolve, reject) {
        // Do async job
        request.get(options, function (err, resp, body) {
            if (err || !body) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })

}

function getScoreTables(leagueid) {
    // Setting URL and headers for request
    var options = {
        url: 'http://scoretables.herokuapp.com/api/scoretables/' + leagueid,
        //proxy: 'http://proxy-atc.atlanta.hp.com:8080 ',				// Comment or remove this line when uploading code
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function (resolve, reject) {
        // Do async job
        request.get(options, function (err, resp, body) {
            if (err || !body) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })

}

function getMatchDays(leagueid) {
    // Setting URL and headers for request
    var options = {
        url: 'http://scoretables.herokuapp.com/api/matchdays/' + leagueid,
        //proxy: 'http://proxy-atc.atlanta.hp.com:8080 ',				// Comment or remove this line when uploading code
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function (resolve, reject) {
        // Do async job
        request.get(options, function (err, resp, body) {
            if (err || !body) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })

}

// GET home page. 
router.get('/:id', function (req, res) {

    console.log('Received id: ' + req.params.id);

    var getLeaguePromise = getLeague(req.params.id);
    getLeaguePromise.then(function (result) {

        var getScoreTablesPromise = getScoreTables(req.params.id);
        getScoreTablesPromise.then(function (scores) {

            var getMatchDaysPromise = getMatchDays(req.params.id);
            getMatchDaysPromise.then(function (matchdays) {
                // Success request, show league data.
                res.render('scoretables', {
                    title: "Score Table",
                    league: result,
                    scores: scores,
                    matchdays: matchdays
                });

                console.log("Successfully retrieved league data");
            }, function (err) {
                // Create league options.
                res.render('scoretables', {
                    title: "Score Table",
                    league: null
                });

                console.log(err);
            })
        }, function (err) {
            // Create league options.
            res.render('scoretables', {
                title: "Score Table",
                league: null
            });

            console.log(err);
        })
    }, function (err) {
        // Create league options.
        res.render('scoretables', {
            title: "Score Table",
            league: null
        });

        console.log(err);
    })

});


module.exports = router;