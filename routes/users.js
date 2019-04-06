var jwt = require('jsonwebtoken');
var lib = process.cwd()
var config = require(lib + '/config');
var middleware = require(lib + '/middleware');


//Login Page
module.exports = function(app){
app.post('/login',  function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = 'admin@admin.com';
    let mockedPassword = '123';

    if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
            let token = jwt.sign({username: username},
                config.secret,
                { expiresIn: '24h' // expires in 24 hours
                }
            );
            // return the JWT token for the future API calls
            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
            });
        } else {
            res.send(403).json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    } else {
        res.send(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
});
}

//module.exports = router;