// Fades out cards by default and fades in on hover
fadingIn(".card-show", "0.6", "1", "0.5s");
// Removes placeholder on focus of search bar
onFocusRemoveAttr("#user-input", "placeholder", "Enter word here");

// click on history to search
$(".card-history").on("click", "li", function() {
    searchWord($(this).text());
})

// Click or push enter to work
$("#search-button").click(function(e) {
    e.preventDefault();
    var userVALUE = $("#user-input").val();

    // catches empty field
    if(userVALUE == null || userVALUE == "") {
        failMessage(2);
    } else {
        // Start the manual search
        searchWord(userVALUE.trim());

        var formatVal = userVALUE.toLowerCase().trim();
        if(formatVal === "link" || formatVal === "hero") {
            addBG(".card-append", "https://www.destructoid.com/ul/560382-ZeldaARt.jpg", "cover");
        } else if(formatVal === "sword") {
            addBG(".card-append", "https://assets.kamuicosplay.com/wp-content/uploads/2020/10/Master_Sword_Zelda_BotW_Cosplay_Kamui_2.jpg", "cover");
        } else if(formatVal === "tunic") {
            addBG(".card-append", "https://www.smashbros.com/assets_v2/img/fighter/link/main2.png", "contain");
        } else if(formatVal === "dog" || formatVal === "puppy") {
            addBG(".card-append", "https://www.doghealth.com/images/Benefits_of_multiple_dogs.jpg", "contain");
        } else if(formatVal === "cat" || formatVal === "kitten") {
            addBG(".card-append", "https://www.comfortzone.com/-/media/Images/ComfortZone-NA/US/Blog/mean-cats.jpg?h=800&la=en&w=1000&hash=2BDEE56E415553AE50920E844D20D1BE2B92D2BD", "cover");
        } else if(formatVal === "shield") {
            addBG(".card-append", "https://swordskingdom.com/media/catalog/product/cache/1/thumbnail/1000x/17f82f742ffe127f42dca9de82fb58b1/l/i/link-hylian-shield-replica-from-zelda_1.jpg", "contain");
        } else if(formatVal === "owl") {
            addBG(".card-append", "https://i.redd.it/6tm4uuu56et21.png", "contain");
        } else if(formatVal === "ocarina") {
            addBG(".card-append", "https://images-na.ssl-images-amazon.com/images/I/516Y2CgGMmL._AC_SL1000_.jpg", "cover");
        } else if(formatVal === "horse") {
            addBG(".card-append", "https://oyster.ignimgs.com/mediawiki/apis.ign.com/the-legend-of-zelda-hd/2/29/Epona44.jpg", "700px");
        } else if(formatVal === "legend") {
            addBG(".card-append", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu60QWuK0528q68fuxONSf4LtUDVoOOuuG3w&usqp=CAU", "contain");
        } else {
            // Creates background image to the definition card
            var backgroundPics = [
                "https://storage.pixteller.com/designs/designs-images/2019-03-27/05/simple-background-backgrounds-passion-simple-1-5c9b95bd34713.png",
                "https://storage.pixteller.com/designs/designs-images/2019-03-27/05/simple-background-backgrounds-passion-simple-1-5c9b95d09002a.png",
                "https://www.teahub.io/photos/full/34-340335_50-beautiful-and-minimalist-presentation-backgrounds-backgrounds-for.jpg",
                "https://mcdn.wallpapersafari.com/medium/95/21/4mJtkR.jpg",
                "https://preview.pixlr.com/images/800wm/1143/1/1143133380.jpg",
                "https://image.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1095.jpg",
                "https://www.plannthat.com/wp-content/uploads/2020/09/2-1.png",
                "https://www.plannthat.com/wp-content/uploads/2020/09/3-1.png"
            ];

            addBG(".card-append", randomLoop(backgroundPics), "cover");

        }
        // Clears everything
        clearAll();
    }
})

// Search through API for the word and database
function searchWord(userVALUE, dataVALUE) {
    // Dictionary items
    var dictKEY = "?key=e88ef112-883a-4f54-975c-e1af4ff0d8c3";
    var dictURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" 
        + userVALUE 
        + dictKEY;

    $.ajax({
        type: "GET",
        url: dictURL
    }).done(function(data) {
        // Adds border and bg to the history
        addBorder(".card-history");
        addBG(".card-history", "https://i.pinimg.com/originals/88/9b/86/889b86dfb255824f611c12f367f69cb6.png");
        // Catches if random nonesense is input
        if(data.length === 0) {
            // Catches odd nonenese 
            failMessage(1);
        } else if(!data[0].et) {
            // Catches any word that doesn't have an etymology array
            failMessage(3);
        } else {
            // Creates and posts definitions and synonyms to the correct buttons pressed
            if(dataVALUE === 1) {
                clearAll();
                posting(".post-norse", userVALUE, data);
                searchThesaurus(userVALUE.toLowerCase().trim(), dataVALUE);
                addBG(".latin-bg", "", "contain");
                addBG(".asian-bg", "", "contain");
                addBG(".norse-bg", "img/raven.png", "contain");
            } else if(dataVALUE === 2) {
                clearAll();
                posting(".post-asian", userVALUE, data);
                searchThesaurus(userVALUE.toLowerCase().trim(), dataVALUE);
                addBG(".norse-bg", "", "contain");
                addBG(".latin-bg", "", "contain");
                addBG(".asian-bg", "img/dragon.png", "contain");
            } else if(dataVALUE === 3) {
                clearAll();
                posting(".post-latin", userVALUE, data);
                searchThesaurus(userVALUE.toLowerCase().trim(), dataVALUE);
                addBG(".norse-bg", "", "contain");
                addBG(".asian-bg", "", "contain");
                addBG(".latin-bg", "img/bull.png", "contain");
            } else {
                clearAll();
                addBorder(".card-append");
                posting(".post-search", userVALUE, data);
                searchThesaurus(userVALUE.toLowerCase().trim());
                addBG(".latin-bg", "", "contain");
                addBG(".asian-bg", "", "contain");
                addBG(".norse-bg", "", "contain");
            }
        }

        function posting(target, userVALUE, data) {
            var etym = uncurl(data[0].et[0][1]);
            // Clears Information field
            clearField(target);
            // Creates title with userValue
            postAppend("<h1 class='value-text'>" + userVALUE.toLowerCase().trim() + "</h1>", target);
            // Creates Definition
            postAppend("<strong>Definition:</strong> " + data[0].shortdef, target);
            // Creates date
            postAppend("<strong>Date:</strong> " + data[0].date, target);
            // Creates Etymology
            postAppend("<strong>Etymology:</strong> " + etym, target);

            // Clears history field
            clearField(".history-title-here");
            // Creates Last 5 Search History Title Text
            postAppend("<h3 class='search-history-text'>Previous Searches:</h3>", ".history-title-here");
            // Appends userValue into history 
            historyAppend(userVALUE.toLowerCase().trim());
        }

    }).fail(function() {
        console.log("failed");
    })
}

// Thesaurus function
function searchThesaurus(userVALUE, dataVALUE) {
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
        if(!data[0].meta) {
            if(dataVALUE === 1) {
                noSynClearAndAppend(".synonym-norse");
            } else if(dataVALUE === 2) {
                noSynClearAndAppend(".synonym-asian");
            } else if(dataVALUE === 3) {
                noSynClearAndAppend(".synonym-latin");
            } else {
                noSynClearAndAppend(".synonym-search");
            }
        } else {
            if(dataVALUE === 1) {
                synClearAndAppend(".synonym-norse", data);
            } else if(dataVALUE === 2) {
                synClearAndAppend(".synonym-asian", data);
            } else if(dataVALUE === 3) {
                synClearAndAppend(".synonym-latin", data);
            } else {
                synClearAndAppend(".synonym-search", data);
            }
        }

        // Clears field of synonym and puts default values in
        function noSynClearAndAppend(target) {
            clearField(target);
            postAppend("<strong>Synonyms:</strong> No synonyms available.", target);
        }

        function synClearAndAppend(target, data) {
            // Clears synonym field
            clearField(target);
            var syns = data[0].meta.syns[0];
            postAppend("<strong>Synonyms:</strong> " + syns.join(", "), target);
        }

    }).fail(function() {
        console.log("thesaurus failed");
    })
}

