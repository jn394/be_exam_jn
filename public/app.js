$(document).ready(function () {

    $("#submitForm").submit(function (event) {
        event.preventDefault();

        // The data from the csv file 
        let uploadFile = new FormData();
        let files = $("#inputFile").get(0).files
        let myUpload = files[0]
        let csvFileName = myUpload.name.substring(0, myUpload.name.length - 4)

        console.log(files[0])
        uploadFile.append("myFile", myUpload, csvFileName);

        let jsonData;


        let xhr = new XMLHttpRequest();

        // Waits for the back end to respond
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {

                if (xhr.response === "File has been used before!") {
                    alert(xhr.response);
                }
                else {
                    console.log(xhr.response);

                    jsonData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(xhr.response));

                    // Creates a button to download the JSON file
                    $('<button type="button"><a href="data:' + jsonData + '" download="' + csvFileName + '.json">Download JSON</a></button>').appendTo('#jsonDownload')
                }
            }
        }

        // Sends the csv file to the back end
        xhr.open("POST", "/csvCreateData", true);

        xhr.send(uploadFile);
    })

})