console.log("hello world");

// Dictionary items
var dictKEY = "e88ef112-883a-4f54-975c-e1af4ff0d8c3";
var userVALUE = "run";
var dictURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" 
    + userVALUE 
    + "?key=" 
    + dictKEY;

// Thesaurus items
var thesKEY = "a6fccfe6-b8af-43f4-9d56-746368f04ea1";
var thesURL = "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/" 
    + userVALUE 
    + "?key=" 
    + thesKEY;

// Testing DICTIONARY 
console.log(dictURL);

$.ajax({
    type: "GET",
    url: dictURL,
    dataType: "json",
    success: function(data){
        console.log('Diciontary SUCCESS');
        console.log("Full DICTIONARY response:");
        console.log(data);
        console.log("DICTIONARY: data[0].date: \n" + data[0].date);
        console.log("data[0].shortdef: \n" + data[0].shortdef);
    }
})



/*

testing THESAURUS
works, but leaving commented out for now

$.ajax({
    type: "GET",
    url: thesURL,
    dataType: "json",
    success: function(data){
        console.log("Thesaurus SUCCESS");
    }
})

*/