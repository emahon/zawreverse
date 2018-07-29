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

    //style
    var dammap = [56.0, 58.0, 60.0, 62.0, 64.0, 66.0, 67.0, 68.0, 69.0, 71.0, 73.0, 74.0, 75.0, 76.0, 78.0, 80.0, 82.0, 84.0, 85.0, 86.0, 88.0, 89.0, 90.0, 91.0, 92.0, 93.0, 94.0, 96.0, 98.0, 99.0, 100.0, 103.0, 105.0, 106.0, 107.0, 110.0, 112.0, 114.0, 121.0, 124.0, 126.0, 128.0, 135.0, 142.0]
    var spdmapalpha = [35.0, 37.0, 39.0, 41.0, 43.0, 44.0, 45.0, 47.0, 48.0, 49.0, 50.0, 51.0, 52.0, 53.0, 54.0, 55.0, 56.0, 57.0, 58.0, 59.0, 60.0, 61.0, 62.0, 63.0, 64.0, 65.0, 66.0, 67.0, 68.0, 69.0, 70.0, 72.0, 75.0]
    //get speed to normal levels
    var spdmap = []
    for (i in spdmapalpha) {
        spdmap.push(spdmapalpha[i]/60.0);
    }
    var statmap = [0.1, 0.12, 0.14, 0.16, 0.18, 0.2, 0.22, 0.25, 0.27, 0.29, 0.32, 0.34, 0.36]
    var critmap = [0.1, 0.12, 0.14, 0.16, 0.18, 0.2, 0.22, 0.25, 0.27, 0.29, 0.32, 0.34, 0.36]

    //https://stackoverflow.com/questions/857075/jquery-ui-slider-fixed-values
    $( function() {
        $("#comDamageRange").slider({
            min: 1,
            max: dammap.length - 1,
            value: 0,
            slide: function(event, ui) {
                damval = dammap[ui.value];
                $("#comDamageRange").val(damval);
                comDamageBox.value = damval;
                toCheck['comDamage'] = true;
                query = buildQuery();
                $.post(url,query, displayZaws);
            }
        });
    });
    $( function() {
        $("#comAtkSpdRange").slider({
            min: 1,
            max: spdmap.length - 1,
            value: 0,
            slide: function(event, ui) {
                spdval = spdmap[ui.value];
                $("#comAtkSpdRange").val(spdval);
                comAtkSpdBox.value = spdval;
                toCheck['comAtkSpd'] = true;
                query = buildQuery();
                $.post(url,query, displayZaws);
            }
        });
    });
    $( function() {
        $("#comStatChanceRange").slider({
            min: 1,
            max: statmap.length - 1,
            value: 0,
            slide: function(event, ui) {
                statval = statmap[ui.value];
                $("#comStatChanceRange").val(statval);
                comStatChanceBox.value = statval;
                toCheck['comStatChance'] = true;
                query = buildQuery();
                $.post(url,query, displayZaws);
            }
        });
    });
    $( function() {
        $("#comCritChanceRange").slider({
            min: 1,
            max: critmap.length - 1,
            value: 0,
            slide: function(event, ui) {
                critval = critmap[ui.value];
                $("#comCritChanceRange").val(critval);
                comCritChanceBox.value = critval;
                toCheck['comCritChance'] = true;
                query = buildQuery();
                $.post(url,query, displayZaws);
            }
        });
    });

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
                    if (key == 'comAtkSpd') {
                        query[key] = query[key]*60; //attack speed accuracy hack
                    }
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
        toCheck['comAtkSpd'] = true;
        query = buildQuery();
        $.post(url, query, displayZaws);
    });
    comStatChanceRange.addEventListener('input', function(e) {
        comStatChanceBox.value = e.target.value;
        toCheck['comStatChance'] = true;
        query = buildQuery();
        $.post(url, query, displayZaws);
    });
    comStatChanceBox.addEventListener('input', function(e) {
        comStatChanceRange.value = e.target.value;
        toCheck['comStatChance'] = true;
        query = buildQuery();
        $.post(url, query, displayZaws);
    });
    comCritChanceRange.addEventListener('input', function(e) {
        comCritChanceBox.value = e.target.value;
        toCheck['comCritChance'] = true;
        query = buildQuery();
        $.post(url, query, displayZaws);
    });
    comCritChanceBox.addEventListener('input', function(e) {
        comCritChanceRange.value = e.target.value;
        toCheck['comCritChance'] = true;
        query = buildQuery();
        $.post(url, query, displayZaws);
    });


    //display possible combinations in right
    console.log('hi');

});