// Click cards start fuctions
$(".card-show").click(function() {
    var dataValue = $(this).data("value");
    if(dataValue === 1) {
        // old norse / dutch /scandinavian
        var norse = [
            "anger", "cake", "viking", "reindeer", "outlaw", "raft", "bumpkin", "awkward", "bag", "dirt", 
            "die", "caboose", "bait", "egg", "coleslaw", "cashier", "dapper", "furlough", "iceberg", "luck"
        ];
        searchWord(randomLoop(norse), dataValue);
    } else if(dataValue === 2) {
        // chinese / japanese
        var chinese = [
            "brainwash", "ketchup", "typhoon", "chowchow", "kumquat", "ramen", "tycoon", "wok", "tofu", "tea", 
            "rickshaw", "karaoke", "emoji", "origami", "sayonara", "wonton", "zen", "shiatsu", "sushi"
        ];
        searchWord(randomLoop(chinese), dataValue);
    } else {
        // spanish
        var spanish = [
            "banana", "cockroach", "crimson", "mustang", "embargo", "guacamole", "guerrilla", "hurricane", "macho", "mosquito", 
            "patio", "alligator", "tango", "matador", "cargo", "renegade", "vanilla", "bonanza", "tomato", "torque"
        ];
        searchWord(randomLoop(spanish), dataValue);
    }
})

