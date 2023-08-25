// console.log(req.body) ? The req.body object represents the parsed body of the incoming HTTP POST request. It contains data submitted from a form or sent as JSON in the request body.
// By logging the req.body object, you can inspect the data being sent from the client to the server and troubleshoot any issues related to form submissions or data processing. It's a common debugging technique to gain insight into what data your server is receiving from the client. Keep in mind that logging sensitive information should be avoided in production environments.

const express = require("express");
const bodyParser = require("body-parser");
const { getDate } = require("./date");
const date = require(__dirname + "/date.js");

const app = express();

let items = ["hey", "hi", "yo"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {

    let day = date.getDate();
    // we can use two functions
    // let day = date.getDate();

    res.render("list", {
        listTitle: day,
        newListItems: items
    });

});

app.post("/", function (req, res) {

    let item = req.body.newItem;
    console.log(req.body);

    if(req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }  
 
});

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});

});

app.get("/about", function(req, res) {
    res.render("about");
});

// app.post("/work", function (req, res) {
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
//     console.log(req.body);
// })

app.listen(3000, function () {
    console.log("Server started at port 3000");
});