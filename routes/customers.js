var express = require('express');
var router = express.Router();
var sql = require('../queries/sql').queries;


router.get('/getCustomerInfo/:name', function (req, res, next) {
     
    connection.query(sql.getCustomerInfo(req.params.name), function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.put('/updateCustomerInfo/', function (req, res, next) {
     connection.query(sql.updateCustomerInfo(req.body.customer, req.body.customerInfo), function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.delete('/deleteCustomerInfo/', function (req, res, next) {
    console.log(req.body)
    connection.query(sql.deleteCustomerInfo(req.body), function (error, results, fields) {
       if (error) {
           res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
           //If there is error, we send the error in the error section with 500 status
       } else {
           res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
           //If there is no error, all is good and response is 200OK.
       }
   });
});

router.post('/getAllOrdersByCustomer/', function (req, res, next) {
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

router.post('/getAmountPaidByCustomer/', function (req, res, next) {
    connection.query(sql.getAmountPaidByCustomer(req.body), function (error, results, fields) {
       if (error) {
           res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
           //If there is error, we send the error in the error section with 500 status
       } else {
           res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
           //If there is no error, all is good and response is 200OK.
       }
   });
});

router.get('/getCustomerWithOrder/:item', function (req, res, next) {
    connection.query(sql.getCustomerWithOrder(req.params.item), function (error, results, fields) {
       if (error) {
           res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
           //If there is error, we send the error in the error section with 500 status
       } else {
           res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
           //If there is no error, all is good and response is 200OK.
       }
   });
});


router.get('/getCustomerColumns', function (req, res, next) {
    connection.query("SHOW COLUMNS FROM customers", function (error, results, fields) {
       if (error) {
           res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
           //If there is error, we send the error in the error section with 500 status
       } else {
           res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
           //If there is no error, all is good and response is 200OK.
       }
   });
});
router.get('/getCustomers', function (req, res, next) {
    connection.query("Select * from customers", function (error, results, fields) {
       if (error) {
           res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
           //If there is error, we send the error in the error section with 500 status
       } else {
           res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
           //If there is no error, all is good and response is 200OK.
       }
   });
});
router.post('/addNewCustomerAttribute', function (req, res, next) {
      
    connection.query(sql.addNewCustomerAttribute(req.body.name, req.body.type), function (error, results, fields) {
       if (error) {
           res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
           //If there is error, we send the error in the error section with 500 status
       } else {
           res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
           //If there is no error, all is good and response is 200OK.
       }
   });
});
router.post('/createCustomer', function (req, res, next) {
      
    connection.query(sql.createCustomer(req.body), function (error, results, fields) {
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