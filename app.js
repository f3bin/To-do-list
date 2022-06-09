const express = require("express");
const bodyParser = require("body-parser");
const urlencoded = require("body-parser/lib/types/urlencoded");

const app = express();

var items = ["wake up by 4:00 am", "Finish  remaining project", "Grocery Shoping"];
var workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res) {

    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newItems: items });

});
app.get("/work", function (req, res) {
    res.render("list", { listTitle: "work list", newItems: workItems });

});



app.post("/", function (req, res) {

    var item = req.body.itemToAdd;
    var workItem = req.body.itemToAdd;

    if (req.body.list === "work") {
        workItems.push(workItem);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }



});




app.listen("3000", function () {
    console.log("port started at server 3000");
});