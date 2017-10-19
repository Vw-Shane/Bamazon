// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy. 
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
    afterConnection();

    // //take this out later
    //  connection.end();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID #" + res[i].id + " | Item Name " + res[i].product_name + " | Found in " + res[i].department + " Department" + " | Cost $" + res[i].price + " | " + res[i].stock_quantity + " in Stock");
        }
        console.log("-----------------------------------");
    });

}
//this function needs to be somewhere else..... but Where?
purchase();

function purchase() {
    inquirer.prompt([{
            name: "userWants",
            type: "input",
            message: "What is the Id for the product you would like to purchase?"
        },
        {
            name: "userAmount",
            type: "input",
            message: "How many would you like?"
        }

    ]).then(function(answers) {
        connection.query("SELECT * FROM products", function(err, res) {
            var itemID = answers.userWants;
            var quantity = answers.userAmount;
            // takes the user input and subtracts one from the id in order to equal arrays postion to the id number
            var dynamicID = res[itemID - 1];
            // 1 will remain but 9 will need to be dynamic based on highst id number in table
            if (itemID < 1 || itemID > 9) {
                console.log("Opps please choose an ID from the above list");
                purchase();
            } else if (quantity > dynamicID.stock_quantity || quantity < 1) {
                console.log("Sorry we do not have that many " + dynamicID.product_name + "s");
            } else {
                // takes the user input and subtracts one from the id in order to equal arrays postion to the id number
                // var dynamicID = res[itemID - 1];
                console.log("You've selected " + quantity + " " + dynamicID.product_name + "'s");
                stockQuanityChange();

                function stockQuanityChange() {
                    var newQuntity = dynamicID.stock_quantity - quantity;
                    
                    console.log("-----------------------------------");
                    // console.log(itemID);
                    var query = connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                                stock_quantity: newQuntity
                            },
                            {
                                id: itemID
                            }
                        ],
                        function(err, res) {
                            
                            console.log("Your total is $" + quantity * dynamicID.price);
                           connection.end();
                        }
                    );

                };


            };

        });
    });
};


