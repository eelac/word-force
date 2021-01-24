//Testing html link
console.log("hello world");

// Dictionary items
var dictKEY = "e88ef112-883a-4f54-975c-e1af4ff0d8c3";
var userVALUE = $("#user-input").val().trim();
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

// Testing DOM links
$("#search-button").click(function(e){
    e.preventDefault();
    var userVALUE = $("#user-input").val();

    // catches empty field
    if(userVALUE == null || userVALUE == ""){
        alert("Please enter a word!");
    } else {
        console.log(userVALUE.trim());
        $("#user-input").val("");
    }
})


// Testing DICTIONARY 
console.log(dictURL);

$.ajax({
    type: "GET",
    url: dictURL,
    dataType: "json",
    success: function(data){
        //Testing dictionary link
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

console.log(thesURL);

$.ajax({
    type: "GET",
    url: thesURL,
    dataType: "json",
    success: function(data){
        console.log("Thesaurus SUCCESS");
    }
})

*/