var useragent = require('express-useragent');
module.exports = function(app) {

    app.use(useragent.express());

    app.get('/whoami', function(req, res) {
        res.render('whoami');
    })

    app.get('/whoami/meta', function(req, res) {
        res.json({
            ipaddress: req.ip,
            language: req.headers["accept-language"].split(',')[0],
            software: `${req.useragent.os} ${req.useragent.platform}, ${req.useragent.browser} ${req.useragent.version}`
        });
    });
}