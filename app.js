var express = require('express'),
    app = express(),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    createTables = require('./queries/createTables'),
    orders = require('./routes/orders'),
    customers =  require('./routes/customers');
    var swaggerUi = require('swagger-ui-express'),
    port = process.env.PORT || 3000,
    swaggerDocument = require('./swagger/swagger.json');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

global.connection = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12248858',
    password: 'BulkViDavL',
    database: 'sql12248858'
});

connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected with mysql database...');
    createTables.createTables();

})
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/orders', orders);
app.use('/customers', customers);
app.use(express.static('www'))
var server = app.listen(port, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("App server listening at ", host, port)

});