//Testing html link
console.log("hello world");

// Thesaurus items
var userVALUE = $("#user-input").val();
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
        searchWord(userVALUE.trim());
        $("#user-input").val("");
    }
})

function searchWord(userVALUE){
    // Dictionary items
    var dictKEY = "?key=e88ef112-883a-4f54-975c-e1af4ff0d8c3";
    var dictURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" 
        + userVALUE
        + dictKEY;

    $.ajax({
        type: "GET",
        url: dictURL,
        dataType: "json",
    }).done(function(data){
        //Testing dictionary link
        console.log('Dictionary SUCCESS');
        console.log("Full DICTIONARY response:");
        console.log(data);
        console.log("Gets date: data[0].date: \n" + data[0].date);
        // Not all words have etymology!
        console.log("Gets etymology: \n" + data[0].et[0][1]);
        console.log("Gets definitions: data[0].shortdef: \n" + data[0].shortdef);
    }).fail(function(){
        console.log("failed");
    })

}



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