// displays fail messages according to what went wrong
function failMessage(error) {
    var target = $("#fail-message");
    if(error === 1) {
        target.fadeIn().text("Please enter a valid entry").addClass("fail-message");
        target.delay(3000).slideUp().fadeOut(1000);
    } else if(error === 2) {
        target.fadeIn().text("Please enter a word to get started").addClass("fail-message");
        target.delay(3000).slideUp().fadeOut(1000);
    } else {
        target.fadeIn().text("Check your spelling and/or enter the base word (ie: 'run' instead of 'running')").addClass("fail-message");
        target.delay(3500).slideUp().fadeOut(1000);
    }

    // Removes styling when odd words are entered
    addBG(".card-append", "");
    addBorder(".post-search", "");
    addBorder(".card-append", "");
}

// Fade out an object and fade them back in on hover
function fadingIn(object, opacityStart, opacityEnd, time) {
    /**
     * First it fades out the given object to the specified value and transition time,
     * then, on mouse hover, it darkens it to the specified time. 
     */

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

// Removes attribute on focus and reapplies the attribute on focusout
function onFocusRemoveAttr(object, attr, attrValue) {
    /**
     * Removes an attribute from an object on focus in,
     * replaces the attribute on blur.
     */
    $(object).focus(function() {
        $(this).removeAttr(attr);
    })
    $(object).focusout(function() {
        $(this).attr(attr, attrValue);
    })
}

// Appends a list of history 
function historyAppend(text) {
    /**
     * Appends text by creating <li> to the ul class of .history-here.
     * Function not modular for now as it isn't need just yet.
     */
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

// add borders to target object
function addBorder(target, borderStyle = "1px solid rgba(128, 128, 128, 0.2)", borderRadius = "5px") {
    var styles = {
        border: borderStyle,
        borderRadius: borderRadius
    };
    $(target).css(styles);
}

// Appends the required list of the word typed onto the page with provided target container
function postAppend(text, targetContainer) {
    $(targetContainer).append($("<div>").append(text));
}

// Removes curls around API data's {it}...{/it}
function uncurl(text) {
    return text.replaceAll("{it}", "<i>").replaceAll("{/it}", "</i>")
    .replaceAll("{inf}", "<sub>").replaceAll("{/inf}", "</sub>")
    .replaceAll("{sup}", "<sup>").replaceAll("{/sup}", "</sup>");
}

// Loops through certain arrays in random order
function randomLoop(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function addBG(target, img, size) {
    $(target).css({
        "background-image": "url(" + img + ")",
        "background-position": "center center",
        "background-repeat": "no-repeat",
        "background-size": size,
    });
}

// Clear certain fields
function clearField(object) {
    $(object).text("").val("");
}

// Clear all function
function clearAll() {
    clearField("#user-input");
    clearField(".post-norse");
    clearField(".synonym-norse");
    clearField(".post-asian");
    clearField(".synonym-asian");
    clearField(".post-latin");
    clearField(".synonym-latin");
}