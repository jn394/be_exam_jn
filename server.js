
// A UI for the user to upload the file.
// When submitted the csv file is sent to the server
// The server then checks with mongoDB if the csv file name is the same as the ones in mongoDB
// If the file name is the same as the data from mongoDB
// Then a message will pop up saying "File already used before"
// If the file name is different then the csv file's name is saved into mongoDB
// The csv data will also be stored in a seperate collection
// The data is pulled from mongoDB and send to the front end
// The collection of data from the csv file will be dropped.
// A button will appear in the UI and will be able to download
// the JSON file should be the same name as the csv file.

const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const PORT = 3000;
const csv = require('fast-csv');
const app = express();
const db = require("./models");

// Middleware
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// MongoDB connection
mongoose.connect("mongodb://localhost/csvDB", { useNewUrlParser: true });

// Routes
app.post("/csvCreateData", function (req, res) {
    let myCSV = req.files.myFile
    let isSame = false;
    let myData = [];

    console.log(myCSV);
    console.log(myCSV.name)

    // Pulls data from the collection csvFileName
    db.csvFileName.find({})
        .then(function (csvFileName) {
            console.log(csvFileName);

            // Searches thur all the data entrys and see if the csv file name is the same
            for (var i = 0; i < csvFileName.length; i++) {
                if (csvFileName[i].fileName === myCSV.name) {
                    isSame = true;
                }
            }

            // If isSame is thur then a message will be sent to the front end
            if (isSame) {
                res.send("File has been used before!")
            }
            else {
                // The data from the csv file that was uploaded will be converted into JSON and also the correct format
                csv
                    .fromString(myCSV.data.toString(), {
                        renameHeaders: true,
                        headers: ["id", "name.first", "name.middle", "name.last", "phone"],
                        ignoreEmpty: true
                    })
                    .on("data", function (data) {
                        console.log(data);
                        myData.push(data);
                    })
                    .on("end", function () {

                        // Create a entry in the collection to store all the csv file names
                        db.csvFileName.create({ fileName: myCSV.name })
                            .then(function (data) {

                                // Create a entry in the collection csvData to store the converted JSON data
                                db.csvData.create(myData)
                                    .then(function (data) {
                                        console.log(data);

                                        // Pulls data that was created earlier 
                                        db.csvData.find({})
                                            .then(function (data) {

                                                let dataJSON = data;

                                                console.log(dataJSON);

                                                // Removes all data from the collection
                                                db.csvData.deleteMany({})
                                                    .then(function (data) {
                                                        console.log("You have dropped the collection!");
                                                        // Sends the JSON data to the front end
                                                        res.send(dataJSON);
                                                    })
                                                    .catch(function (err) {
                                                        return res.json(err);
                                                    })
                                            })
                                            .catch(function (err) {
                                                return res.json(err);
                                            });
                                    })
                                    .catch(function (err) {
                                        return res.json(err);
                                    });
                            })
                            .catch(function (err) {
                                return res.json(err);
                            })
                    });
            }
        })
        .catch(function (err) {
            res.json(err);
        });

});


app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});