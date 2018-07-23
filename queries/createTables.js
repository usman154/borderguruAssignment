var sql = require('../queries/sql').queries;
var tableCreate = function(){
    connection.query(sql.createCustomerTable, function (err, result) {
        if (err) throw err;
        console.log(`Customer table created successfully!`);
        //console.log()
        connection.query(sql.createOrderTable, function (err, result) {
            if (err) throw err;
            console.log(`Order table created successfully!`);
            // connection.query(sql.createCustomer({customerName: 'Hafeez', customerAddress: 'Chaburgi'}), function (err, result) {
            //     if (err) throw err;
            //   //  console.log(result)
            //   });
          });
           
         
      });
};

module.exports.createTables = tableCreate;