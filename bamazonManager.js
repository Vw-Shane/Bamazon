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
        switch(listPick.track){
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
console.log("LOL")
};

function getInvty() {
    console.log("Hey whats up hello")
};

function addInvty() {
    console.log("I just met you and this is crazy");
};

function addProduct() {
    console.log("Hey oh Lets go!");  
};


