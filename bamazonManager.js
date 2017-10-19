// invty will be used as short hand for inventory 
var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    managerOption();

    // //take this out later
    //  connection.end();
});

function managerOption() {
    inquirer.prompt([{
        type: 'list',
        message: 'Select a command from the list',
        choices: ["View products for sale", "Low invetory items", "Add too invetory", "Add new product"],
        name: "track"
    }]).then(function(listPick) {
        switch (listPick.track) {
            case "View products for sale":
                getInfo();
                break;
            case "Low invetory items":
                getInvty();
                break;
            case "Add too invetory":
                addInvty();
                break;
            case "Add new product":
                addProduct();

        }
    });
};



// this function will display all information 
function getInfo() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID #" + res[i].id + " | Item Name " + res[i].product_name + " | Found in " + res[i].department + " Department" + " | Cost $" + res[i].price + " | " + res[i].stock_quantity + " in Stock");
        }
        console.log("-----------------------------------");
        runAgain();
    });
};

function getInvty() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
        if (res[i].stock_quantity < 1000) {
            console.log(res[i].product_name + " has " + res[i].stock_quantity +" units");
        }
        };
    runAgain();
});
};

function addInvty() {
    console.log("I just met you and this is crazy");
    runAgain();
};

function addProduct() {
    console.log("Hey oh Lets go!");
    runAgain();
};

function runAgain() {
    inquirer.prompt([{
        type: 'list',
        message: "Would you like to run a different task ?",
        choices: ["Yes", "No"],
        name: "choose"
    }]).then(function(choicePick) {
        switch (choicePick.choose) {
            case "Yes":
                managerOption();
                break;
            case "No":
                console.log("Signing off");
                connection.end();
                break;
        }

    });
}