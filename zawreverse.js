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

    //link
    /*
    for (i = 0; i < rangeElements.length; i++) {
        rangeElements[i].addEventListener('input',function(e) {
            boxElements[i].value = e.target.value;
        });
        boxElements[i].addEventListener('input',function(e) {
            rangeElements[i].value = e.target.value;
        });
    }
    */
    comDamageRange.addEventListener('input', function(e) {
        comDamageBox.value = e.target.value;
        $.post(url,{"comDamage":e.target.value}, function(data) {
            console.log("Sent");
        });
    });
    comDamageBox.addEventListener('input',function(e) {
        comDamageRange.value = e.target.value;
    });
    comAtkSpdRange.addEventListener('input', function(e) {
        comAtkSpdBox.value = e.target.value;
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
    $.get(url, {"headers": "Access-Control-Allow-Origin"}, function(data) {
        console.log(data);
        $( ".right" ).prepend(data);
    });
});
