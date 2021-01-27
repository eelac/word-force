//Testing html link
console.log("hello world");

// Click or push enter to work
$("#search-button").click(function(e){
    e.preventDefault();
    var userVALUE = $("#user-input").val();

    // catches empty field
    if(userVALUE == null || userVALUE == ""){
        alert("Please enter a word!");
    } else {
        // Testing console
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
        url: dictURL
    }).done(function(data){
        //Testing dictionary link
        console.log('Dictionary SUCCESS');
        console.log("Full DICTIONARY response:");
        console.log(data);
        searchThesaurus(userVALUE);
        // Not all words have etymology!
        // Catches if random nonesense is input
        if(data.length === 0) {
            alert("Please enter a valid entry.");
        } else if(!data[0].et) {
            // Catches any word that doesn't have an etymology array
            alert("Please enter the base word.");
        } else {
            var etym = uncurl(data[0].et[0][1]);
            // Clears Information field
            $(".post-here").text("");
            // Creates title with userValue
            postAppend("<h1 class='value-text'>" + userVALUE.toLowerCase().trim() + "</h1>", ".post-here");
            // Creates Definition
            postAppend("<strong>Definition:</strong> " + data[0].shortdef, ".post-here");
            // Creates date
            postAppend("<strong>Date:</strong> " + data[0].date, ".post-here");
            // Creates Etymology
            postAppend("<strong>Etymology:</strong> " + etym, ".post-here");

            // Creates synonyms list
            searchThesaurus(userVALUE);
            $(".history-title-here").text("");
            // Creates Last 5 Search History Title Text
            $(".history-title-here").append("<h3 class='search-history-text'><u>Last Five Search History:</u></h3>")
            // Appends userValue into history 
            historyAppend(userVALUE.toLowerCase().trim());
        }

    }).fail(function(){
        console.log("failed");
    })
}

// Thesaurus function
function searchThesaurus(userVALUE){
    // Thesaurus items
    var thesKEY = "?key=a6fccfe6-b8af-43f4-9d56-746368f04ea1";
    var thesURL = "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/" 
        + userVALUE 
        + thesKEY;

    //testing THESAURUS
    $.ajax({
        type: "GET",
        url: thesURL,
        dataType: "json",
    }).done(function(data) {
        console.log("success");
        console.log("Thesaurus: ");
        console.log(data[0].meta.syns[0]);
        // Clears synonym field
        $(".synonym-here").text("");
        var syns = data[0].meta.syns[0];
        postAppend("<strong>Synonyms:</strong> " + syns.join(", "), ".synonym-here");
    }).fail(function() {
        console.log("thesaurus failed");
    })
}

// changes opacity of the cards
$(".card-show").css("opacity", "0.6").css("transition", "0.5s");
// on mouseover changes darkens opacity
$(".card-show").on("mouseover", function() {
    $(this).css("opacity", "1");
})
// on mouseout, changes opacity back to  light
$(".card-show").on("mouseout", function() {
    $(this).css("opacity", "0.6");
})

// Click cards start fuctions
$(".card-show").click(function(){
    var dataValue = $(this).data("value");
    console.log(dataValue);
    if(dataValue === 1){
        // old norse / dutch /scandinavian
        console.log("this is the first card");
        var norse = ["anger", "cake", "viking", "reindeer", "outlaw", "raft", "bumpkin", "awkward", "bag", "dirt", "die", "caboose"];
        searchWord(looper(norse));
    } else if(dataValue === 2){
        // chinese / japanese
        console.log("This is the second card");
        var chinese = ["brainwash", "ketchup", "typhoon", "chowchow", "kumquat", "ramen", "tycoon", "wok", "tofu", "tea", "rickshaw"];
        searchWord(looper(chinese));
    } else {
        // spanish
        console.log("This is the third card");
        var spanish = ["banana", "cockroach", "crimson", "mustang", "embargo", "guacamole", "guerrilla", "hurricane", "macho", "mosquito", "patio"];
        searchWord(looper(spanish));
    }
})

//Appends a list of history
function historyAppend(text) {
    var li = $("<li>");
    var ul = $(".history-here");
    ul.append(li.append(text));

    // Added max history list limit 5
    var maxHistory = 5;

    $(".history-here").each(function(){
        $(this).find("li").each(function(index){
            if(index >= maxHistory){
                $(".history-here > li:first-child").remove();
            }
        })
    })
}

// Appends the required list of the word typed onto the page, above the history
function postAppend(text, targetContainer) {
    var div = $("<div>");
    var divContainer = $(targetContainer);
    divContainer.append(div.append(text));
}

// Removes curls around API data's {it}...{/it}
function uncurl(text) {
    var uncurled = text
        .replaceAll("{it}", "<i>")
        .replaceAll("{/it}", "</i>");
    return uncurled;
}

function looper(array){
    var random = Math.floor(Math.random() * array.length);
    return array[random];
}