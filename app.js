//Thomas Blais ------ TBlais Productions --------
//A website for projects, cloud storage and playing flash games.

const express = require("express");
const app = express();
const bodyParser = require("body-parser");   //lets you print data in the console with put req  uest
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

//this connects the server to the mongodb database and calls an error if it doesnt connect
//make sure to add ip to mongodb whitelist
mongoose.connect("mongodb+srv://tblais1224:ana1224@tblaisproductions-rbrxs.mongodb.net/test?retryWrites=true", {
    useNewUrlParser: true
}, function(error){
    if (error) {
        console.log(error);
    }else {
        console.log("CONNECTED TO MONGO DATABASE");
    }
});

//this creates the schema (structure) for the games database
var gameSchema = new mongoose.Schema({
    title: String,
    creator: String,
    width: Number,
    height: Number,
    fileName: String,
    thumbnailFile: String
});

//creates a model for the template to use and structure a platform to store data on
var gamesdb = mongoose.model("gamesdb", gameSchema);

app.use(express.static("public")); //sets public folder as the external file folder    
app.set("view engine", "ejs"); //sets the view engine to .ejs so the res.render(something.ejs) so dont need to put .ejs
app.use(bodyParser.urlencoded({extended: true}));

app.use(fileUpload());

app.get("/", function(req, res){
    res.render("homepage");
});

//:title/:creator/:width/:height/:fileName     dont need to use this because all the infor can be set to one id in the mongdb and then gathered. this is more secure and easier
app.get("/game/:id", function(req, res) {
    var id = req.params.id;

    //this searches the idea and finds the document associated with it
    gamesdb.findById(id, function(error, foundGame){
        if(error){
            console.log("Could not find the game with the current id!");
        }else{
            res.render("game", {
                title: foundGame.title,
                creator: foundGame.creator,
                width: foundGame.width,
                height: foundGame.height,
                fileName: foundGame.fileName
            });
        }
    });
});

app.get("/list", function(req,res) {
    //retrieves games from mongodb.
    //can change data in mongodb collections on site
    gamesdb.find({}, function(error, games){
        if(error){
            console.log("There was a problem getting all of the games from the database.");
            console.log(error);
        }else{
            res.render("list", {
                gameslist: games
            });
        }
    });
});

//always use app.get and render to get the html or ejs and load that routes webpage
app.get("/addgame", function(req, res) {
    res.render("addgame");
});


//this grabs the body of the /addgame route and stores it as data
app.post("/addgame", function(req, res) {
    var data = req.body;

    //req.files is used to get the file input by the user
    var gameFile = req.files.gameFile;
    var imageFile = req.files.imageFile;

    //gameFile.mv()   lets you move the user uploaded file to the specified location
    //gameFile.name is the name of the file obviously
    gameFile.mv("public/games/" + gameFile.name, function(error){
        if (error){
            console.log("Could not upload the game file.");
            console.log(error);
        }else{
            console.log("Game file was successfully uploaded!!!")
        }
    });

    imageFile.mv("public/games/thumbnails/" + imageFile.name, function(error){
        if (error){
            console.log("Could not upload the image file.");
            console.log(error);
        }else{
            console.log("Image file was successfully uploaded!!!")
        }
    });

    //this addeds the data inputed into the gamesdb collection with this format
    gamesdb.create({
        title: data.title,
        creator: data.creator,
        width: data.width,
        height: data.height,
        fileName: gameFile.name,
        thumbnailFile: imageFile.name
    }, function(error, data){
        if(error){
            console.log("There was a problem adding this game to the database.");
        }else{
            console.log("Game was added to the database successfully.");
            console.log(data);
        }
    });
    //this reroutes the user to the /list route, list of games after adding games
    res.redirect("/list");
});

app.get("/fruitstand", function(req, res){
    res.render("fruitstand");
});

app.post("/fruitstand", function(req,res){
    //add shopping cart js to the info entered in fruitstand route
    var data = req.body;
    console.log(data);
    res.render("/fruitstand");
});


app.listen("3000", function(){
    console.log("tblais productions website is now ononline, PORT 3000");
});








// this is how you pull data out of the mongo database
// gamesdb.find({}, function(error, data){
//     if (error){
//         console.log("Could not find any data!");
//     }else{
//         console.log("Here is all the data from our collection");
//         console.log(data);
//     }
// });

//putting games here makes accessible in all requests
//use https://mlab.com/ to build and setup database
// const games = [{
//     title: "Learn to Fly 2", 
//     creator: "light_bringer777",
//     width: 640,
//     height: 480,
//     fileName: "learntofly2.swf",
//     thumbnailFile: "learn-to-fly-2.jpg"
// },
// {
//     title: "Epic War 4",
//     creator: "rudy_sudarto",
//     width: 700,
//     height: 525,
//     fileName: "epicwar4.swf",
//     thumbnailFile: "epic-war-4-alliance-of-heroes.jpg"
// },
// {
//     title: "Platform Racing 2",
//     creator: "jiggmin",
//     width: 550,
//     height: 400,
//     fileName: "platformracing2.swf",
//     thumbnailFile: "platform-racing-2.jpg"
// }
// ];



// this grabs api pics depending on specified page in route 
// app.get("/pics/:page", function(req, res){
//     var pageNumber = req.params.page;
//     request("https://api.unsplash.com/photos?client_id=320f364bfd7b6624975c74bd2bf3ade04bc8e6daba26bc985c2bbac3acdbf58f&page=" + pageNumber, function(error, response, body){
//         if (error){
//             console.log(error);
//         }else{
//             res.render("pictures", {
//                 picData: JSON.parse(body),
//                 pageNumber: pageNumber
//             });
//         }
//     });
// });

//this gets search apipics page
// app.get("/search", function(req, res){
//     res.render("search");
// });


// app.get("/pics", function(req, res){
//     var searchTerm = req.query.searchterm; // sets searchTerm to what use searchs
//     var pageNumber = req.query.page;
//     console.log(searchTerm);
//     request("https://api.unsplash.com/search/photos?client_id=320f364bfd7b6624975c74bd2bf3ade04bc8e6daba26bc985c2bbac3acdbf58f&query=" + searchTerm + "&page=" + pageNumber, function(error, response, body){
//         if (error){
//             console.log(error);
//         }else{
//             res.render("pictures", {
//                 picData: JSON.parse(body),
//                 pageNumber: pageNumber
//             });
//         }
//     });
// });