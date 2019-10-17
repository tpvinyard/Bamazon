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
    runSupervisor();
});

function runSupervisor() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View Products Sales by Department',
                'Create New Department',
                'Exit'
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
            case "View Products Sales by Department":
                viewProductSales();
                break;
        
            case "Create New Department":
                createNewDepartment();
                break;
        
            case "Exit":
                connection.end();
                break;
            }
        });
}

function viewProductSales() {
    let queryParam = "SELECT department_id, departments.department_name, over_head_costs, SUM(product_sales) AS product_sales, (over_head_costs-SUM(product_sales)) as total_profit "+ 
                        "FROM departments "+
                        "LEFT JOIN products on departments.department_name = products.department_name " +
                        "GROUP BY department_id, departments.department_name, over_head_costs;"
    connection.query(queryParam, function (err, results) {
        if (err) throw err;
        console.log('');
        console.table(results);
        console.log('');
        runSupervisor();
    })
};

function createNewDepartment() {
    inquirer
    .prompt([
        {
            name: 'departmentName',
            type: 'text',
            message: 'What is the name of the department you would like to add?'
        },
        {
            name: 'overheadCosts',
            type: 'number',
            message: "What are the department's overhead costs?"
        },
    ])
    .then(function(answer) {
        connection.query(
            `INSERT INTO departments (department_name, over_head_costs)
            VALUES ('${answer.departmentName}', ${answer.overheadCosts})`,
            function(err) {
                if (err) throw err;
                console.log('');
                console.log('New Department Added!');
                console.log('');
                runSupervisor();
            }
        )
    })
}