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
        console.log('');
        console.table(results);
        console.log('');
        runManager();
    })
};

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
        if (err) throw err;
        console.log('');
        console.table(results);
        console.log('');
        runManager();
    })
}

function addToInventory() {
    inquirer
    .prompt([
        {
            name: 'choice',
            type: 'number',
            message: 'What is the id of the product that you want to add more of?'
        },
        {
            name: 'quantity',
            type: 'number',
            message: 'How many of those would you like to add to inventory?'
        }
    ])
    .then(function(answer) {
        connection.query(
            `UPDATE products SET stock_quantity=stock_quantity+${answer.quantity} WHERE item_id=${answer.choice}`,
            function(err) {
                if (err) throw err;
                console.log('');
                console.log('Inventory Added!');
                console.log('');
                runManager();
            }
        )
    })

}

function addNewProduct() {
    inquirer
    .prompt([
        {
            name: 'productName',
            type: 'text',
            message: 'What is the name of the product you would like to add?'
        },
        {
            name: 'department',
            type: 'text',
            message: 'What department is this item in?'
        },
        {
            name: 'price',
            type: 'number',
            message: 'What is the price of the item?'
        },
        {
            name: 'quantity',
            type: 'number',
            message: "What is it's initial quantity?"
        }
    ])
    .then(function(answer) {
        connection.query(
            `INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
            VALUES ('${answer.productName}', '${answer.department}', ${answer.price}, ${answer.quantity}, 0)`,
            function(err) {
                if (err) throw err;
                console.log('');
                console.log('New Item Added!');
                console.log('');
                runManager();
            }
        )
    })
}