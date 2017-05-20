var os = require('os');

module.exports = function(app) {

    app.get('/whoami', function(req, res) {
        res.render('whoami');
    })

    app.get('/whoami/meta', function(req, res) {
        res.json({
            ipaddress: req.ip,
            language: req.headers["accept-language"].split(',')[0],
            software: `${os.type()} ${os.release()}, ${os.platform()}, ${os.arch()}`
        });
    });
}