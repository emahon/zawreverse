//https://learn.jquery.com/about-jquery/how-jquery-works/

$( document ).ready(function() {
    //server address
    url = "http://localhost:8000";

    //link sliders and boxes
    //https://stackoverflow.com/questions/34360448/is-it-possible-to-link-a-range-and-a-numerical-html-input#34360480

    //define elements
    //could this all be done by looping over an array...?
    /*
    comStats = ["comDamage","comAtkSpd","comStatChance","comCritChance"]
    rangeElements = [];
    boxElements = [];
    for (i in comStats) {
        rangeElements.push(document.getElementById(comStats[i]+"Range"));
        boxElements.push(document.getElementById(comStats[i]+"Box"));
    }
    */
    comDamageRange = document.getElementById("comDamageRange"); 
    comDamageBox = document.getElementById("comDamageBox");
    comAtkSpdRange = document.getElementById("comAtkSpdRange");
    comAtkSpdBox = document.getElementById("comAtkSpdBox");
    comStatChanceRange = document.getElementById("comStatChanceRange");
    comStatChanceBox = document.getElementById("comStatChanceBox");
    comCritChanceRange = document.getElementById("comCritChanceRange");
    comCritChanceBox = document.getElementById("comCritChanceBox");

    //what elements to send to server
    toCheck = {
        //'weapType':false,
        'comDamage':false,
        'comAtkSpd':false,
        'comCritChance':false,
        'comStatChance':false,
    };

    //function to build stuff to send to server
    function buildQuery() {
        query = {"headers": "Access-Control-Allow-Origin"};
        //https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object#684692
        for (key in toCheck) {
            if (toCheck.hasOwnProperty(key)) {
                if (toCheck[key]) {
                    query[key] = document.getElementById(key+"Range").value;
                }
            }
        }
        return query;
    }

    //function to process list of zaws
    function displayZaws(data) {
        combs = data.split("', '");
        outstr = ""
        for (i in combs) {
            outstr = outstr + combs[i] + "<br>";
        }
        $( ".right" ).html(outstr);
    }

    //link
    comDamageRange.addEventListener('input', function(e) {
        comDamageBox.value = e.target.value;
        toCheck['comDamage'] = true;
        query = buildQuery();
        $.post(url,query, displayZaws);
    });
    comDamageBox.addEventListener('input',function(e) {
        comDamageRange.value = e.target.value;
        toCheck['comDamage'] = true;
        query = buildQuery();
        $.post(url,query, displayZaws);
    });
    comAtkSpdRange.addEventListener('input', function(e) {
        comAtkSpdBox.value = e.target.value;
        toCheck['comAtkSpd'] = true;
        query = buildQuery();
        $.post(url, query, displayZaws);
    });
    comAtkSpdBox.addEventListener('input', function(e) {
        comAtkSpdRange.value = e.target.value;
    });
    comStatChanceRange.addEventListener('input', function(e) {
        comStatChanceBox.value = e.target.value;
    });
    comStatChanceBox.addEventListener('input', function(e) {
        comStatChanceRange.value = e.target.value;
    });
    comCritChanceRange.addEventListener('input', function(e) {
        comCritChanceBox.value = e.target.value;
    });
    comCritChanceBox.addEventListener('input', function(e) {
        comCritChanceRange.value = e.target.value;
    });


    //display possible combinations in right
    console.log('hi');

});
