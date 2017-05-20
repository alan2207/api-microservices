var multer = require('multer');
var upload = multer({ dest: 'uploads/' });


module.exports = function(app) {
    app.get('/getMeta', function(req, res) {
        res.render('get-file-meta');
    });

    app.post('/getMeta', upload.single('file'), function(req, res, next) {
        res.json({
            meta: req.file
        });
    });
}