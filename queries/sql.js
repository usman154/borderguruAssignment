String.prototype.addSlashes = function() 
{ 
  
   return this.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}; 
var eurToUsd = 0.85;
module.exports.queries = {
    createDB: "CREATE DATABASE borderguru",
    createCustomerTable: `CREATE TABLE IF NOT EXISTS customers (
        customerName varchar(255),
        customerAddress varchar(600),
        PRIMARY KEY (customerName, customerAddress )
    )`,
    createOrderTable: `CREATE TABLE IF NOT EXISTS orders (
        id INT NOT NULL AUTO_INCREMENT,
        customerName varchar(255),
        customerAddress varchar(600),
        item TEXT,
        price INT,
        currency ENUM('USD', 'EUR'),
        PRIMARY KEY (id),
        FOREIGN KEY (customerName, customerAddress)  
        REFERENCES customers (customerName, customerAddress)
        ON DELETE SET NULL
        ON UPDATE CASCADE
        
    )`,
    addNewCustomerAttribute: function (colName, type) {
        return `ALTER TABLE customers ADD ${colName.addSlashes()} ${type.addSlashes()} NULL ;`
    },
    removeCustomerAttribute: function (colName) {
        return `ALTER TABLE customers DROP COLUMN ${colName}`
    },
    getAllOrdersFromGivenCustomer: function (customer) {
        if (customer.customerName)
            return `SELECT item, price, id, currency from orders where customerName = '${customer.customerName.addSlashes()}'`;
        return `SELECT item, price, id, currency from orders where customerAddress = '${customer.customerAddress.addSlashes()}'`;
    },
    createNewOrder: function (order) {
        return `INSERT INTO orders(customerName,customerAddress,item,price,currency) VALUES ('${order.customerName.addSlashes()}', '${order.customerAddress.addSlashes()}', '${order.item.addSlashes()}', ${order.price}, '${order.currency.addSlashes()}')`
    },
    createCustomer : function(customer){
       var query =  `INSERT INTO customers (`;
       var comma = " ";
       for(var key in customer){
           query+=`${comma}${key}`;
           comma = ", "
       };
       query+=` ) VALUES (`;
       comma = " ";
       for(var key in customer){
           query+= typeof(customer[key])=='string' ? `${comma}'${customer[key].addSlashes()}'` : `${comma}${customer[key]}`;
           comma = ", ";
       };
       query+=` )`;
       return query;
    },
    updateOrder : function(order, orderID){
        console.log(order, orderID)
        var updateTable = `UPDATE orders SET `;
        var comma = " ";
        for (var key in order) {
            if(order[key])
            updateTable+= typeof(order[key]) =='string' ?  `${comma}${key} = '${order[key].addSlashes().trim()}' ` : `${comma}${key} = ${order[key]} `;
            comma = ", ";
        };
        updateTable+=` WHERE id= ${orderID}`

        return updateTable;
    },
    deleteOrder : function(orderID){
        return `DELETE FROM orders where id = ${orderID}`
    },
    getOrderListSorted : function(){
       return `Select* FROM(SELECT item,COUNT(*) as occurrences FROM orders GROUP BY item ORDER BY occurrences DESC) x group by occurrences,item order by occurrences desc`
    },
    getCustomerInfo : function(name){
        return `SELECT * FROM customers WHERE customerName =  '${name.addSlashes()}' `;
    },
    updateCustomerInfo : function(customer, customerInfo){
        var updateTable = `UPDATE customers SET `;
        var comma = " ";
        
        for (var key in customerInfo) {
            if(customerInfo[key])
            updateTable+= typeof(customerInfo[key]) == 'string' ? `${comma}${key} = '${customerInfo[key].addSlashes().trim()}' ` : `${comma}${key} = ${customerInfo[key]} `;
            comma = ", ";
        };
        updateTable+=` WHERE customerName = '${customer.customerName.addSlashes()}' AND customerAddress = '${customer.customerAddress.addSlashes()}' `
       // console.log(updateTable)
        return updateTable;

    },
    deleteCustomerInfo : function(customer){
        return `DELETE FROM customers WHERE customerName = '${customer.customerName.addSlashes()}' AND customerAddress = '${customer.customerAddress.addSlashes()}' `
    },
    getAllOrdersByCustomer : function(customer){
        return `Select id as  'Order ID', customerName as 'Customer Name', customerAddress as 'Customer Address', item as 'Item Name', price as 'Price' , currency as 'Currency' from orders WHERE customerName = '${customer.customerName.addSlashes()}' AND customerAddress = '${customer.customerAddress.addSlashes()}' `
    },
    getAmountPaidByCustomer : function(customer){
        return `SELECT SUM(Amount) as 'Amonut (EUR)'  FROM(SELECT price * 
        CASE currency
        WHEN 'USD' THEN ${eurToUsd}
        ELSE 1
        END
        AS 'Amount' FROM orders  WHERE customerName = '${customer.customerName.addSlashes()}' AND customerAddress = '${customer.customerAddress.addSlashes()}' ) X
        `
        
    },

    getCustomerWithOrder : function(item){
        return `SELECT customers.* , orders.id as 'Order ID', orders.item as 'Item', orders.price as 'Price', orders.currency as 'Currency' FROM orders
         INNER JOIN
         customers ON
         orders.customerName = customers.customerName AND orders.customerAddress = customers.customerAddress
         where orders.item = '${item.addSlashes()}' GROUP BY customers.customerName,customers.customerAddress 
         `
    }
}