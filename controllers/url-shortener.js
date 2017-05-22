var validUrl = require('valid-url');


module.exports = function(app) {
    // generating a random number for shorter URL
    var randomNum;
    // getting source url of the host, just defining as global
    var sourceUrl; 
    // getting url that is passed as parameter, just defining as global
    var url;

    // route for index.html
    app.get('/shortenURL', function(req, res) {

        randomNum = Math.floor(Math.random() * 10000) + 1;

        // getting the sourceUrl from main route and storing it globally
        sourceUrl = req.protocol + '://' + req.get('host');
        res.render('shortenURL-index', {url: sourceUrl, num: randomNum});
    });

    // route for recieving parameter for url
    app.get('/shortenURL/:url(*)', function(req, res) {
        url = req.params.url;

        // checking if the passed url is valid, if so, return json object with required data
        if(validUrl.isUri(url)) {
            res.json({
                original_url: req.params.url,
                short_url: sourceUrl + '/shorten/' + randomNum
            });
            // otherwise display error message
        }
    }); 

  
    // route for shorter url that will redirect to the wanted url
    app.get('/shorten/:num'  , function(req, res) {
        if(req.params.num == randomNum) {
            res.redirect(301, url);
        } else {
            res.render('shortenURL-index', {url: sourceUrl, num: randomNum});
        }
    });
}