module.exports = function(app) {

    app.get('/timestamp', function(req, res) {
        res.render('timestamp');
    });

    // timestamp route for retrieving json data
    app.get('/timestamp/:timestamp', function(req, res) {
        var timestamp = req.params.timestamp;

        // date formatting object
        var dateFormat = {
            year: "numeric",
            month: "long",
            day: "numeric"
        };

        // check if passed timestamp is not unix
        if(isNaN(timestamp)) {
            var natural = new Date(timestamp);
            var natural = natural.toLocaleDateString('en-us', dateFormat);
            var unix = new Date(timestamp).getTime()/1000;
            // if the timestamp is invalid, return null for both formats
            if(natural === 'Invalid Date') {
                natural = null;
                unix = null;
            }
            // else passed parameter is passed as unix timestamp
        } else {
            var unix = timestamp;
            var natural = new Date(timestamp * 1000)
            var natural = natural.toLocaleDateString('en-us', dateFormat);
        }
        // return data as JSON
        res.json({unix, natural});
    });

}