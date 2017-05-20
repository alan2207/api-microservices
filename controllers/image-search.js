var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


module.exports = function(app) {

    // connecting to bing-api 
    var Bing = require('node-bing-api')({accKey: "dc64646e338d4387bd5ea30da2d030e4 "});

    // importing model for searched terms
    var Search = require('../models/searchEntry');

    // connecting to the database
    mongoose.connect('mongodb://alan2207:pass@ds127391.mlab.com:27391/searchterms');

    app.get('/imageSearch', function(req, res) {
        res.render('imageSearch');
    })

    // route for searching images - searching via adress bar
    app.get('/imageSearch/searchImage/:searchItem', function(req, res) {
        var searchItem = req.params.searchItem;
        var offset = req.query.offset || 0;

        // storing searched term to database
        var searchedTerm = new Search({
            term: searchItem,
            when: new Date()
        }).save(function(err) {
            if(err) {
                res.send('Error ocurred during saving the entry...');
            }
        });
        // retrieving images from bing api
        Bing.images(searchItem, {
            top: 10,
            skip: offset
        }, function(err, response, body) {
            var data = body.value.map(function(item) {
                return {url: item.contentUrl, title: item.name, thumbnail: item.thumbnailUrl, context: 'http://' + item.hostPageDisplayUrl};
            });
            res.json(data);
        });
    });


    // image search via html form
    app.post('/imageSearch/searchImage', function(req, res) {

        var searchItem = req.body.term;
        var offset = Number(req.body.offset) || 0;
        var format = req.body.format;

        // storing searched term to database
        var searchedTerm = new Search({
            term: searchItem,
            when: new Date()
        }).save(function(err) {
            if(err) {
                res.send('Error ocurred during saving the entry...');
            }
        });
        // retrieving images from bing api
        Bing.images(searchItem, {
            top: 10,
            skip: offset
        }, function(err, response, body) {
            var data = body.value.map(function(item) {
                return {url: item.contentUrl, title: item.name, thumbnail: item.thumbnailUrl, context: 'http://' + item.hostPageDisplayUrl};
            });
            if(format === 'json') {
                res.json(data);
            } else {
                res.render('renderImages', {data: data});
            }
            
        });


    })

    // route for getting stored entries
    app.get('/imageSearch/latestSearch', function(req, res) {
        Search.find({}, {_id: 0, term: 1, when: 1}, {limit: 10, sort: {'when': -1}}, function(err, data) {
            res.json(data);
        });
    });

}