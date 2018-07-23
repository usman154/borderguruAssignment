var express = require('express');
var router = express.Router();
var sql = require('../queries/sql').queries;

router.post('/getOrdersByCustomer', function (req, res, next) {

    connection.query(sql.getAllOrdersByCustomer(req.body), function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.post('/getAllOrdersFromGivenCustomer', function (req, res, next) {
  
    connection.query(sql.getAllOrdersFromGivenCustomer(req.body), function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.post('/createNewOrder', function (req, res, next) {
  
    connection.query(sql.createNewOrder(req.body), function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.post('/updateOrder/:id', function (req, res, next) {
  
    connection.query(sql.updateOrder(req.body,req.params.id), function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});
router.delete('/deleteOrder/:id', function (req, res, next) {
  
    connection.query(sql.deleteOrder(req.params.id), function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});
router.get('/getOrderListSorted', function (req, res, next) {
  
    connection.query(sql.getOrderListSorted(), function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});
router.get('/getAllOrderes', function (req, res, next) {
  
    connection.query("SELECT * FROM orders", function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});


module.exports = router;