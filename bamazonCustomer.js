const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('connection made!');
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        inquirer
            .prompt([
                {
                    name: 'choice',
                    type: 'number',
                    message: 'What is the id of the product that you would like to buy?'
                },
                {
                    name: 'quantity',
                    type: 'number',
                    message: 'How many of those would you like to buy?'
                }
            ])
            .then(function(answer) {
                checkQuantity(answer.choice, answer.quantity);
            })
    })
}

function checkQuantity(id, quantityRequest) {
    connection.query(`SELECT stock_quantity FROM products WHERE item_id=${id}`, function(err, result) {
        if (err) throw err;
        if (result[0].stock_quantity > 0) {
            console.log(result[0].stock_quantity);
            if (result[0].stock_quantity < quantityRequest) {
                console.log('Insufficient Quantity!')
            } else {
                connection.query(
                    `UPDATE products SET stock_quantity=${result[0].stock_quantity}-${quantityRequest} WHERE item_id=${id}`,
                    function(err) {
                        if (err) throw err;
                        console.log('Purchase Successful!');
                        totalCost(id, quantityRequest);
                        totalCostAddedToTable(id, quantityRequest);
                    }
                )
            }
        } else {
            console.log('Insufficient Quantity!');
        }
    })
}

function totalCost(id, quantity) {
    connection.query(`SELECT ${quantity}*price AS 'total_cost' FROM products WHERE item_id=${id}`, function(err, result) {
        if (err) throw err;
        console.log(`Total Cost of Purchase: $${result[0].total_cost}`);
    })
};

function totalCostAddedToTable(id, quantity) {
    connection.query(`UPDATE products SET product_sales=product_sales+${quantity}*price WHERE item_id=${id}`, function(err, result) {
        if (err) throw err;
    })
}
