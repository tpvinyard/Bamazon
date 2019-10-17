# Bamazon

## Description
Bamazon is a command-line application built with Node.js and MySQL that allows a user to construct a MySQL database and then edit said database with three distinct javascript files. `bamazonCustomer.js` allows the user to view the products table and then make a 'purchase' from that table. `bamazonManager.js` allows the user view products for sale, view low inventory, add inventory, and add new items. `bamazonSupervisor.js` produces a view on the fly of cost metrics by joining the products and departments tables.

## Instructions
1. Initialize Bamazon by cloning this repository
2. Create Spotify Developer API Key at https://developer.spotify.com
3. Run `npm -v` and `node -v` to verify installation of npm and node.js
4. In created directory, run npm install in order to install necessary node packages
5. Create tables in MySQL database (can use MySQL Workbench) from the .sql files in this repo
6. Now you are ready to take full advantage of Bamazon. From the terminal, you can access/view/edit the database as follows.
7. Bamazon Customer functionality: `node bamazonCustomer.js`
8. Bamazon Manager functionality: `node bamazonManager.js`
9. Bamazon Supervisor functionality: `node bamazonSupervisor.js`



Everything is written and maintained by me (tpvinyard). Thanks for visiting!
