//Testing html link
console.log("hello world");

// Click or push enter to work
$("#search-button").click(function(e) {
    e.preventDefault();
    var userVALUE = $("#user-input").val();

    // catches empty field
    if(userVALUE == null || userVALUE == "") {
        alert("Please enter a word!");
    } else {
        // Testing console
        console.log(userVALUE);
        searchWord(userVALUE.trim());
        clearField("#user-input");
    }
})

function searchWord(userVALUE) {
    // Dictionary items
    var dictKEY = "?key=e88ef112-883a-4f54-975c-e1af4ff0d8c3";
    var dictURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" 
        + userVALUE 
        + dictKEY;

    $.ajax({
        type: "GET",
        url: dictURL
    }).done(function(data) {
        //Testing dictionary link
        console.log("Full DICTIONARY response:");
        console.log(data);
        // Catches if random nonesense is input
        if(data.length === 0) {
            alert("Please enter a valid entry.");
        } else if(!data[0].et) {
            // Catches any word that doesn't have an etymology array
            alert("Check your spelling and/or enter the base word (ie: 'run' instead of 'running'");
        } else {
            var etym = uncurl(data[0].et[0][1]);
            // Clears Information field
            clearField(".post-here");
            // Creates title with userValue
            postAppend("<h1 class='value-text'>" + userVALUE.toLowerCase().trim() + "</h1>", ".post-here");
            // Creates Definition
            postAppend("<strong>Definition:</strong> " + data[0].shortdef, ".post-here");
            // Creates date
            postAppend("<strong>Date:</strong> " + data[0].date, ".post-here");
            // Creates Etymology
            postAppend("<strong>Etymology:</strong> " + etym, ".post-here");
            // Creates synonym list
            searchThesaurus(userVALUE.toLowerCase().trim());

            // Clears history field
            clearField(".history-title-here");
            // Creates Last 5 Search History Title Text
            postAppend("<h3 class='search-history-text'><u>Previous Searches:</u></h3>", ".history-title-here");
            // Appends userValue into history 
            historyAppend(userVALUE.toLowerCase().trim());
        }
    }).fail(function() {
        console.log("failed");
    })
}

// Thesaurus function
function searchThesaurus(userVALUE) {
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
        console.log(data);
        if(!data[0].meta) {
            // Clear synonym field
            clearField(".synonym-here");
            postAppend("<strong>Synonyms:</strong> No synonyms available.", ".synonym-here");
        } else {
            // Clears synonym field
            clearField(".synonym-here");
            var syns = data[0].meta.syns[0];
            postAppend("<strong>Synonyms:</strong> " + syns.join(", "), ".synonym-here");
        }
    }).fail(function() {
        console.log("thesaurus failed");
    })
}

// Fades out cards by default and fades in on hover
fadingIn(".card-show", "0.6", "1", "0.5s");

// Click cards start fuctions
$(".card-show").click(function() {
    var dataValue = $(this).data("value");
    if(dataValue === 1) {
        // old norse / dutch /scandinavian
        var norse = [
            "anger", "cake", "viking", "reindeer", "outlaw", "raft", "bumpkin", "awkward", "bag", "dirt", 
            "die", "caboose", "bait", "egg", "coleslaw", "cashier", "dapper", "furlough", "iceberg", "luck"
        ];
        searchWord(randomLoop(norse));
    } else if(dataValue === 2) {
        // chinese / japanese
        var chinese = [
            "brainwash", "ketchup", "typhoon", "chowchow", "kumquat", "ramen", "tycoon", "wok", "tofu", "tea", 
            "rickshaw", "karaoke", "emoji", "origami", "sayonara", "wonton", "zen", "shiatsu", "sushi"
        ];
        searchWord(randomLoop(chinese));
    } else {
        // spanish
        var spanish = [
            "banana", "cockroach", "crimson", "mustang", "embargo", "guacamole", "guerrilla", "hurricane", "macho", "mosquito", 
            "patio", "alligator", "tango", "matador", "cargo", "renegade", "vanilla", "bonanza", "tomato", "torque"
        ];
        searchWord(randomLoop(spanish));
    }
})

//Appends a list of history
function historyAppend(text) {
    $(".history-here").append($("<li>").append(text));

    // Added max history list limit 5
    var maxHistory = 5;

    $(".history-here").each(function() {
        $(this).find("li").each(function(index){
            if(index >= maxHistory){
                $(".history-here > li:first-child").remove();
            }
        })
    })
}

// Fade out an object and fade them back in on hover
function fadingIn(object, opacityStart, opacityEnd, time) {
    // changes opacity of the cards
    $(object).css("opacity", opacityStart).css("transition", time);
    // on mouseover changes darkens opacity
    $(object).on("mouseover", function() {
        $(this).css("opacity", opacityEnd);
    })
    // on mouseout, changes opacity back to  light
    $(object).on("mouseout", function() {
        $(this).css("opacity", opacityStart);
    })
}

// Appends the required list of the word typed onto the page with provided target container
function postAppend(text, targetContainer) {
    $(targetContainer).append($("<div>").append(text));
}

// Removes curls around API data's {it}...{/it}
function uncurl(text) {
    return text.replaceAll("{it}", "<i>").replaceAll("{/it}", "</i>");
}

// Loops through certain arrays in random order
function randomLoop(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function clearField(object) {
    $(object).text("").val("");
}