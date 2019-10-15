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
    runManager();
});

function runManager() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product',
                'Exit'
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
            case "View Products for Sale":
                viewProducts();
                break;
        
            case "View Low Inventory":
                viewLowInventory();
                break;
        
            case "Add to Inventory":
                addToInventory();
                break;
        
            case "Add New Product":
                addNewProduct();
                break;
        
            case "Exit":
                connection.end();
                break;
            }
        });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        const transformed = results.reduce((acc, {item_id, ...x}) => { acc[item_id] = x; return acc}, {})
        console.table(transformed);
        runManager();
    })
};

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
        if (err) throw err;
        const transformed = results.reduce((acc, {item_id, ...x}) => { acc[item_id] = x; return acc}, {})
        console.table(transformed);
        runManager();
    })
}

function addToInventory() {

}

function addNewProduct() {

}