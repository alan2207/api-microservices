var validUrl = require('valid-url');


module.exports = function(app) {
    // generating a random number for shorter URL
    var randomNum = Math.floor(Math.random() * 10000) + 1;
    // getting source url of the host, just defining as global
    var sourceUrl; 
    // getting url that is passed as parameter, just defining as global
    var url;

    // route for index.html
    app.get('/shortenURL', function(req, res) {
        // getting the sourceUrl from main route and storing it globally
        sourceUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        res.render('shortenURL-index');
    });

    // route for recieving parameter for url
    app.get('/shortenURL/:url(*)', function(req, res) {
        url = req.params.url;

        // checking if the passed url is valid, if so, return json object with required data
        if(validUrl.isUri(url)) {
            res.json({
                original_url: req.params.url,
                short_url: sourceUrl + '' + randomNum
            });
            // otherwise display error message
        } else {
            res.render('shortenURL-error');
        }
    }); 

    // route for shorter url that will redirect to the wanted url
    app.get('/' + randomNum, function(req, res) {
        res.redirect(302, url);
    });

}