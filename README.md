# SCOIR Technical Interview for Back-End Engineers
This repo contains an exercise intended for Back-End Engineers.

## How-To
1. The user goes to the site
1. Uploads the csv file and submits
1. If the user hasn't uploaded the file before
1. A button will appear to download the JSON file

## Assumptions
1. A UI for the user to upload the file.
1. When submitted the csv file is sent to the server
1. The server then checks with mongoDB if the csv file name is the same as the ones in mongoDB
1. If the file name is the same as the data from mongoDB
1. Then a message will pop up saying "File already used before"
1. If the file name is different then the csv file's name is saved into mongoDB
1. The csv data will also be stored in a seperate collection
1. The data is pulled from mongoDB and send to the front end
1. The collection of data from the csv file will be dropped.
1. A button will appear in the UI and will be able to download
1. The JSON file should be the same name as the csv file.