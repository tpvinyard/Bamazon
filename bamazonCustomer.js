const mysql = require("mysql");
const inquirer = require("inquirer");

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
        console.log('id | product name | department name | price | quantity available');
        for (let result of results) {
            console.log(`${result.item_id} | ${result.product_name} | ${result.department_name} | ${result.price} | ${result.stock_quantity}`);
        }
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

            })
    })
}

function checkQuantity(id, quantity) {
    connection.query("SELECT stock_quantity quantity FROM products WHERE ")
}
